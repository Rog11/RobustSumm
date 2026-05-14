// pages/docs.tsx
import Link from "next/link";
import SideBar from "../SideBar";
import Image from "next/image";

const How: React.FC = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16 xl:px-60 flex">
      <SideBar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">
          Framework of Adversarial Perturbations
        </h1>
        <Image
          src="/images/framework.jpg"
          alt="Framework of adversarial Perturbations"
          className="mt-4"
          width={1200}
          height={900}
        />
        <h2 className="text-2xl font-bold mb-2">
          Adversarial Perturbations Formalization
        </h2>
        <p className="text-base opacity-80 mb-6">
          Initially, an attacker can finetune a pre-trained model on publicly
          available multi-document datasets and generate summaries. This step is
          crucial for identifying the model’s susceptibility to lead and
          document ordering biases. By analyzing these summaries and comparing
          them with sections of original documents using cosine similarity,
          attackers can confirm the presence of lead bias. Upon confirming these
          biases, attackers can extract initial sentences of the initial
          documents to apply perturbations.
        </p>

        <h2 className="text-2xl font-bold mb-2">
          Adversarial Perturbations Formalization
        </h2>
        <p className="text-base opacity-80 mb-6">
          For a set of documents &#123; D1, D2, ..., Dk &#125;, where each Di
          consists of sentences &#123;si1, si2, ..., sin &#125;, we specifically
          target the lead sentences of the first document, Dlead = &#123;s11,
          s12, ..., s1m &#125;, with m being a small number, such as 2 or 3.
          This targeted approach stems from the hypothesis that alterations in
          the lead sentences of the first document can disproportionately
          influence the overall summary.
        </p>

        <h2 className="text-2xl font-bold mb-2 mt-4">
          Identification of important tokens:
        </h2>
        <p className="text-base opacity-80 mb-6">
          In character and word level, we employ TF-IDF to determine the
          important words within Dlead. Instead of applying adversarial
          perturbations to all the important words in the set, we match the
          words present in sentences of summary and filter them to apply
          perturbations. This set of selected words is denoted as Wimp. Our
          adversarial strategy involves applying a perturbation function p to
          Wimp. This function p(w) is designed to apply perturbations across
          characters and words in the set of Wimp, encompassing insertions,
          deletions, or homoglyph, synonym replacements while adhering to the
          constraint of minimal perturbation. At the sentence level, p(w) is
          designed to apply perturbations across Dlead, encompassing replacement
          with paraphrases and homoglyphs and re-ordering. At the document level
          p(w) is designed to apply perturbations across D1 by changing the
          document’s location from top to bottom. The application of p(w) to
          Dlead results in a perturbed version, D ′ lead.
        </p>
        <h1 className="text-3xl font-bold mb-4">
          Influence Functions for Data Poisoning
        </h1>
        <p>
          We have provide a novel attack strategy where attackers can employ
          influence functions to systematically target and modify training data,
          aiming to manipulate the behavior of text summarization models.
        </p>
        <Image
          src="/images/dataset_image.jpg"
          alt="Poisoning attack using influence functions"
          className="mt-4"
          width={500}
          height={800}
        />
        <p className="text-base opacity-80 mb-6">
          Illustration of poisoning attack using influence functions
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Initual setup
        </h3>
        <p>
          Initially, an attacker can have access to a benign training dataset, a
          testing dataset, and a pre-trained LLM, which is publicly available.
          The pre-trained LLM can be finetuned using this benign 360 dataset and
          run on the test set to observe its original summarization behavior.
        </p>
        <h3 className="text-xl font-semibold mt-4">
          Utilization of Influence Functions
        </h3>
        <p>
          To poison a small sample of the training dataset, we utilize the
          concept of Influence Functions, which quantify the impact of training
          data points on the model’s predictions.
        </p>
        <h3 className="text-xl font-semibold mt-4">
          Generation of poisoned data
        </h3>
        <p>
          For each identified influential sample, we apply the dirty label
          attack and alter the summaries by creating a contrastive version or
          toxic version.
        </p>
        <h3 className="text-xl font-semibold mt-4">
          Model retraining
        </h3>
        <p>
          The model can then be finetuned by an attacker on the poisoned
          dataset, updating its parameters to adapt to the characteristics
          embedded within the poisoned dataset.
        </p>
        <h2 className="text-2xl font-bold mb-4 mt-5">Datasets</h2>
        <ul className="list-disc pl-5 mb-3">
          <li>
            <a
              href="https://github.com/Alex-Fabbri/Multi-News"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary"
            >
              Multi-News dataset
            </a>
            : This dataset consists of 44,972 training document 401 clusters,
            which includes news articles and human written summaries of these
            articles from the site newser.com.
          </li>
          <li>
            <a
              href="https://huggingface.co/datasets/yaolu/multi_x_science_sum"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary"
            >
              Multi-XScience dataset
            </a>
            : a large-scale multi-document summarization dataset created from
            scientific articles. Multi-XScience introduces a challenging
            multi-document summarization task: writing the related-work section
            of a paper based on its abstract and the articles it references.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default How;
