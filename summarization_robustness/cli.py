import click
import json
from .perturbations import apply_perturbations, get_lead_sentences
from .models import load_model, generate_summary
from .datasets import load_custom_dataset
from .metrics import calculate_rouge

@click.command()
@click.option('--model', type=click.Path(exists=True), default='/home/poojitha/summarization/experiments/long_expts/bart_multinews_framework', help='Path to the finetuned model')
@click.option('--dataset', type=click.Choice(['alexfabbri/multi_news', 'yaolu/multi_x_science_sum']), help='Dataset name')
@click.option('--split', type=click.Choice(['train', 'validation', 'test']), default='test', help='Dataset split to use')
@click.option('--size', type=int, default=100, help='Number of examples to process')
@click.option('--perturbation', type=click.Choice([
    'character_swap', 'character_delete', 'character_insert', 'character_homoglyph',
    'word_delete', 'word_synonym', 'word_homoglyph',
    'sentence_paraphrase', 'sentence_homoglyph', 'sentence_reorder'
]), default='word_homoglyph', help='Type of perturbation to apply')
@click.option('--output', type=click.Path(), default='results.json', help='Path to save results')
def evaluate(model, dataset, split, size, perturbation, output):
    """Evaluate model robustness."""
    click.echo(f"Loading model from: {model}")
    tokenizer, model = load_model(model)

    click.echo(f"Loading dataset: {dataset} ({split} split, {size} examples)")
    dataset_examples = load_custom_dataset(dataset, split, size)

    results = []

    for i, example in enumerate(dataset_examples):
        click.echo(f"\nProcessing example {i+1}/{size}")
        
        original_document = example
        original_summary = generate_summary(model, tokenizer, original_document, dataset)

        click.echo("\nOriginal Document (first 500 characters):")
        doc_text = original_document['document'] if dataset == 'alexfabbri/multi_news' else original_document['abstract']
        click.echo(doc_text[:500] + "..." if len(doc_text) > 500 else doc_text)

        click.echo("\nOriginal Summary:")
        click.echo(original_summary)

        # Get lead sentences
        lead_sentences = get_lead_sentences(original_document, dataset)
        click.echo("\nLead Sentences:")
        click.echo(' '.join(lead_sentences))

        perturbation_result = apply_perturbations(original_document, original_summary, perturbation, dataset)
        
        perturbed_document = perturbation_result['perturbed_document']
        display_document = perturbation_result['display_document']

        click.echo("\nPerturbed Document (showing perturbation):")
        display_text = display_document['document'] if dataset == 'alexfabbri/multi_news' else display_document['abstract']
        click.echo(display_text[:1000] + "..." if len(display_text) > 1000 else display_text)
        perturbed_text = perturbed_document['document'] if dataset == 'alexfabbri/multi_news' else perturbed_document['abstract']
        new_summary = generate_summary(model, tokenizer, perturbed_document, dataset)

        click.echo("\nNew Summary (generated from perturbed document):")
        click.echo(new_summary)

        if perturbation_result['original_element'] and perturbation_result['perturbed_element']:
            click.echo(f"\nOriginal element: {perturbation_result['original_element']}")
            click.echo(f"Perturbed element: {perturbation_result['perturbed_element']}")

        # Calculate ROUGE scores
        rouge_scores_original = calculate_rouge(example['summary'], original_summary)
        rouge_scores_perturbed = calculate_rouge(example['summary'], new_summary)
        click.echo("\nROUGE Scores (Original vs Reference):")
        click.echo(json.dumps(rouge_scores_original, indent=2))
        click.echo("\nROUGE Scores (New vs Reference):")
        click.echo(json.dumps(rouge_scores_perturbed, indent=2))

        perturbed_element_in_summary = perturbation_result['perturbed_element'].lower() in new_summary.lower()
        click.echo(f"\nPerturbed element appears in new summary: {perturbed_element_in_summary}")

        # Store results
        results.append({
            'example_id': i,
            'original_document': doc_text[:500],
            'original_summary': original_summary,
            'perturbed_document': display_text[:1000],
            'new_summary': new_summary,
            'original_element': perturbation_result['original_element'],
            'perturbed_element': perturbation_result['perturbed_element'],
            'rouge_scores_original': rouge_scores_original,
            'rouge_scores_perturbed': rouge_scores_perturbed,
            'perturbed_element_in_summary': perturbed_element_in_summary
        })

        click.echo("\n" + "="*50)

    # Save results to file
    with open(output, 'w') as f:
        json.dump(results, f, indent=2)
    click.echo(f"\nResults saved to {output}")

if __name__ == '__main__':
    evaluate()

