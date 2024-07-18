// pages/docs.tsx
import Link from "next/link";
import SideBar from "../SideBar";
import CodeSnippet from "../CodeSnippet";
import CopyButton from "../CopyButton";

const Recipe: React.FC = () => {
  const code = ``;

  return (
    <div className="px-60 flex">
      <SideBar />
      <div className="flex-1 p-8 ">
        <h1 className="text-3xl font-bold mb-4">Perturbations</h1>
        <p>
          With their success on text classification, we examine the robustness
          of summarization models against adversarial perturbations, which can
          be in different levels – character, word, sentence, and document. The
          space of possible modifications at every level is huge. We show how an
          attacker, leveraging the biases in summarization models, can implement
          sentence exclusion attack which can also result in quality
          degradation.
        </p>
        {/* <div className="mt-10 max-w-5xl mx-auto"> */}
        {/* <CopyButton code={code} /> */}
        {/* <CodeSnippet code={code} language="python" /> */}
        {/* </div> */}
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Character Level
          </h2>
          <p>
            The main motivation behind applying these perturbations is that they
            can be used to simulate common typo errors and input noise that can
            occur in real-world scenarios.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mt-4 b-2 pl-4">
            Charater swap
          </h3>
          <div className="mockup-code text-xs">
            <pre data-prefix="$">
              <code>
                summarization_robustness --model t5-small --dataset
                yaolu/multi_x_science_sum --split validation --size 50
                --perturbation word_delete
              </code>
            </pre>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mt-4 b-2 pl-4">
            Charater Delete
          </h3>
          <div className="mockup-code text-xs">
            <pre data-prefix="$">
              <code>
                summarization_robustness --model t5-small --dataset
                yaolu/multi_x_science_sum --split validation --size 50
                --perturbation character_delete
              </code>
            </pre>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mt-4 b-2 pl-4">
            Charater Replace
          </h3>
          <div className="mockup-code text-xs">
            <pre data-prefix="$">
              <code>
                summarization_robustness --model t5-small --dataset
                yaolu/multi_x_science_sum --split validation --size 50
                --perturbation character_replace
              </code>
            </pre>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mt-4 b-2 pl-4">
            Charater Insert
          </h3>
          <div className="mockup-code text-xs">
            <pre data-prefix="$">
              <code>
                summarization_robustness --model t5-small --dataset
                yaolu/multi_x_science_sum --split validation --size 50
                --perturbation character_insert
              </code>
            </pre>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mt-4 b-2 pl-4">
            Charater Repeat
          </h3>
          <div className="mockup-code text-xs">
            <pre data-prefix="$">
              <code>
                summarization_robustness --model t5-small --dataset
                yaolu/multi_x_science_sum --split validation --size 50
                --perturbation character_repeat
              </code>
            </pre>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 mt-6">
            Word Level
          </h2>
          <p>
            Just like the character level, it simulates common typo errors and
            input noise that can occur in real-world scenarios.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mt-4 b-2 pl-4">
            Word Delete
          </h3>
          <div className="mockup-code text-xs">
            <pre data-prefix="$">
              <code>
                summarization_robustness --model t5-small --dataset
                yaolu/multi_x_science_sum --split validation --size 50
                --perturbation word_delete
              </code>
            </pre>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mt-4 b-2 pl-4">
            Word Synonym
          </h3>
          <div className="mockup-code text-xs">
            <pre data-prefix="$">
              <code>
                summarization_robustness --model t5-small --dataset
                yaolu/multi_x_science_sum --split validation --size 50
                --perturbation word_synonym
              </code>
            </pre>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 mt-6">
            Replacement with Homoglyphs
          </h2>
          <p className="text-base text-gray-600 mb-6">
            Homoglyphs are visually similar characters/ words that are less
            noticeable to human readers and can be used for deceptive purposes.
            To assess the models’ performance, one character or word at a time
            was replaced with its homoglyph counterpart.
          </p>
          <div className="mockup-code text-xs">
            <pre data-prefix="$">
              <code>
                summarization_robustness --model t5-small --dataset
                yaolu/multi_x_science_sum --split validation --size 50
                --perturbation word_homograph
              </code>
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2 mt-6">
            Sentence/Document Reordering
          </h2>
          <p className="text-base text-gray-600 mb-6">
            In natural language, the order of sentences and paragraphs is
            important as they account for understanding the context. This can be
            disrupted due to formatting issues or intentional manipulation. We
            evaluate the models’ robustness against such changes in structure by
            moving one of the sentences in a document from the top to the
            bottom, and in the case of documents, by placing the top document at
            the bottom
          </p>
          <div className="mockup-code text-xs">
            <pre data-prefix="$">
              <code>
                summarization_robustness --model t5-small --dataset
                yaolu/multi_x_science_sum --split validation --size 50
                --perturbation document_reorder
              </code>
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2 mt-6">
            Sentence Paraphrasing
          </h2>
          <p className="text-base text-gray-600 mb-6 mt-2">
            Paraphrasing is a common phenomenon in natural language, and models
            should be able to handle paraphrased expressions while capturing the
            core meaning. With this perturbation, we test the models’ ability to
            summarize effectively without any change, while replacing the
            original sentence with its paraphrased version.
          </p>
          <div className="mockup-code text-xs">
            <pre data-prefix="$">
              <code>
                summarization_robustness --model t5-small --dataset
                yaolu/multi_x_science_sum --split validation --size 50
                --perturbation sentence_paraphrase
              </code>
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2 mt-6">
            Replacement of original sentences
          </h2>
          <p className="text-base text-gray-600 mb-6">
            Once these perturbations are executed at the character, word, and
            sentence level, we replace the original sentences with the sentences
            containing them. In case of document perturbations, we just
            rearrange the order of documents and observe the model’s capability
            to identify the document again.
          </p>
          <div className="mockup-code text-xs">
            <pre data-prefix="$">
              <code>
                summarization_robustness --model t5-small --dataset
                yaolu/multi_x_science_sum --split validation --size 50
                --perturbation sentence_reorder
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
