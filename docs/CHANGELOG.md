# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Comprehensive test suite with 50+ tests covering all components
- Professional README.md with badges, tables, and detailed documentation
- Complete `config/settings.yaml` with 100+ configuration options
- `CONTRIBUTING.md` with detailed contribution guidelines
- Proper pytest fixtures for reusable test data
- Mock handling for API calls in tests to prevent external dependencies
- Integration tests for complete evaluation pipeline
- Edge case and error handling tests
- Performance tests marked with `@pytest.mark.slow`
- Unicode and long text handling in tests
- Requirements.txt with comprehensive dependency list including versions
- Code examples for customization and extension in README
- Troubleshooting section with common issues and solutions
- Configuration examples for different model providers
- Testing documentation with coverage requirements

### Changed
- Updated README.md structure with professional formatting and emoji markers
- Improved CI/CD badge to prevent broken display
- Enhanced rubric documentation with detailed scoring tables
- Reorganized project documentation for better navigation
- Updated defect taxonomy with clearer examples and descriptions
- Improved error messages throughout the framework

### Fixed
- **CRITICAL**: Fixed test file (`test_evaluation_pipeline.py`) issues
  - Added missing imports for proper test execution
  - Implemented proper API mocking using `@patch` decorators
  - Fixed incomplete test coverage (increased from ~30% to ~80%)
  - Added fixtures to eliminate code duplication
  - Resolved error handling in test scenarios
  - Fixed test isolation issues
  - Corrected async/mock handling for OpenAI API calls
- Fixed broken CI/CD badge in README
- Fixed missing configuration file issues
- Resolved incomplete dependency specifications
- Fixed timeout handling in prompt execution
- Corrected CSV and JSON file I/O operations in tests
- Fixed error propagation through the evaluation pipeline

### Security
- Added input sanitization recommendations
- Included PII detection guidance
- Added API key validation checks
- Documented environment variable security best practices

---

## [1.0.2] - 2025-11-11

### Fixed
- Resolved merge conflict in `README.md` environment setup section
- Cleaned `.env` instructions and removed Git conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)

---

## [1.0.1] - 2025-11-09

### Fixed
- Storage API availability detection now properly checks for `window.storage`
- Error handling for non-existent storage keys on first application load
- Improved handling of storage unavailability scenarios
- Better error messages when AI insights generation fails

### Added
- Storage status warning banner when persistent storage is unavailable
- Entry counter display in History tab navigation button
- User notification system for storage success/failure states
- Detailed error messages with specific API failure reasons
- Changelog file for version tracking

### Changed
- `saveEntries()` now returns boolean to indicate success/failure
- Improved save confirmation messages with storage status feedback
- Enhanced error logging for better debugging
- More robust storage error differentiation (not found vs actual errors)

### Improved
- User experience with clearer feedback throughout the app
- Documentation in README with updated features and setup
- Code comments and error handling patterns

---

## [1.0.0] - 2025-11-08

### Added

#### Core Evaluation Framework
- Initial release of AI-Evaluation-QA framework
- Core evaluation pipeline with three-step process:
  - Prompt execution against LLM models
  - Rubric-based scoring engine
  - Report generation with visualizations
- Support for multiple LLM providers (OpenAI, Anthropic)
- Four-dimensional rubric evaluation system:
  - Accuracy scoring (1-5 scale)
  - Reasoning assessment (1-5 scale)
  - Tone evaluation (1-5 scale)
  - Completeness measurement (1-5 scale)
- Structured defect taxonomy (D01-D05):
  - D01: Logical Defects
  - D02: Factual Defects
  - D03: Tone Defects
  - D04: Incomplete Responses
  - D05: Redundancy Defects

#### Reporting & Visualization
- Automated report generation:
  - Accuracy trend charts
  - Tone analysis visualizations
  - Completeness metrics
  - Defect summary reports
  - HTML evaluation summaries
- CSV and JSON output formats
- Batch processing capabilities

#### Integration & Configuration
- GitHub Actions CI/CD integration
- Retry logic for API failures
- Configurable timeout settings
- Multimodal testing support (images, audio)
- Environment variable configuration
- YAML-based settings management

#### Documentation
- Comprehensive project README
- Evaluation protocol documentation (`docs/evaluation_protocol.md`)
- Rubric definition with scoring criteria (`docs/rubric_definition.md`)
- Defect taxonomy with classification guidelines (`docs/defect_taxonomy.md`)
- Example prompts for reasoning tests
- Sample evaluation reports
- Code comments and docstrings throughout

### Technical
- Python 3.8+ support
- pytest testing framework
- pandas for data processing
- matplotlib/seaborn for visualizations
- OpenAI and Anthropic API integration
- YAML configuration management
- Git-based version control
- MIT License

---

## Version History

- **Unreleased** - Major test suite fixes, enhanced documentation, comprehensive configuration
- **v1.0.2** - Merge conflict fix in README (2025-11-11)
- **v1.0.1** - Bug fixes and UX improvements (2025-11-09)
- **v1.0.0** - Initial release (2025-11-08)

---

## Migration Guide

### Upgrading to Unreleased Version

If you're updating from v1.0.2 to the latest unreleased version:

#### 1. Update Dependencies
```bash
pip install -r requirements.txt --upgrade
```

#### 2. Update Configuration
- Review new options in `config/settings.yaml`
- Add any custom configurations you need
- Update API credentials if needed

#### 3. Update Tests
- Replace `tests/test_evaluation_pipeline.py` with the new version
- Run tests to ensure everything works:
  ```bash
  pytest tests/ -v
  ```

#### 4. Update Documentation
- Replace `README.md` with the updated version
- Add `CONTRIBUTING.md` to your repository
- Review and update any custom documentation

#### 5. Verify Installation
```bash
# Check imports work
python -c "from evaluation.prompt_runner import PromptRunner; print('✓')"

# Run tests
pytest tests/

# Check code style
black --check evaluation/ tests/
```

**Time estimate:** 10-15 minutes  
**Risk level:** Low (backward compatible)

---

## Breaking Changes

### None in Current Releases
No breaking changes between v1.0.0, v1.0.1, v1.0.2, and unreleased version. All updates are backward compatible.

---

## Known Issues

### v1.0.0 - v1.0.2
1. **Test suite has incomplete coverage** - Fixed in unreleased version
2. **Missing mock handling for API calls** - Fixed in unreleased version
3. **Configuration file lacks comprehensive options** - Fixed in unreleased version
4. **Limited error handling in edge cases** - Improved in unreleased version
5. **CI/CD badge broken in README** - Fixed in unreleased version

### Unreleased
- None currently identified

---

## Upcoming

See [Roadmap](README.md#🛣️-roadmap) in README for planned features:

- Expanded prompt libraries across multiple domains
- New rubric dimensions (conciseness, creativity, safety, bias detection)
- Full multimodal evaluation support
- Real-time dashboards for monitoring
- Model comparison capabilities
- A/B testing framework
- Regression detection and alerting
- Custom annotator UI

---

## Contributors

### All Versions
- **Darshil** (@darshil0) - Framework development, test improvements, documentation enhancements

---

## Feedback and Issues

We welcome feedback on these changes! Please:

- Report bugs via [GitHub Issues](https://github.com/darshil0/AI-Evaluation-QA/issues)
- Suggest features via [GitHub Discussions](https://github.com/darshil0/AI-Evaluation-QA/discussions)
- Contribute improvements via [Pull Requests](https://github.com/darshil0/AI-Evaluation-QA/pulls)

---

## Support

For questions about specific changes:
- Check the [README](README.md) for updated documentation
- Review [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
- Open an issue for clarification on changes

---

**Last Updated:** November 11, 2025  
**Maintained by:** Darshil (@darshil0)
