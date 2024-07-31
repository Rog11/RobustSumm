"use client";
import { useState } from "react";

export default function Demo() {
  const [model, setModel] = useState("");
  const [dataset, setDataset] = useState("");
  const [split, setSplit] = useState("");
  const [size, setSize] = useState("");
  const [perturbation, setPerturbation] = useState("");
  const [response, setResponse] = useState({
    original_document: "",
    original_summary: "",
    perturbed_document: "",
    new_summary: "",
    original_element: "",
    perturbed_element: "",
    rouge_scores_original: {
      rouge1: 0,
      rouge2: 0,
      rougeL: 0,
    },
    rouge_scores_perturbed: {
      rouge1: 0,
      rouge2: 0,
      rougeL: 0,
    },
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          dataset,
          split,
          size,
          perturbation,
        }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      console.log("Response Data:", data);
      if (Array.isArray(data) && data.length > 0) {
        setResponse(data[0]);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRougeScores = (scores) => ({
    rouge1: scores?.rouge1 ?? 0,
    rouge2: scores?.rouge2 ?? 0,
    rougeL: scores?.rougeL ?? 0,
  });

  const originalRougeScores = getRougeScores(response.rouge_scores_original);
  const perturbedRougeScores = getRougeScores(response.rouge_scores_perturbed);

  return (
    <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4">Perturbation Demo</h1>
      <div className="flex flex-wrap justify-between mb-6">
        <div className="mb-4 w-full sm:w-1/5 ml-0.5">
          <label className="block text-sm font-medium text-gray-700">
            Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="input input-bordered input-primary w-full"
          >
            <option value="">Select model</option>
            <option value="bart_multinews_framework">
              bart_multinews_framework
            </option>
            <option value="model2">Model 2</option>
            <option value="model3">Model 3</option>
          </select>
        </div>
        <div className="mb-4 w-full sm:w-1/5">
          <label className="block text-sm font-medium text-gray-700">
            Dataset
          </label>
          <select
            value={dataset}
            onChange={(e) => setDataset(e.target.value)}
            className="input input-bordered input-primary w-full"
          >
            <option value="">Select dataset</option>
            <option value="alexfabbri/multi_news">alexfabbri/multi_news</option>
            <option value="yaolu/multi_x_science_sum">
              yaolu/multi_x_science_sum
            </option>
          </select>
        </div>
        <div className="mb-4 w-full sm:w-1/5">
          <label className="block text-sm font-medium text-gray-700">
            Split
          </label>
          <select
            value={split}
            onChange={(e) => setSplit(e.target.value)}
            className="input input-bordered input-primary w-full"
          >
            <option value="">Select split</option>
            <option value="train">Train</option>
            <option value="validation">Validation</option>
            <option value="test">Test</option>
          </select>
        </div>
        <div className="mb-4 w-full sm:w-1/5">
          <label className="block text-sm font-medium text-gray-700">
            Size
          </label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Enter size"
            className="input input-bordered input-primary w-full"
          />
        </div>
        <div className="mb-4 w-full sm:w-1/5">
          <label className="block text-sm font-medium text-gray-700">
            Perturbation
          </label>
          <select
            value={perturbation}
            onChange={(e) => setPerturbation(e.target.value)}
            className="input input-bordered input-primary w-full"
          >
            <option value="">Select perturbation</option>
            <option value="character_swap">character_swap</option>
            <option value="character_delete">character_delete</option>
            <option value="character_insert">character_insert</option>
            <option value="character_replace">character_replace</option>
            <option value="character_repeat">character_repeat</option>
            <option value="word_delete">word_delete</option>
            <option value="word_synonym">word_synonym</option>
            <option value="word_homograph">word_homograph</option>
            <option value="sentence_paraphrase">sentence_paraphrase</option>
            <option value="sentence_reorder">sentence_reorder</option>
            <option value="document_reorder">document_reorder</option>
          </select>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <button
            className={`btn btn-primary mt-4 text-white ${
              loading ? "loading" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Go!"}
          </button>
        </form>
      </div>

      <div className="container mx-auto bg-slate-200 rounded-xl shadow-md mt-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Results</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Original Document
              </h3>
              <textarea
                className="w-full h-40 mt-2 p-2 border rounded"
                value={response.original_document}
                readOnly
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                Original Summary
              </h3>
              <textarea
                className="w-full h-40 mt-2 p-2 border rounded"
                value={response.original_summary}
                readOnly
              />
            </div>

            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Perturbed Document
              </h3>
              <textarea
                className="w-full h-40 mt-2 p-2 border rounded"
                value={response.perturbed_document}
                readOnly
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                Perturbed Summary
              </h3>
              <textarea
                className="w-full h-40 mt-2 p-2 border rounded"
                value={response.new_summary}
                readOnly
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">
              Original Element
            </h3>
            <p className="text-gray-700">
              {response.original_element || "N/A"}
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Perturbed Element
            </h3>
            <p className="text-gray-700">
              {response.perturbed_element || "N/A"}
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">
              ROUGE Scores
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-700">
                  Original
                </h4>
                <progress
                  className="progress w-full"
                  value={originalRougeScores.rouge1 * 100}
                  max="100"
                ></progress>
                <p className="text-gray-700">
                  ROUGE-1: {(originalRougeScores.rouge1 * 100).toFixed(2)}%
                </p>
                <progress
                  className="progress w-full"
                  value={originalRougeScores.rouge2 * 100}
                  max="100"
                ></progress>
                <p className="text-gray-700">
                  ROUGE-2: {(originalRougeScores.rouge2 * 100).toFixed(2)}%
                </p>
                <progress
                  className="progress w-full"
                  value={originalRougeScores.rougeL * 100}
                  max="100"
                ></progress>
                <p className="text-gray-700">
                  ROUGE-L: {(originalRougeScores.rougeL * 100).toFixed(2)}%
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-700">
                  Perturbed
                </h4>
                <progress
                  className="progress w-full"
                  value={perturbedRougeScores.rouge1 * 100}
                  max="100"
                ></progress>
                <p className="text-gray-700">
                  ROUGE-1: {(perturbedRougeScores.rouge1 * 100).toFixed(2)}%
                </p>
                <progress
                  className="progress w-full"
                  value={perturbedRougeScores.rouge2 * 100}
                  max="100"
                ></progress>
                <p className="text-gray-700">
                  ROUGE-2: {(perturbedRougeScores.rouge2 * 100).toFixed(2)}%
                </p>
                <progress
                  className="progress w-full"
                  value={perturbedRougeScores.rougeL * 100}
                  max="100"
                ></progress>
                <p className="text-gray-700">
                  ROUGE-L: {(perturbedRougeScores.rougeL * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
