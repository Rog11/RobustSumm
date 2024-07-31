import subprocess
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    model = data['model']
    dataset = data['dataset']
    split = data['split']
    size = data['size']
    perturbation = data['perturbation']

    command = [
        'summarization_robustness',
        '--model', model,
        '--dataset', dataset,
        '--split', split,
        '--size', str(size),
        '--perturbation', perturbation
    ]

    try:
        result = subprocess.run(command, capture_output=True, text=True, check=True)
        with open('results.json', 'r') as f:
            results = json.load(f)  
        return jsonify(results)
    except subprocess.CalledProcessError as e:       
        return jsonify({"error": str(e), "output": e.output})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

