from transformers import BartForConditionalGeneration, BartTokenizer

def load_model(model_path: str):
    tokenizer = BartTokenizer.from_pretrained(model_path)
    model = BartForConditionalGeneration.from_pretrained(model_path)
    return tokenizer, model

def generate_summary(model, tokenizer, document, dataset_type):
    if dataset_type == 'yaolu/multi_x_science_sum':
        text = document['abstract']
    elif dataset_type == 'alexfabbri/multi_news':
        text = document['document']
    else:
        raise ValueError(f"Unknown dataset type: {dataset_type}")

    inputs = tokenizer(text, return_tensors="pt", max_length=1024, truncation=True)
    summary_ids = model.generate(inputs["input_ids"], max_length=150, min_length=40, length_penalty=2.0, num_beams=4, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

