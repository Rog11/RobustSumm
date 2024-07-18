import React from "react";

const ResponseCard = ({ response }) => {
  // Extract labels and scores from the response
  const predictions = response[0]; 

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Response:</h2>
        {/* <pre className="bg-gray-100 p-4 rounded-md">
          {JSON.stringify(response, null, 2)}
        </pre> */}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Results:</h2>
        {predictions.map((prediction, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold">{prediction.label}</h3>
            <div className="space-y-2">
              <progress
                className="progress w-full"
                value={prediction.score * 100}
                max="100"
              ></progress>
              <p className="text-sm text-gray-600">
                {Math.round(prediction.score * 100)}% Confidence
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponseCard;
