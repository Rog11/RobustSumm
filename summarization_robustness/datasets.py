# File: summarization_robustness/datasets.py

from datasets import load_dataset

def load_custom_dataset(dataset_name: str, split: str, size: int):
    if dataset_name == 'alexfabbri/multi_news':
        dataset = load_dataset(dataset_name, split=split)
    elif dataset_name == 'yaolu/multi_x_science_sum':
        dataset = load_dataset(dataset_name, split=split)
    else:
        raise ValueError(f"Unknown dataset: {dataset_name}")
    
    return dataset.select(range(min(size, len(dataset))))
