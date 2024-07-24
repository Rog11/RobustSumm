# Text Summarization Robustness Evaluation Package

This package provides tools to evaluate the robustness of text summarization models against various types of adversarial perturbations.

## Installation

1. Create a virtual environment (optional but recommended):

   python -m venv env
   source env/bin/activate  # On Windows, use `env\Scripts\activate`
   
2. Open the terminal at the provided folder "summ_framework"

3. Install the package:

   pip install -e .

## Usage

After installation, you can use the "summarization_robustness" command-line tool to evaluate summarization models.

### Basic Command Structure

summarization_robustness --model MODEL_NAME --dataset DATASET_NAME --split SPLIT --size SIZE --perturbation PERTURBATION_TYPE


### Options

- --model: Hugging Face model identifier (e.g., 'facebook/bart-large-cnn')
- --dataset: Dataset name ('alexfabbri/multi_news' or 'yaolu/multi_x_science_sum')
- --split: Dataset split to use ('train', 'validation', or 'test')
- --size: Number of examples to process
- --perturbation: Type of perturbation to apply

### Perturbation Types

- character_swap: Swap two adjacent characters
- character_delete: Delete a random character
- character_insert: Insert a random character
- character_homoglyph: Replace a character with a homoglyph
- word_delete: Delete a word
- word_synonym: Replace a word with its synonym
- word_homoglyph: Replace a word with homoglyphs
- sentence_paraphrase: Paraphrase a sentence
- sentence_homoglyph: Replace a sentence with homoglyphs
- sentence_reorder: Reorder sentences in a document

### Examples

1. Evaluate BART model on Multi-News dataset with character swapping:
   
   summarization_robustness --model facebook/bart-large-cnn --dataset alexfabbri/multi_news --split test --size 100 --perturbation character_swap
   
2. Evaluate T5 model on Multi-XScience dataset with word deletion:
   
   summarization_robustness --model t5-small --dataset yaolu/multi_x_science_sum --split validation --size 50 --perturbation word_delete
   

## Output

The tool will output:
- Original document and summary
- Perturbed document and new summary
- ROUGE scores comparing original and new summaries
- Details about the applied perturbation
