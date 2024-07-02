// pages/docs.tsx
import Link from "next/link";
import SideBar from "../SideBar";
import ColabEmbed from "../ColabLink";
import ColabLink from "../ColabLink";

const features = [
  {
    name: "Push to deploy",
    description: "Use google colab to test and run the attacks",
    link: "/docs",
  },
  {
    name: "How it works",
    description:
      "Discover the magic behind summary attack, how the framework works",
    link: "/how-it-works",
  },
  {
    name: "About us",
    description: "Meet our team",
    link: "/docs",
  },
  {
    name: "Performance",
    description: "Read the paper to understand benchmakrs & performance",
    link: "/docs",
  },
];

const Docs: React.FC = () => {
  return (
    <div className="px-60 flex">
      <SideBar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">
          Get Started with Summary attack
        </h1>
        <p className="text-gray-700">
          Summary attack is a python framework for adversarial attacks in text
          summarization. With evolution of deep learning, more sophisticated
          abstractive methods emerged, particularly those based on the
          transformer architecture, such as BART, T5, Pegasus. Word-level
          techniques such as Hotflip, TextFooler, and SemAttack all produce a
          subtle changes to the input text that lead the model to label the
          documents incorrectly.
        </p>

        <h2 className="mt-4 ext-2xl font-bold mb-4">Installation</h2>
        <div className="mockup-code">
          <pre data-prefix="$">
            <code>git clone https:github.com/summary-attack</code>
          </pre>
        </div>
        <h2 className="mt-4 ext-2xl font-bold mb-4">Inference Model</h2>
        <div className="mockup-code">
          <pre data-prefix="$">
            <code>Inference code here</code>
          </pre>
        </div>
        <p className="mt-4">
          For more usage examples, please refer to the example notebook.
        </p>

        {/* <ColabLink /> */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="https://colab.research.google.com/github/QData/TextAttack/blob/master/docs/2notebook/Example_0_tensorflow.ipynb"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Open in google colab
          </a>
        </div>
        <div>
          <h2 className="mt-4 ext-2xl font-bold mb-4">Threat Model</h2>
          <p>
            Adversarial Perturbations: As a wide number of Text Summarization
            models are publicly available, adversaries can have a motivation to
            perturb input during inference time, with the intention to generate
            biased or misleading summaries. In this work, we assume the goal of
            the attacker is to successfully implement sentence exclusion attack,
            which attempts to fool the summarization model to not use a specific
            sentence, here the lead sentence, in the output summary. As a
            consequence of this attack, the model's output may suffer from
            degradation in quality, i.e., generating incomplete, in- coherent,
            or misleading summaries. Consider this scenario: A fact-checker
            platform depends on a summarization model to generate summaries from
            aticles sourced from various channels, including foreign news
            outlets, blogs, and social media.
          </p>
          <h2 className="mt-4 ext-2xl font-bold mb-4">Datasets</h2>
          <p>
            Datasets: As we focus on different perturbations ranging from
            characters to documents, we consider datasets specific to the task
            of multi-document text summarization. To finetune a pretrained model
            for the task of multi document summarization, we used the Multi-News
            dataset (Fabbri et al., 2019). This dataset consists of 44,972
            training document clusters, which includes news articles and human
            402 written summaries of these articles from the site newser.com.
            The number of source documents per cluster varies from 2 to 10. The
            dataset is split into training (80%), validation (10%), and test
            (10%), which is available on Huggingface (Fabbri et al.,2019).{" "}
          </p>
          <h2 className="mt-4 ext-2xl font-bold mb-4">Evaluation</h2>
          <p>
            Lead bias has been reported in text summarization models using LLM
            models (Zhu et al., 2021). We also tested BART-Iarge, T5, and
            Pegasus and ob- served the same phenomenon, which for brevity we do
            not discuss it here. Figures 3 and 4 present the Percentage
            Inclusion results after performing mentioned adversarial
            perturbations on the baseline models and the latest chatbots,
            respectively. Character Level Perturbations: Without perturbations,
            BART-Large, T5-Small, and Pegasus, showed a high inclusion rate of
            87.4%, 82.6%, and 82.7%. However, Figure 3 shows that character
            insertions, deletions, and homoglyph swaps drastically reduced the
            Percentage Inclusion for all the models, e.g., to 18.8%, 17.43%, and
            14.4%, in the case of BART-Large. This suggests that these models
            are highly sensitive to subtle textual manipula- tions, with
            BART-Large being the most sensitive, then T5-Small, and Pegasus.
          </p>
          <h3 className="mt-4 ext-1xl font-bold mb-4">
            Word Level Perturbations:{" "}
          </h3>
          <p>
            A working example of Word Level Perturbation is shown in Table 2. We
            show the prevalence of the first three sentences in summaries before
            and after the application of word perturbations across the baseline
            models in Figure 3 and chatbots in Figure 4. Pegasus's inclusion
            rate falls from 82.7% to 38.61% with synonyms and drops to 22.89%
            and 18.28% after deletions and homoglyph swaps. Across models,
            word-level perturbations significantly impact the presence of
            initial sentences in summaries, revealing exploitable
            vulnerabilities in summarization prcesses. Figure 4 shows that
            chatbots are more robust to word-level perturbations compared to
            baseline models.
          </p>
          <h3 className="mt-4 ext-1xl font-bold mb-4">
            Sentence Level Perturbations:{" "}
          </h3>
          <p>
            Before any perturbations, BART-Large showed an inclusion rate, the
            frequency of initial sentence inclusion in summaries, of 87.4%, and
            drops to 20.2%, 13.77%, and I I .63%, respectively, after sentence
            replacement with a paraphrase, Homoglyphs, and sentence reordering.
            The same trend is seen for T5-Small and Pegasus. Figure 4 shows that
            before any perturba- tions, GPT-3.5 showed an inclusion rate of
            92.7%, and reduced to 83.5%, 37.32% and 28.71% after replacing
            sentence with paraphrase, homoglyphs and sentence re-ordering,
            respectively. Claude-Sonet with an inclusion rate of 91.45%, dropped
            to 87.9%,
          </p>
          <h2 className="mt-4 text-2xl font-bold mb-4">What to read next</h2>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:mt-10 lg:mt-12 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <Link href={feature.link} key={feature.name} passHref>
                    <div className="relative pl-16 cursor-pointer">
                      <dt className="text-base font-semibold leading-7 text-gray-900">
                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600"></div>
                        {feature.name}
                      </dt>
                      <dd className="mt-2 text-base leading-7 text-gray-600">
                        {feature.description}
                      </dd>
                    </div>
                  </Link>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
