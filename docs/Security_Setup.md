# Security Setup Instructions

## Quick Answer: Where to Put These Files

### Setup Scripts Location

**Location:** Root directory of your project (`AI-Evaluation-QA/`)

```
AI-Evaluation-QA/
├── setup_security.sh        ← Add this (Linux/Mac)
├── setup_security.bat       ← Add this (Windows)
├── SETUP_INSTRUCTIONS.md    ← Add this (optional)
├── .gitignore
├── .env.example
├── README.md
└── ... (other files)
```

---

## How to Use

### Option 1: Automated Setup (Recommended)

#### **For Linux/Mac:**

```bash
# 1. Save the setup_security.sh script to your project root
cd AI-Evaluation-QA/

# 2. Make it executable
chmod +x setup_security.sh

# 3. Run it
./setup_security.sh
```

#### **For Windows:**

```batch
REM 1. Save the setup_security.bat script to your project root
cd AI-Evaluation-QA

REM 2. Run it
setup_security.bat
```

---

### Option 2: Manual Setup (Step by Step)

If you prefer to run commands manually instead of using the script:

#### **Step 1: Install Security Tools**

```bash
pip install detect-secrets safety bandit pre-commit
```

#### **Step 2: Create .env File**

```bash
# Copy the example file
cp .env.example .env

# Edit it with your API keys
nano .env  # or vim, code, notepad, etc.
```

#### **Step 3: Verify .gitignore**

```bash
# Check if .env is in .gitignore
cat .gitignore | grep .env

# If not, add it
echo ".env" >> .gitignore
```

#### **Step 4: Initialize Secret Scanning**

```bash
detect-secrets scan > .secrets.baseline
```

#### **Step 5: Set Up Pre-commit Hooks**

```bash
pre-commit install
```

#### **Step 6: Create Required Directories**

```bash
mkdir -p evaluation tests logs reports/sample_run
mkdir -p data/prompts data/annotations data/datasets/multimodal_examples
mkdir -p .github/workflows .github/ISSUE_TEMPLATE
touch evaluation/__init__.py tests/__init__.py
```

#### **Step 7: Run Security Checks**

```bash
# Check for secrets
detect-secrets scan

# Check for vulnerabilities
safety check

# Run security linter
bandit -r evaluation/

# Test pre-commit hooks
pre-commit run --all-files
```

---

## What Each Script Does

### `setup_security.sh` / `setup_security.bat`

These scripts automate the entire security setup process:

1. ✅ Checks for Python, pip, and git
2. ✅ Installs security tools (detect-secrets, safety, bandit, pre-commit)
3. ✅ Creates `.env` file from `.env.example`
4. ✅ Verifies `.env` is in `.gitignore`
5. ✅ Initializes secret scanning baseline
6. ✅ Installs pre-commit hooks
7. ✅ Creates all required directories
8. ✅ Runs initial security checks
9. ✅ Provides next steps and useful commands

---

## After Running Setup

### 1. Edit Your .env File

Add your actual API keys:

```bash
# Linux/Mac
nano .env

# Windows
notepad .env
```

Your `.env` should look like:
```bash
OPENAI_API_KEY=sk-proj-your-actual-key-here
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

### 2. Verify Security

```bash
# Make sure .env is NOT tracked by git
git status  # Should NOT show .env file

# Scan for any secrets
detect-secrets scan

# Check for vulnerabilities
safety check
```

### 3. Make Your First Commit

```bash
git add .
git commit -m "feat: add security configuration"
git push
```

---

## File Locations Reference

Here's where each security file should be placed:

```
AI-Evaluation-QA/                    # Root directory
│
├── .env                             # ❌ NEVER COMMIT (local only)
├── .env.example                     # ✅ Commit this
├── .gitignore                       # ✅ Commit this
├── .flake8                          # ✅ Commit this
├── .pre-commit-config.yaml          # ✅ Commit this
├── .secrets.baseline                # ✅ Commit this
├── pyproject.toml                   # ✅ Commit this
├── SECURITY.md                      # ✅ Commit this
├── setup_security.sh                # ✅ Commit this (optional)
├── setup_security.bat               # ✅ Commit this (optional)
│
├── .github/
│   ├── workflows/
│   │   ├── evaluate.yml             # ✅ Commit this
│   │   └── security.yml             # ✅ Commit this
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md            # ✅ Commit this
│   │   └── feature_request.md       # ✅ Commit this
│   └── PULL_REQUEST_TEMPLATE.md     # ✅ Commit this
│
├── evaluation/
│   ├── __init__.py                  # ✅ Commit this
│   ├── sanitizer.py                 # ✅ Commit this
│   ├── config_loader.py             # ✅ Commit this
│   └── ... (other files)
│
└── tests/
    ├── __init__.py                  # ✅ Commit this
    ├── test_security.py             # ✅ Commit this
    └── ... (other tests)
```

---

## Troubleshooting

### Issue: "Command not found: detect-secrets"

**Solution:**
```bash
pip install detect-secrets
# or
pip3 install detect-secrets
```

### Issue: ".env file appears in git status"

**Solution:**
```bash
# Remove from git tracking (keeps local file)
git rm --cached .env

# Verify .env is in .gitignore
cat .gitignore | grep .env

# If not there, add it
echo ".env" >> .gitignore

# Commit the changes
git commit -m "fix: remove .env from tracking"
```

### Issue: "Pre-commit hooks not running"

**Solution:**
```bash
# Reinstall hooks
pre-commit uninstall
pre-commit install

# Test hooks
pre-commit run --all-files
```

### Issue: "Permission denied when running setup_security.sh"

**Solution:**
```bash
# Make script executable
chmod +x setup_security.sh

# Then run it
./setup_security.sh
```

### Issue: "Python/pip not found"

**Solution:**
- Install Python 3.8+ from [python.org](https://python.org)
- Make sure to check "Add Python to PATH" during installation
- Restart your terminal/command prompt

---

## Security Checklist

Before making your first commit:

- [ ] `.gitignore` exists and includes `.env`
- [ ] `.env.example` exists (without real secrets)
- [ ] `.env` exists locally (with real secrets)
- [ ] `.env` does NOT appear in `git status`
- [ ] `SECURITY.md` is present
- [ ] Secret scanning passes: `detect-secrets scan`
- [ ] No vulnerabilities: `safety check`
- [ ] Pre-commit hooks installed: `pre-commit run --all-files`
- [ ] All security files committed (except `.env`)

---

## Quick Commands Reference

```bash
# Check what's being committed
git status

# Scan for secrets
detect-secrets scan

# Check for vulnerabilities
safety check

# Run security linter
bandit -r evaluation/

# Test pre-commit hooks
pre-commit run --all-files

# Run all tests
pytest tests/ -v

# Check test coverage
pytest tests/ --cov=evaluation --cov-report=html

# Format code
black evaluation/ tests/

# Lint code
flake8 evaluation/ tests/
```

---

## Need Help?

1. Check the [SECURITY.md](SECURITY.md) file for detailed security information
2. Review the [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
3. Open an issue on GitHub if you encounter problems
4. Check the [README.md](README.md) for general project documentation

---

**Last Updated:** November 11, 2025
