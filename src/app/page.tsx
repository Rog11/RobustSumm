import Image from "next/image";
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

  // return (
  //   <div className="flex items-center justify-center h-screen bg-gray-100">
  //     <div className="text-center p-8 bg-white shadow-lg rounded-lg">
  //       <h1 className="text-4xl font-bold text-gray-800 mb-4">Site Under Maintenance</h1>
  //       <p className="text-lg text-gray-600">We are currently performing scheduled maintenance.</p>
  //       <p className="text-lg text-gray-600">We'll be back shortly!</p>
  //     </div>
  //   </div>
  // )

  return (
    <div className="bg-base-100">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="max-w-5xl mx-auto text-5xl font-bold">
          Attacks Against Text Summarization Models through Lead Bias and
          Influence Functions
        </h1>
        <h2 className="mt-4 text-2xl opacity-80">Adversarial Perturbations:</h2>
        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/perturbations">
            <button className="btn btn-primary">
              See Perturbations
            </button>
          </Link>
          <Link href="/how-it-works">
            <button className="btn btn-ghost">
              How it works? <span aria-hidden="true">→</span>
            </button>
          </Link>
        </div>
        <div className="max-w-5xl mx-auto mt-12 text-left">
          <h2 className="text-3xl font-bold">
            Character swapping example:
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
            <table className="table table-zebra w-full text-left">
              {/* Table Head */}
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Description</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                <tr>
                  <td>--model</td>
                  <td>
                    Hugging Face model identifier (e.g.,
                    'facebook/bart-large-cnn')
                  </td>
                </tr>
                <tr>
                  <td>--dataset</td>
                  <td>
                    Dataset name ('alexfabbri/multi_news' or
                    'yaolu/multi_x_science_sum')
                  </td>
                </tr>
                <tr>
                  <td>--split</td>
                  <td>
                    Dataset split to use ('train', 'validation', or 'test')
                  </td>
                </tr>
                <tr>
                  <td>--size</td>
                  <td>
                    Number of examples to process
                  </td>
                </tr>
                <tr>
                  <td>--perturbation</td>
                  <td>
                    Type of perturbation to apply
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="font-semibold">
                    Perturbation Types
                  </td>
                </tr>
                <tr>
                  <td>character_swap</td>
                  <td>
                    Swap two adjacent characters
                  </td>
                </tr>
                <tr>
                  <td>character_delete</td>
                  <td>
                    Delete a random character
                  </td>
                </tr>
                <tr>
                  <td>character_insert</td>
                  <td>
                    Insert a random character
                  </td>
                </tr>
                <tr>
                  <td>character_replace</td>
                  <td>
                    Replace a character with a random one
                  </td>
                </tr>
                <tr>
                  <td>character_repeat</td>
                  <td>
                    Repeat a random character
                  </td>
                </tr>
                <tr>
                  <td>word_delete</td>
                  <td>
                    Delete a word
                  </td>
                </tr>
                <tr>
                  <td>word_synonym</td>
                  <td>
                    Replace a word with its synonym
                  </td>
                </tr>
                <tr>
                  <td>word_homograph</td>
                  <td>
                    Replace a word with a homograph
                  </td>
                </tr>
                <tr>
                  <td>sentence_paraphrase</td>
                  <td>
                    Paraphrase a sentence
                  </td>
                </tr>
                <tr>
                  <td>sentence_reorder</td>
                  <td>
                    Reorder words in a sentence
                  </td>
                </tr>
                <tr>
                  <td>document_reorder</td>
                  <td>
                    Reorder sentences in a document
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold mt-4">
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
        <div className="max-w-5xl mx-auto p-4">
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
