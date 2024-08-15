# File: text_summarization_robustness/metrics.py
from rouge_score import rouge_scorer

def calculate_rouge(reference: str, candidate: str) -> dict:
    scorer = rouge_scorer.RougeScorer(['rouge1', 'rouge2', 'rougeL'], use_stemmer=True)
    scores = scorer.score(reference, candidate)
    return {key: value.fmeasure for key, value in scores.items()}
