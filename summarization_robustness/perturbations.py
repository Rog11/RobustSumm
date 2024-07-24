import random
import re
import nltk
from nltk.corpus import wordnet, stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from nltk import word_tokenize, sent_tokenize, ngrams, pos_tag, ne_chunk
from collections import Counter
import string
import warnings
warnings.filterwarnings("ignore", category=UserWarning, message="Can't initialize NVML")

nltk.download('punkt', quiet=True)
nltk.download('wordnet', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('averaged_perceptron_tagger', quiet=True)
nltk.download('maxent_ne_chunker', quiet=True)
nltk.download('words', quiet=True)

stop_words = set(stopwords.words('english'))

paraphraser_model = None
paraphraser_tokenizer = None

def load_paraphraser():
    global paraphraser_model, paraphraser_tokenizer
    if paraphraser_model is None or paraphraser_tokenizer is None:
        try:
            paraphraser_tokenizer = AutoTokenizer.from_pretrained("kalpeshk2011/dipper-paraphraser-xxl")
            paraphraser_model = AutoModelForSeq2SeqLM.from_pretrained("kalpeshk2011/dipper-paraphraser-xxl")
            logging.info("Paraphraser model loaded successfully.")
        except Exception as e:
            logging.error(f"Error loading paraphraser model: {e}")
            raise
    return paraphraser_model, paraphraser_tokenizer

def generate_paraphrase(sentence):
    try:
        model, tokenizer = load_paraphraser()
        inputs = tokenizer(sentence, return_tensors="pt", max_length=512, truncation=True)
        with torch.no_grad():
            outputs = model.generate(**inputs, max_length=512, num_return_sequences=1, num_beams=5)
        paraphrased_sentence = tokenizer.decode(outputs[0], skip_special_tokens=True)
        logging.info(f"Original sentence: {sentence}")
        logging.info(f"Paraphrased sentence: {paraphrased_sentence}")
        return paraphrased_sentence
    except Exception as e:
        logging.error(f"Error generating paraphrase: {e}")
        logging.info("Falling back to original sentence.")
        return sentence

def get_lead_sentences(document, dataset_type, num_sentences=2):
    """Extract lead sentences based on dataset type."""
    if dataset_type == 'alexfabbri/multi_news':
        first_document = document['document'].split('|||||')[0].strip()
    elif dataset_type == 'yaolu/multi_x_science_sum':
        first_document = document['abstract']
    else:
        raise ValueError(f"Unknown dataset type: {dataset_type}")
    
    sentences = nltk.sent_tokenize(first_document)
    return sentences[:num_sentences]
    
def identify_important_words(text, top_n=10):
    """Identify important words using TF-IDF, excluding stop words."""
    vectorizer = TfidfVectorizer(stop_words=list(stop_words), lowercase=True)
    tfidf_matrix = vectorizer.fit_transform([text])
    feature_names = vectorizer.get_feature_names_out()
    
    tfidf_scores = zip(feature_names, tfidf_matrix.toarray()[0])
    sorted_words = sorted(tfidf_scores, key=lambda x: x[1], reverse=True)
    
    # Additional check to ensure no stop words are included
    important_words = [word for word, score in sorted_words if word.lower() not in stop_words]
    
    return important_words[:top_n]
#
def find_matching_phrases(text, summary, min_length=3):
    """Find phrases from the text that appear in the summary."""
    text_words = word_tokenize(text.lower())
    summary_words = word_tokenize(summary.lower())
    matching_phrases = []
    
    for i in range(len(text_words)):
        for j in range(i + min_length, len(text_words) + 1):
            phrase = ' '.join(text_words[i:j])
            if phrase in ' '.join(summary_words) and len(phrase.split()) >= min_length:
                matching_phrases.append(phrase)
    
    return matching_phrases


def get_wordnet_pos(treebank_tag):
    if treebank_tag.startswith('J'):
        return wordnet.ADJ
    elif treebank_tag.startswith('V'):
        return wordnet.VERB
    elif treebank_tag.startswith('N'):
        return wordnet.NOUN
    elif treebank_tag.startswith('R'):
        return wordnet.ADV
    else:
        return None



def identify_important_words_and_phrases(lead_text, summary, top_n=20):
    stop_words = set(stopwords.words('english'))
    
    # Tokenize and get POS tags
    tokens = word_tokenize(lead_text.lower())
    pos_tags = pos_tag(tokens)
    
    # Filter out stopwords and punctuation
    filtered_tokens = [word for word, tag in pos_tags
                       if word not in stop_words and word not in string.punctuation
                       and len(word) > 2]  # Only consider words longer than 2 characters
    
    # Calculate TF-IDF
    vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1,2))
    tfidf_matrix = vectorizer.fit_transform([lead_text])
    feature_names = vectorizer.get_feature_names_out()
    tfidf_scores = dict(zip(feature_names, tfidf_matrix.toarray()[0]))
    
    # Score words based on TF-IDF and presence in summary
    word_scores = {}
    for word in filtered_tokens:
        if word in tfidf_scores:
            score = tfidf_scores[word]
            if word.lower() in summary.lower():
                score *= 2  # Boost score if word appears in summary
            word_scores[word] = score
    
    # Sort words by score
    sorted_words = sorted(word_scores.items(), key=lambda x: x[1], reverse=True)
    
    important_words = [word for word, score in sorted_words[:top_n]]
    
    logging.info(f"Identified important words: {important_words}")
    
    return important_words
    
    
def replace_word_case_insensitive(text, old_word, new_word):
    """Replace a word in text, preserving the original case."""
    def repl(match):
        g = match.group()
        if g.islower(): return new_word.lower()
        if g.isupper(): return new_word.upper()
        if g.istitle(): return new_word.capitalize()
        return new_word
    
    return re.sub(r'\b{}\b'.format(re.escape(old_word)), repl, text, flags=re.IGNORECASE)

def character_perturbations(word, method):
    """Apply character-level perturbations."""
    if method == 'swap':
        if len(word) > 1:
            i = random.randint(0, len(word) - 2)
            return word[:i] + word[i+1] + word[i] + word[i+2:]
    elif method == 'delete':
        if len(word) > 1:
            i = random.randint(0, len(word) - 1)
            return word[:i] + word[i+1:]
    elif method == 'insert':
        i = random.randint(0, len(word))
        return word[:i] + random.choice('abcdefghijklmnopqrstuvwxyz') + word[i:]
    elif method == 'homoglyph':
        homoglyphs = {'a': 'α', 'e': 'е', 'i': 'і', 'o': 'о', 'c': 'с', 'p': 'р', 'k': 'к', 'v': 'ѵ', 'n': 'п', 'u': 'υ'}
        return ''.join(homoglyphs.get(c, c) for c in word)
    return word

def word_perturbations(word, method):
    """Apply word-level perturbations."""
    if method == 'delete':
        return ''
    elif method == 'synonym':
        synsets = wordnet.synsets(word)
        synonyms = []
        for synset in synsets:
            for lemma in synset.lemmas():
                if lemma.name() != word and '_' not in lemma.name():
                    synonyms.append(lemma.name())
        return random.choice(synonyms) if synonyms else word
    elif method == 'homoglyph':
        homoglyphs = {'a': 'α', 'e': 'е', 'i': 'і', 'o': 'о', 'c': 'с', 'p': 'р', 'k': 'к', 'v': 'ѵ', 'n': 'п', 'u': 'υ'}
        return ''.join(homoglyphs.get(c, c) for c in word)
    return word

def sentence_perturbations(sentence, method):
    """Apply sentence-level perturbations."""
    if method == 'paraphrase':
        return generate_paraphrase(sentence)
    elif method == 'homoglyph':
        homoglyphs = {'a': 'α', 'e': 'е', 'i': 'і', 'o': 'о', 'c': 'с', 'p': 'р', 'k': 'к', 'v': 'ѵ', 'n': 'п', 'u': 'υ'}
        return ''.join(homoglyphs.get(c, c) for c in sentence)
    elif method == 'reorder':
        words = sentence.split()
        random.shuffle(words)
        return ' '.join(words)
    return sentence



import logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def has_synonym(word):
    for syn in wordnet.synsets(word):
        for lemma in syn.lemmas():
            if lemma.name().lower() != word.lower() and '_' not in lemma.name():
                return True
    return False

def get_synonym(word):
    synonyms = []
    for syn in wordnet.synsets(word):
        for lemma in syn.lemmas():
            if lemma.name().lower() != word.lower() and '_' not in lemma.name():
                synonyms.append(lemma.name())
    if synonyms:
        synonym = random.choice(synonyms)
        logging.info(f"Synonym found for '{word}': '{synonym}'")
        return synonym
    logging.warning(f"No synonym found for '{word}'. Returning original word.")
    return word

def apply_perturbations(document, generated_summary, perturbation_type, dataset_type):
    logging.info(f"Applying perturbation: {perturbation_type}")
    
    if dataset_type == 'yaolu/multi_x_science_sum':
        document_text = document['abstract']
    else:  # alexfabbri/multi_news
        document_text = document['document']
    
    original_document = document.copy()
    perturbed_document = document.copy()
    display_document = document.copy()
    
    main_type, method = perturbation_type.split('_')

    # Get lead sentences
    lead_sentences = get_lead_sentences(document, dataset_type)
    lead_text = ' '.join(lead_sentences)

    # Identify important words and phrases
    important_elements = identify_important_words_and_phrases(lead_text, generated_summary)

    if important_elements:
        element_to_perturb = random.choice(important_elements)
        logging.info(f"Element chosen for perturbation: {element_to_perturb}")
        
        # Find the sentence containing the element to perturb
        sentences = nltk.sent_tokenize(document_text)
        sentence_to_perturb = next((s for s in sentences if element_to_perturb.lower() in s.lower()), None)
        
        if sentence_to_perturb:
            if main_type == 'character':
                perturbed_word = character_perturbations(element_to_perturb, method)
                pattern = re.compile(re.escape(element_to_perturb), re.IGNORECASE)
                perturbed_sentence = pattern.sub(perturbed_word, sentence_to_perturb)
            elif main_type == 'word':
                perturbed_word = word_perturbations(element_to_perturb, method)
                pattern = re.compile(r'\b' + re.escape(element_to_perturb) + r'\b', re.IGNORECASE)
                perturbed_sentence = pattern.sub(perturbed_word, sentence_to_perturb)
            elif main_type == 'sentence':
                perturbed_sentence = sentence_perturbations(sentence_to_perturb, method)
            else:
                logging.warning(f"Perturbation type {main_type} not recognized.")
                return {
                    'original_document': original_document,
                    'perturbed_document': original_document,
                    'display_document': original_document,
                    'original_element': None,
                    'perturbed_element': None
                }

            # Update display document
            display_text = document_text.replace(sentence_to_perturb, perturbed_sentence)
            
            # For perturbed document, remove the original sentence
            perturbed_text = document_text.replace(sentence_to_perturb, '')
            
            logging.info(f"Original sentence: {sentence_to_perturb}")
            logging.info(f"Perturbed sentence: {perturbed_sentence}")

            if dataset_type == 'alexfabbri/multi_news':
                perturbed_document['document'] = perturbed_text
                display_document['document'] = display_text
            else:  # yaolu/multi_x_science_sum
                perturbed_document['abstract'] = perturbed_text
                display_document['abstract'] = display_text

            return {
                'original_document': original_document,
                'perturbed_document': perturbed_document,
                'display_document': display_document,
                'original_element': element_to_perturb,
                'perturbed_element': perturbed_word if main_type in ['character', 'word'] else perturbed_sentence
            }
        else:
            logging.warning(f"Sentence containing '{element_to_perturb}' not found.")
    else:
        logging.warning("No important elements identified for perturbation.")

    return {
        'original_document': original_document,
        'perturbed_document': original_document,
        'display_document': original_document,
        'original_element': None,
        'perturbed_element': None
    }
