import Image from "next/image";
import Navbar from "./Navbar";
import CodeSnippet from "./CodeSnippet";
import Link from "next/link";
import CopyButton from "./CopyButton";

export default function Home() {
  const code = `
  def character_perturbations(word, method):
    if method == 'swap':
        if len(word) > 1:
            i = random.randint(0, len(word) - 2)
            return word[:i] + word[i+1] + word[i] + word[i+2:]
    elif method == 'delete':
        if len(word) > 1:
            i = random.randint(0, len(word) - 1)
            return word[:i] + word[i+1:]
    elif method == 'insert':
        i = random.randint(0, len(word))
        return word[:i] + random.choice('abcdefghijklmnopqrstuvwxyz') + word[i:]
    elif method == 'homoglyph':
        homoglyphs = {'a': 'α', 'e': 'е', 'i': 'і', 'o': 'о', 'c': 'с', 'p': 'р', 'k': 'к', 'v': 'ѵ', 'n': 'п', 'u': 'υ'}
        return ''.join(homoglyphs.get(c, c) for c in word)
    return word`;

  const code2 = `summarization_robustness --model facebook/bart-large-cnn --dataset alexfabbri/multi_news --split test --size 100 --perturbation character_swap`;

  return (
    <div className="bg-white-50">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="px-60 py-15 text-5xl font-bold text-gray-800">
          Attacks Against Text Summarization Models through Lead Bias and
          Influence Functions
        </h1>
        <h2 className="mt-4 text-2xl">Adversarial Perturbations:</h2>
        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/perturbations">
            <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              See Perturbations
            </button>
          </Link>
          <Link href="/how-it-works">
            <button className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md shadow hover:bg-gray-400">
              How it works? <span aria-hidden="true">→</span>
            </button>
          </Link>
        </div>
        <div className="px-60 mt-12 text-left">
          <h2 className="text-3xl font-bold text-gray-800">
            Characters swapping example:
          </h2>
          <CopyButton code={code2} />
          <div className="mockup-code text-xs mt-2">
            <pre data-prefix="$">
              <code>
                summarization_robustness --model facebook/bart-large-cnn
                --dataset alexfabbri/multi_news --split test --size 100
                --perturbation character_swap
              </code>
            </pre>
          </div>

          {/* <CodeSnippet code={code2} language="cmd" /> */}
          <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full text-left border-collapse border border-gray-200">
              {/* Table Head */}
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-4 py-2">Option</th>
                  <th className="border border-gray-200 px-4 py-2">
                    Description
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">--model</td>
                  <td className="border border-gray-200 px-4 py-2">
                    Hugging Face model identifier (e.g.,
                    'facebook/bart-large-cnn')
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">
                    --dataset
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    Dataset name ('alexfabbri/multi_news' or
                    'yaolu/multi_x_science_sum')
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">--split</td>
                  <td className="border border-gray-200 px-4 py-2">
                    Dataset split to use ('train', 'validation', or 'test')
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">--size</td>
                  <td className="border border-gray-200 px-4 py-2">
                    Number of examples to process
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">
                    --perturbation
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    Type of perturbation to apply
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td
                    colSpan={2}
                    className="border border-gray-200 px-4 py-2 font-semibold"
                  >
                    Perturbation Types
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">
                    character_swap
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    Swap two adjacent characters
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">
                    character_delete
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    Delete a random character
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">
                    character_insert
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    Insert a random character
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">
                    character_replace
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    Replace a character with a random one
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">
                    character_repeat
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    Repeat a random character
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">
                    word_delete
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    Delete a word
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">
                    word_synonym
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    Replace a word with its synonym
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">
                    word_homograph
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    Replace a word with a homograph
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">
                    sentence_paraphrase
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    Paraphrase a sentence
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">
                    sentence_reorder
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    Reorder words in a sentence
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">
                    document_reorder
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    Reorder sentences in a document
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mt-4">
            Sample of character level perturbation:
          </h2>
          <CopyButton code={code} />
          <CodeSnippet code={code} language="python" />

          {/* <Image
            src="/images/framework.jpg"
            alt="Framework of adversarial Perturbations"
            className="mt-4"
            width={1200}
            height={900}
          /> */}
        </div>
        <div className="px-60 container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Q&A Section</h1>
          <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-2">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium">
              How it works
            </div>
            <div className="collapse-content">
              <p>
                Robustsumm is a novel approach by exploiting the inherent lead
                bias in summarization models, to perform adversarial
                perturbations
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
                Before any perturbations, BART-Large showed an inclusion rate,
                the frequency of initial sentence inclusion in summaries, of
                87.4%, and drops to 20.2%, 13.77%, and I I .63%, respectively,
                after sentence replacement with a paraphrase, Homoglyphs, and
                sentence reordering. The same trend is seen for T5-Small and
                Pegasus.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-2">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium">
              How to cite Robustsumm
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
