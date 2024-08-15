from setuptools import setup, find_packages

setup(
    name='summarization_robustness',
    version='0.1.0',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'Click',
        'nltk',
        'scikit-learn',
        'transformers',
        'datasets',
        'rouge-score',
        'torch',
    ],
    entry_points={
        'console_scripts': [
            'summarization_robustness=summarization_robustness.cli:evaluate',
        ],
    },
)
