# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in AI-Evaluation-QA, please report it to us privately.

**Please do NOT create a public GitHub issue for security vulnerabilities.**

### How to Report

1. Email: [your-email@example.com] (Update with your actual email)
2. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Response Time**: Within 48 hours
- **Update Frequency**: Every 7 days until resolved
- **Disclosure**: Coordinated disclosure after fix is released

## Security Best Practices

When using this framework:

1. **API Keys**: Never commit API keys to version control
2. **Environment Variables**: Use `.env` files (gitignored)
3. **Input Validation**: Sanitize all user inputs
4. **Dependencies**: Keep dependencies updated
5. **Access Control**: Restrict access to reports containing sensitive data

## Known Security Considerations

- API keys are stored in environment variables
- Generated reports may contain prompt/response data
- Network requests to LLM providers
