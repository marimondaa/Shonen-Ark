# 🏗️ Shonen Ark - File Organization Plan

## 📋 **New Structure Overview**

```
shonen-ark/
├── 📁 src/                          # Source code (follows Next.js 13+ conventions)
│   ├── 📁 components/               # React components
│   │   ├── 📁 layout/              # Layout-specific components
│   │   │   ├── Header.js           # Navigation header
│   │   │   ├── Footer.js           # Site footer
│   │   │   ├── Sidebar.js          # Side navigation
│   │   │   └── Layout.js           # Main layout wrapper
│   │   ├── 📁 ui/                  # Reusable UI components
│   │   │   ├── Button.js           # Button variants
│   │   │   ├── Card.js             # Card component
│   │   │   ├── Modal.js            # Modal dialogs
│   │   │   └── LoadingSpinner.js   # Loading states
│   │   └── 📁 features/            # Feature-specific components
│   │       ├── TheoryCard.js       # Theory display
│   │       ├── UploadComponent.js  # File upload
│   │       ├── ContactForm.js      # Contact form
│   │       └── AnimeSuggestionForm.js
│   └── 📁 lib/                     # Utilities and services
│       ├── 📁 services/            # External API services
│       │   ├── anilist.js          # AniList API
│       │   ├── cloudinary.js       # Image service
│       │   ├── auth.js             # Authentication
│       │   └── ai.js               # AI services
│       ├── 📁 utils/               # Utility functions
│       │   ├── mockData.js         # Mock data
│       │   ├── helpers.js          # General helpers
│       │   └── constants.js        # App constants
│       └── 📁 hooks/               # Custom React hooks
│           └── useAuth.js          # Authentication hook
├── 📁 pages/                       # Next.js pages (existing structure)
├── 📁 infrastructure/              # Infrastructure & deployment
│   ├── 📁 workflows/               # n8n workflows
│   │   ├── user-signup.json
│   │   ├── project-approval.json
│   │   └── anime-calendar.json
│   ├── 📁 scripts/                 # Deployment scripts
│   │   ├── deploy-n8n.js
│   │   └── deploy-n8n.ts
│   └── 📁 config/                  # Configuration files
│       ├── railway.toml
│       ├── Dockerfile.n8n
│       └── .env.example
├── 📁 docs/                        # Documentation
│   ├── DEPLOYMENT_GUIDE.md
│   ├── API_IMPLEMENTATION_COMPLETE.md
│   ├── INFRASTRUCTURE_STATUS.md
│   └── TECHNICAL_AUDIT_REPORT.md
├── 📁 public/                      # Static assets (existing)
└── 📁 styles/                      # CSS files (existing)
```

## 🚀 **Migration Strategy**

### Phase 1: Component Organization
- Move layout components to `src/components/layout/`
- Separate UI components to `src/components/ui/`
- Group feature components in `src/components/features/`

### Phase 2: Library Organization
- Reorganize services in `src/lib/services/`
- Move utilities to `src/lib/utils/`
- Create custom hooks in `src/lib/hooks/`

### Phase 3: Infrastructure Organization  
- Move workflows to `infrastructure/workflows/`
- Consolidate scripts in `infrastructure/scripts/`
- Group config files in `infrastructure/config/`

### Phase 4: Documentation Organization
- Move all docs to `docs/` directory
- Create proper README structure
- Add API documentation

## 🎯 **Benefits of New Structure**

### ✅ **Clear Separation of Concerns**
- Components organized by purpose (layout/ui/features)
- Services separated from utilities
- Infrastructure isolated from source code

### ✅ **Scalability**
- Easy to add new components in correct categories
- Clear patterns for new features
- Infrastructure changes don't affect source

### ✅ **Maintainability**
- Related files grouped together
- Easier to find and modify code
- Consistent naming conventions

### ✅ **Developer Experience**
- Intuitive file locations
- Faster development workflow
- Better code organization

## 🔧 **Implementation Steps**

1. **Create new directory structure** ✅
2. **Move components to appropriate folders**
3. **Update import paths throughout codebase**
4. **Move infrastructure files**
5. **Organize documentation**
6. **Update build configuration**
7. **Test all imports and builds**
8. **Update package.json scripts**

## 📝 **Files to Reorganize**

### Components to Move:
```
components/Layout.js → src/components/layout/Layout.js
components/TheoryCard.js → src/components/features/TheoryCard.js
components/UploadComponent.js → src/components/features/UploadComponent.js
components/ContactForm.js → src/components/features/ContactForm.js
components/ShrineHero.js → src/components/features/ShrineHero.js
components/ContentShowcase.js → src/components/features/ContentShowcase.js
components/AnimeCalendarCard.js → src/components/features/AnimeCalendarCard.js
components/AnimeSuggestionForm.js → src/components/features/AnimeSuggestionForm.js
components/ErrorBoundary.js → src/components/ui/ErrorBoundary.js
```

### Libraries to Move:
```
lib/ai.js → src/lib/services/ai.js
lib/anilist.js → src/lib/services/anilist.js
lib/auth.js → src/lib/services/auth.js
lib/cloudinary.js → src/lib/services/cloudinary.js
lib/cloudinary-server.js → src/lib/services/cloudinary-server.js
lib/upload.js → src/lib/services/upload.js
lib/mockData.js → src/lib/utils/mockData.js
lib/ai-tagging.js → src/lib/utils/ai-tagging.js
lib/auth-context.js → src/lib/hooks/useAuth.js
```

### Infrastructure to Move:
```
workflows/ → infrastructure/workflows/
scripts/ → infrastructure/scripts/
railway.toml → infrastructure/config/railway.toml
Dockerfile.n8n → infrastructure/config/Dockerfile.n8n
```

### Documentation to Move:
```
DEPLOYMENT_GUIDE.md → docs/DEPLOYMENT_GUIDE.md
API_IMPLEMENTATION_COMPLETE.md → docs/API_IMPLEMENTATION_COMPLETE.md
INFRASTRUCTURE_STATUS.md → docs/INFRASTRUCTURE_STATUS.md
TECHNICAL_AUDIT_REPORT.md → docs/TECHNICAL_AUDIT_REPORT.md
```

## ⚠️ **Important Notes**

1. **Import Path Updates**: All import statements need to be updated
2. **Next.js Config**: May need to update next.config.js for new paths
3. **Build Scripts**: Package.json scripts may need path updates
4. **Infrastructure**: Deployment scripts need path corrections

## 🧪 **Testing Checklist**

- [ ] All components import correctly
- [ ] Pages render without errors
- [ ] Build process works
- [ ] Development server starts
- [ ] Infrastructure scripts work
- [ ] All features function properly

---

*This reorganization will create a more maintainable, scalable, and developer-friendly codebase that follows modern Next.js conventions and best practices.*
