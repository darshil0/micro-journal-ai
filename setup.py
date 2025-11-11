from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

with open("requirements.txt", "r", encoding="utf-8") as fh:
    requirements = [line.strip() for line in fh if line.strip() and not line.startswith("#")]

setup(
    name="ai-evaluation-qa",
    version="1.0.0",
    author="Darshil",
    description="A production-grade framework for evaluating AI model responses",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/darshil0/AI-Evaluation-QA",
    packages=find_packages(exclude=["tests", "docs"]),
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
    ],
    python_requires=">=3.8",
    install_requires=requirements,
    entry_points={
        "console_scripts": [
            "evaluate-prompts=evaluation.prompt_runner:main",
            "score-responses=evaluation.scoring_engine:main",
            "generate-reports=evaluation.report_generator:main",
        ],
    },
)
