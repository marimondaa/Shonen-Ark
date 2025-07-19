# 🔄 Repository Reorganization Plan 2025

## 🎯 Objectives
- Remove duplicate files and redundant documentation
- Consolidate scattered components and utilities
- Standardize directory structure following Next.js 13+ best practices
- Preserve all functional code and configurations
- Improve developer experience and maintainability

## 📁 New Directory Structure

```
shonen-ark/
├── 📁 .github/              # GitHub workflows and templates
├── 📁 .vscode/              # VS Code settings
├── 📁 docs/                 # Consolidated documentation
│   ├── deployment/          # Deployment guides
│   ├── development/         # Development setup
│   └── api/                 # API documentation
├── 📁 src/                  # Main source code
│   ├── components/          # React components
│   ├── lib/                 # Utilities and helpers
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript definitions
│   └── constants/           # App constants
├── 📁 pages/                # Next.js pages (preserved as-is)
├── 📁 public/               # Static assets
├── 📁 styles/               # Global styles
├── 📁 tests/                # All test files
│   ├── unit/                # Unit tests
│   ├── integration/         # Integration tests
│   └── e2e/                 # End-to-end tests
├── 📁 infrastructure/       # Deployment & DevOps
│   ├── docker/              # Docker configurations
│   ├── railway/             # Railway-specific configs
│   ├── workflows/           # n8n workflows
│   └── scripts/             # Deployment scripts
├── 📁 config/               # Configuration files
└── Root configuration files

```

## 🗑️ Files to Remove (Duplicates/Outdated)
- README.md.backup
- README_NEW.md
- README_STAGING.md
- REORGANIZATION_PLAN.md
- REORGANIZATION_SUCCESS.md
- BACKEND_COMPLETION_REPORT.md
- middleware.js (duplicate)
- Duplicate workflow files

## ↗️ Files to Move
- src/components/* → src/components/
- src/lib/* → src/lib/
- lib/* → src/lib/
- components/* → src/components/
- workflows/* → infrastructure/workflows/
- scripts/* → infrastructure/scripts/
- tests/* + __tests__/* → tests/
- types/* → src/types/

## 🔧 Configuration Updates
- Update import paths in all files
- Update test configurations
- Update build scripts
- Preserve all environment configurations
