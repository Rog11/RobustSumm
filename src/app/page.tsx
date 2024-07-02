import Image from "next/image";
import Navbar from "./navbar";
import CodeSnippet from "./CodeSnippet";
import Link from "next/link";
import CopyButton from "./CopyButton";

export default function Home() {
  const code = `
  from textattack import Attack
  from textattack.constraints.overlap import MaxWordsPerturbed
  from textattack.constraints.pre_transformation import (
      RepeatModification,
      StopwordModification,
  )
  from textattack.constraints.semantics.sentence_encoders import UniversalSentenceEncoder
  from textattack.goal_functions import UntargetedClassification
  from textattack.search_methods import GreedyWordSwapWIR
  from textattack.transformations import WordSwapMaskedLM
  
  from .attack_recipe import AttackRecipe
  
  
  class BERTAttackLi2020(AttackRecipe):
      """Li, L.., Ma, R., Guo, Q., Xiangyang, X., Xipeng, Q. (2020).
  
      BERT-ATTACK: Adversarial Attack Against BERT Using BERT
  
      https://arxiv.org/abs/2004.09984
  
      This is "attack mode" 1 from the paper, BAE-R, word replacement.
      """
  
      @staticmethod
      def build(model_wrapper):
          # [from correspondence with the author]
          # Candidate size K is set to 48 for all data-sets.
          transformation = WordSwapMaskedLM(method="bert-attack", max_candidates=48)
          #
          # Don't modify the same word twice or stopwords.
          #
          constraints = [RepeatModification(), StopwordModification()]
          constraints.append(MaxWordsPerturbed(max_percent=0.4))
  
          # "As used in TextFooler (Jin et al., 2019), we also use Universal Sentence
          # Encoder (Cer et al., 2018) to measure the semantic consistency between the
          # adversarial sample and the original sequence. To balance between semantic
          # preservation and attack success rate, we set up a threshold of semantic
          # similarity score to filter the less similar examples."

          # Since the threshold in the real world can't be determined from the training
          # data, the TextAttack implementation uses a fixed threshold - determined to
          # be 0.2 to be most fair.
          use_constraint = UniversalSentenceEncoder(
              threshold=0.2,
              metric="cosine",
              compare_against_original=True,
              window_size=None,
          )
          constraints.append(use_constraint)

          search_method = GreedyWordSwapWIR(wir_method="unk")
  
          return Attack(goal_function, constraints, transformation, search_method)`;

  return (
    <div className="bg-gray-200">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="px-60 py-15 text-5xl font-bold text-gray-800">
          Attacks Against Text Summarization Models through Lead Bias and
          Influence Functions
        </h1>
        <h2 className="mt-4 text-2xl">Sentence Exclusion attack example:</h2>
        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/recipes">
            <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              See Recipes
            </button>
          </Link>
          <Link href="/how-it-works">
            <button className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md shadow hover:bg-gray-400">
              How it works? <span aria-hidden="true">→</span>
            </button>
          </Link>
        </div>
        <div className="px-60 mt-12 text-left">
          <h2 className="text-3xl font-bold text-gray-800">Sample:</h2>
          <CopyButton code={code} />
          <CodeSnippet code={code} language="python" />
        </div>
        <div className="px-60 container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Q&A Section</h1>
          <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-2">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium">
              How is this different from TextAttack
            </div>
            <div className="collapse-content">
              <p>
                SummaryAttack is targeted towards Text Summarization. We
                introduce a novel approach by exploiting the inherent lead bias
                in summarization models, to perform adversarial perturbations.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-2">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium">
              More Details on results
            </div>
            <div className="collapse-content">
              <p>
                Check the paper for further details on benchmark and performance
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-2">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium">
              How to cite SummaryAttack
            </div>
            <div className="collapse-content">
              <p>Main paper:</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
