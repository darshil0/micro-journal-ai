# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.2] - 2025-11-11

### Fixed

* Resolved merge conflict in `README.md` environment setup section
* Cleaned `.env` instructions and removed Git conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)

---

## [1.0.1] - 2025-11-09

### Fixed

* Storage API availability detection now properly checks for `window.storage`
* Error handling for non-existent storage keys on first application load
* Improved handling of storage unavailability scenarios
* Better error messages when AI insights generation fails

### Added

* Storage status warning banner when persistent storage is unavailable
* Entry counter display in History tab navigation button
* User notification system for storage success/failure states
* Detailed error messages with specific API failure reasons
* Changelog file for version tracking

### Changed

* `saveEntries()` now returns boolean to indicate success/failure
* Improved save confirmation messages with storage status feedback
* Enhanced error logging for better debugging
* More robust storage error differentiation (not found vs actual errors)

### Improved

* User experience with clearer feedback throughout the app
* Documentation in README with updated features and setup
* Code comments and error handling patterns

---

## [1.0.0] - 2025-11-08

### Added

* Initial release of Micro Journal AI
* Core journaling functionality with write, history, and insights views
* Automatic mood detection (positive, reflective, neutral)
* AI-powered insights using Claude Sonnet 4 API
* Persistent local storage for journal entries
* Beautiful turquoise/teal gradient design
* Responsive layout for mobile, tablet, and desktop
* Custom scrollbar styling
* Accessibility features (ARIA labels, keyboard navigation)
* Entry validation (minimum 10 characters)
* Character counter for entries
* Date formatting and display
* Environment variable configuration
* Backend proxy server template for production
* Comprehensive documentation

### Technical

* React 18.3 with Hooks
* Vite 5.4 build system
* TailwindCSS 3.4 for styling
* Lucide React for icons
* ESLint and Prettier for code quality
* PostCSS for CSS processing

---

## Version History

* **v1.0.2** - Merge conflict fix in README (Current)
* **v1.0.1** - Bug fixes and UX improvements
* **v1.0.0** - Initial release

---

## Upcoming

See [Roadmap](README.md#-roadmap--future-enhancements) in README for planned features.
