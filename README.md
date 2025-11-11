# Micro Journal AI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://github.com/darshil0/AI-Evaluation-QA/actions)

A production-grade framework for evaluating AI model responses through structured prompts, rubric-based scoring, and automated reporting. This project brings enterprise quality assurance methodologies to AI system validation, ensuring responses meet accuracy, reasoning, and quality standards.

**Author:** Darshil  
**Version:** 2.1.3  
**License:** MIT

---

## 🎯 Overview

This framework enables systematic evaluation of large language models by applying QA principles traditionally used in software testing. It provides tools to design test prompts, execute them against AI models, score responses using defined rubrics, and generate comprehensive reports with defect tracking.

### Key Features

- **Automated Prompt Execution** - Run test suites against multiple LLM providers with consistent interfaces
- **Multi-Dimensional Scoring** - Evaluate responses across accuracy, reasoning, tone, and completeness using customizable rubrics
- **Defect Classification** - Track and categorize issues using a structured taxonomy (D01-D05)
- **Visual Reporting** - Generate comprehensive reports with charts, metrics, and trend analysis
- **CI/CD Integration** - Automated evaluation pipeline via GitHub Actions
- **Multimodal Support** - Test capabilities with text, image, and audio inputs

---

## 📁 Project Structure

```
AI-Evaluation-QA/
├── config/
│   └── settings.yaml              # Model and API configuration
├── data/
│   ├── prompts/
│   │   └── reasoning_tests.json   # Test prompt definitions
│   ├── annotations/
│   │   └── rubric_scores.csv      # Manual scoring data
│   └── datasets/
│       └── multimodal_examples/   # Audio, image test cases
├── evaluation/
│   ├── prompt_runner.py           # Executes prompts against models
│   ├── scoring_engine.py          # Applies rubric scoring
│   └── report_generator.py        # Creates visualizations
├── reports/
│   └── sample_run/                # Generated evaluation reports
├── tests/
│   └── test_evaluation_pipeline.py # Unit and integration tests
├── docs/
│   ├── evaluation_protocol.md     # Step-by-step evaluation guide
│   ├── rubric_definition.md       # Scoring criteria details
│   └── defect_taxonomy.md         # Defect classification system
├── .github/
│   └── workflows/
│       └── evaluate.yml           # Automated CI/CD pipeline
├── requirements.txt               # Python dependencies
└── README.md                      # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- API credentials for your target LLM provider (OpenAI, Anthropic, etc.)
- Git (for cloning the repository)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/darshil0/AI-Evaluation-QA.git
cd AI-Evaluation-QA
```

2. **Create and activate a virtual environment** (recommended)

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

4. **Configure API credentials**

For local development:
```bash
export OPENAI_API_KEY="your_api_key_here"
# Or for other providers:
export ANTHROPIC_API_KEY="your_api_key_here"
```

For GitHub Actions, add your API key as a repository secret named `OPENAI_API_KEY` in Settings → Secrets and variables → Actions.

---

## 📖 Usage

The evaluation pipeline runs in three distinct steps to maintain separation of concerns and enable incremental analysis.

### Step 1: Execute Prompts

Run your test prompts against the AI model and capture raw responses:

```bash
python evaluation/prompt_runner.py data/prompts/reasoning_tests.json
```

**Output:** `reports/run_results.csv` containing model responses to each prompt.

**Optional Arguments:**
- `--output-dir`: Specify custom output directory (default: `reports/`)
- `--model`: Override model specified in config (e.g., `gpt-4`, `claude-3-opus`)
- `--timeout`: Set request timeout in seconds (default: 30)

### Step 2: Apply Scoring

Score the responses using your defined rubric:

```bash
python evaluation/scoring_engine.py reports/run_results.csv
```

**Output:** `reports/run_results_scored.csv` with rubric scores across all dimensions.

**Optional Arguments:**
- `--rubric`: Path to custom rubric definition file
- `--annotator`: Name/ID of the person scoring (for multi-annotator analysis)

### Step 3: Generate Reports

Create visual representations of the evaluation results:

```bash
python evaluation/report_generator.py reports/run_results_scored.csv
```

**Output:** Charts and summary reports in `reports/sample_run/`:
- `accuracy_trends.png` - Accuracy scores over time
- `tone_analysis.png` - Distribution of tone scores
- `completeness_metrics.png` - Completeness analysis
- `defect_summary.csv` - Categorized defects with counts
- `evaluation_summary.html` - Comprehensive HTML report

---

## 📊 Evaluation Rubric

The framework evaluates responses across four key dimensions, each scored on a 1-5 scale:

### 1. Accuracy
Measures the correctness and factual validity of the response.

| Score | Description |
|-------|-------------|
| 5 | Verified, correct information with no factual errors |
| 4 | Mostly accurate with minor, non-critical errors |
| 3 | Partially accurate; contains notable inaccuracies |
| 2 | Significantly incorrect with major factual errors |
| 1 | Fundamentally incorrect or misleading information |

### 2. Reasoning
Assesses the logical structure and explanation quality.

| Score | Description |
|-------|-------------|
| 5 | Clear cause-effect relationships with well-structured arguments |
| 4 | Sound logic with minor gaps in reasoning chain |
| 3 | Adequate reasoning but lacks depth or clarity |
| 2 | Flawed logic with significant reasoning gaps |
| 1 | Logical fallacies or unsupported conclusions |

### 3. Tone
Evaluates empathy, professionalism, and communication style.

| Score | Description |
|-------|-------------|
| 5 | Respectful, clear, and appropriately empathetic |
| 4 | Generally appropriate with minor tone issues |
| 3 | Neutral but lacks warmth or context-appropriate empathy |
| 2 | Somewhat inappropriate, harsh, or insensitive |
| 1 | Highly inappropriate, offensive, or disrespectful |

### 4. Completeness
Determines whether all expected points are addressed.

| Score | Description |
|-------|-------------|
| 5 | Covers all aspects thoroughly with no omissions |
| 4 | Covers most points with minor omissions |
| 3 | Addresses core points but misses important details |
| 2 | Significant gaps; only partial coverage |
| 1 | Incomplete; fails to address key aspects |

For detailed scoring criteria and examples, see [`docs/rubric_definition.md`](docs/rubric_definition.md).

---

## 🐛 Defect Taxonomy

Identified issues are categorized using a structured taxonomy:

| Code | Type | Description | Example |
|------|------|-------------|---------|
| **D01** | Logical Defects | Incorrect reasoning chains or invalid assumptions | Misinterpreting conditional statements, drawing unsupported conclusions |
| **D02** | Factual Defects | Contradictions with verified data | Wrong dosages, incorrect dates, misattributed quotes |
| **D03** | Tone Defects | Inappropriate communication style | Insensitive responses, harsh language, lack of empathy |
| **D04** | Incomplete Responses | Missing key points or partial answers | Omitted treatment options, failure to acknowledge nuances |
| **D05** | Redundancy Defects | Verbose or circular reasoning | Repetitive points, unnecessary elaboration |

See the complete taxonomy with examples in [`docs/defect_taxonomy.md`](docs/defect_taxonomy.md).

---

## 🔄 CI/CD Integration

The included GitHub Actions workflow automatically evaluates prompts on code changes.

### Workflow Triggers
- Push to `main` branch
- Manual workflow dispatch
- Pull requests (optional)

### Workflow Steps
1. Set up Python environment
2. Install dependencies
3. Securely access API credentials from secrets
4. Run complete evaluation pipeline
5. Upload reports as downloadable artifacts

### Viewing Results
1. Navigate to the **Actions** tab in your GitHub repository
2. Select the latest evaluation run
3. Download artifacts to view reports

**Workflow file:** [`.github/workflows/evaluate.yml`](.github/workflows/evaluate.yml)

---

## 🔧 Configuration

### Model Configuration (`config/settings.yaml`)

```yaml
model:
  provider: "openai"           # openai, anthropic, huggingface
  name: "gpt-4"               # Specific model identifier
  temperature: 0.7            # Creativity vs determinism (0-1)
  max_tokens: 2048            # Maximum response length
  timeout: 30                 # Request timeout in seconds

evaluation:
  batch_size: 10              # Prompts to process in parallel
  retry_attempts: 3           # Retries for failed requests
  retry_delay: 5              # Seconds between retries

output:
  format: "csv"               # csv, json
  include_metadata: true      # Include timestamps, model info
  save_raw_responses: true    # Save complete API responses
```

### Adding Custom Prompts

Create JSON files in `data/prompts/` following this structure:

```json
{
  "prompts": [
    {
      "id": "prompt_001",
      "category": "reasoning",
      "prompt": "Explain why water boils at lower temperatures at high altitudes.",
      "expected_elements": [
        "atmospheric pressure relationship",
        "boiling point definition",
        "practical implications"
      ],
      "difficulty": "medium"
    }
  ]
}
```

### Customizing Rubrics

Modify `evaluation/scoring_engine.py` to add new dimensions:

```python
def score_dimension_custom(response: str, prompt: str) -> int:
    """
    Score a custom dimension.
    
    Args:
        response: Model's response text
        prompt: Original prompt text
        
    Returns:
        Score from 1-5
    """
    # Your custom scoring logic here
    return score
```

Update `docs/rubric_definition.md` to document new criteria.

---

## 🔌 Extending the Framework

### Supporting Additional Models

1. Update `config/settings.yaml` with new provider details
2. Modify `evaluation/prompt_runner.py` to handle provider-specific API formats
3. Add provider-specific error handling

Example for custom provider:

```python
def call_custom_model(prompt: str, config: dict) -> str:
    """Call a custom LLM provider."""
    response = requests.post(
        config['endpoint'],
        headers={'Authorization': f"Bearer {config['api_key']}"},
        json={'prompt': prompt, 'max_tokens': config['max_tokens']}
    )
    return response.json()['text']
```

### Multimodal Testing

Place test assets in `data/datasets/multimodal_examples/` and extend the prompt runner:

```python
def evaluate_image_prompt(image_path: str, prompt: str) -> str:
    """Evaluate a prompt with image input."""
    with open(image_path, 'rb') as f:
        image_data = base64.b64encode(f.read()).decode()
    
    # Provider-specific image handling
    response = call_model_with_image(prompt, image_data)
    return response
```

---

## 🧪 Testing

Run the test suite to ensure everything works correctly:

```bash
# Run all tests
pytest tests/

# Run with coverage
pytest tests/ --cov=evaluation --cov-report=html

# Run specific test file
pytest tests/test_evaluation_pipeline.py

# Run tests with verbose output
pytest tests/ -v
```

**Test Coverage Areas:**
- Prompt execution with various input types
- Scoring engine accuracy with known responses
- Report generation and visualization
- Error handling and edge cases
- API integration tests (mocked)

---

## 🛣️ Roadmap

Future enhancements planned for this framework:

- **Expanded Prompt Libraries** - Additional test suites for reasoning, factual knowledge, creative writing, and empathy scenarios
- **New Rubric Dimensions** - Conciseness, creativity, safety, and bias detection
- **Multimodal Evaluation** - Full support for audio and image inputs with specialized scoring
- **Real-Time Dashboards** - Interactive web-based dashboards for live monitoring
- **Model Comparison** - Side-by-side evaluation of multiple LLMs with statistical significance testing
- **A/B Testing Framework** - Tools for comparing prompt variations and measuring impact
- **Regression Detection** - Automated alerts when model performance degrades
- **Custom Annotator UI** - Web interface for manual scoring and review

---

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[`evaluation_protocol.md`](docs/evaluation_protocol.md)** - Step-by-step instructions for running evaluations
- **[`rubric_definition.md`](docs/rubric_definition.md)** - Detailed scoring criteria with examples
- **[`defect_taxonomy.md`](docs/defect_taxonomy.md)** - Complete defect classification guidelines

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and add tests
4. **Ensure all tests pass** (`pytest tests/`)
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to your fork** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Contribution Guidelines

- Ensure code follows PEP 8 style guidelines
- Add unit tests for new functionality
- Update documentation for any API changes
- Document new rubric dimensions or defect categories thoroughly
- Include examples in docstrings

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for detailed guidelines.

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** `ModuleNotFoundError: No module named 'openai'`  
**Solution:** Ensure you've activated your virtual environment and run `pip install -r requirements.txt`

**Issue:** `API authentication failed`  
**Solution:** Verify your API key is correctly set: `echo $OPENAI_API_KEY`

**Issue:** `FileNotFoundError: 'data/prompts/reasoning_tests.json'`  
**Solution:** Ensure you're running commands from the project root directory

**Issue:** Timeout errors during prompt execution  
**Solution:** Increase timeout in config.yaml or use `--timeout` flag

**Issue:** Empty or malformed CSV outputs  
**Solution:** Check logs for API errors; verify prompt format in JSON files

For additional help, open an issue in the repository.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Darshil**  
- GitHub: [@darshil0](https://github.com/darshil0)
- Project Link: [https://github.com/darshil0/AI-Evaluation-QA](https://github.com/darshil0/AI-Evaluation-QA)

For questions, collaboration opportunities, or bug reports, please open an issue in the repository.

---

## 🙏 Acknowledgments

- Inspired by OpenAI Evals and LangChain evaluation frameworks
- Built with contributions from the open-source AI community
- Special thanks to early testers and contributors

---

**Version 2.1.3** - Last Updated: November 2025
