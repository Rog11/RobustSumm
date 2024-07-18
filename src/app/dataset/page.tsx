// pages/docs.tsx
import Link from "next/link";
import SideBar from "../SideBar";
import Image from "next/image";

const Dataset: React.FC = () => {
  return (
    <div className="px-60 flex">
      <SideBar />
      <div className="flex-1 p-8">
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
        <p className="text-base text-gray-600 mb-6">
          Illustration of poisoning attack using influence functions
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Initual setup
        </h3>
        <p>
          Initially, an attacker can have access to a benign training dataset, a
          testing dataset, and a pre-trained LLM, which is publicly available.
          The pre-trained LLM can be finetuned using this benign 360 dataset and
          run on the test set to observe its original summarization behavior.
        </p>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 b-2">
          Utilization of Influence Functions
        </h3>
        <p>
          To poison a small sample of the training dataset, we utilize the
          concept of Influence Functions, which quantify the impact of training
          data points on the model’s predictions.
        </p>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 b-2">
          Generation of poisoned data
        </h3>
        <p>
          For each identified influential sample, we apply the dirty label
          attack and alter the summaries by creating a contrastive version or
          toxic version.
        </p>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 b-2">
          Model retraining
        </h3>
        <p>
          The model can then be finetuned by an attacker on the poisoned
          dataset, updating its parameters to adapt to the characteristics
          embedded within the poisoned dataset.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-5">Datasets</h2>
        <ul className="list-disc pl-5 mb-3">
          <li>
            <a
              href="https://github.com/Alex-Fabbri/Multi-News"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 hover:text-blue-800"
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
              className="underline text-blue-600 hover:text-blue-800"
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

export default Dataset;
