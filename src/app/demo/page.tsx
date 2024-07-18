"use client";
import { useState } from "react";
import ResponseCard from "../components/ResponseCard";
export default function Demo() {
  const [model, setModel] = useState("");
  const [dataset, setDataset] = useState("");
  const [split, setSplit] = useState("");
  const [size, setSize] = useState("");
  const [perturbation, setPerturbation] = useState("");
  const [response, setResponse] = useState({ original: "", perturbed: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });
    const data = await res.json();
    setResponse(data);
  };

  const originalText = "placeholder for text";
  const perturbedText = "perturbed test example";

  return (
    <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4">Perturbation Demo</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Model
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="input input-bordered input-primary w-full max-w-xs"
              >
                <option value="">Select model</option>
                <option value="model1">facebook/bart-large-cnn</option>
                <option value="model2">Model 2</option>
                <option value="model3">Model 3</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Dataset
              </label>
              <select
                value={dataset}
                onChange={(e) => setDataset(e.target.value)}
                className="input input-bordered input-primary w-full max-w-xs"
              >
                <option value="">Select dataset</option>
                <option value="dataset1">alexfabbri/multi_news</option>
                <option value="dataset2">yaolu/multi_x_science_sum</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Split
              </label>
              <select
                value={split}
                onChange={(e) => setSplit(e.target.value)}
                className="input input-bordered input-primary w-full max-w-xs"
              >
                <option value="">Select split</option>
                <option value="train">Train</option>
                <option value="validation">Validation</option>
                <option value="test">Test</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Size
              </label>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Enter size"
                className="input input-bordered input-primary w-full max-w-xs"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Perturbation
              </label>
              <select
                value={perturbation}
                onChange={(e) => setPerturbation(e.target.value)}
                className="input input-bordered input-primary w-full max-w-xs"
              >
                <option value="">Select perturbation</option>
                <option value="perturbation1">character_swap</option>
                <option value="perturbation2">character_delete</option>
                <option value="perturbation3">character_insert</option>
                <option value="perturbation4">character_replace</option>
                <option value="perturbation5">character_repeat</option>
                <option value="perturbation6">word_delete</option>
                <option value="perturbation7">word_synonym</option>
                <option value="perturbation8">word_homograph</option>
                <option value="perturbation9">sentence_paraphrase</option>
                <option value="perturbation10">sentence_reorder</option>
                <option value="perturbation11">document_reorder</option>
              </select>
            </div>
            <button className="btn btn-primary mt-4 text-white" type="submit">
              Go!
            </button>
          </form>
        </div>
        <div className="container mx-auto bg-slate-200 rounded-xl shadow-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Results</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-md p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Original
                </h3>
                <p className="mt-2 text-gray-700">{originalText}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Perturbed
                </h3>
                <p className="mt-2 text-gray-700">{perturbedText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
