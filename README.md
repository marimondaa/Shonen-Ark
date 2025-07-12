# 🌟 Shonen Ark

**The Ultimate Fan Theory & Media Hub for Anime Enthusiasts**

MVP codebase for Shonen Ark – a comprehensive fan platform inspired by Viz.com, built with Next.js + Tailwind CSS. Connect, create, and discover amazing anime and manga content with a passionate community.

![Next.js](https://img.shields.io/badge/Next.js-13.4+-black?logo=next.js)
![React](https://img.shields.io/badge/React-18+-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3+-06B6D4?logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-MVP-green)

## 🚀 Features

### ✅ Implemented Pages

#### 🏠 **Homepage**
- **Hero Section** with interactive bonsai component placeholder
- **Featured Arcs** - Showcase popular anime/manga story arcs
- **Fan Content Spotlight** - Highlight community creations
- **Community Highlights** - Celebrate active members and trending discussions
- Responsive design with hover animations and modern UI

#### 🧠 **Theories Section**
- **Theory Feed** (`/theories`) - Browse and search fan theories
- **Individual Theory Posts** (`/theories/[slug]`) - Detailed theory pages with comments
- Advanced filtering by anime series, popularity, and recency
- Spoiler warning system and content categorization
- Rich text formatting and related theory suggestions

#### 🎬 **Fan Animations**
- **Multi-Category System** - Fan Fights, Audio FX, Character Designs
- **Interactive Filters** - Search by tags, series, and content type
- **Engagement Metrics** - Views, likes, downloads, and saves tracking
- Preview cards with duration display and creator attribution

#### 📅 **Release Calendar**
- **Dual Tabs** - Anime Episodes & Manga/Manhwa Chapters
- **Release Tracking** - Countdown timers and schedule information
- **Series Information** - Studio details, magazine info, and status badges
- Sample data for popular series with notification system

#### 🔐 **Authentication System**
- **Enhanced Login** (`/login`) - Social auth ready (Discord, Google)
- **Registration** (`/register`) - Fan vs Creator account types
- **NextAuth Integration** - API routes prepared for OAuth
- Form validation and loading states

#### 👤 **Account Dashboard**
- **Fan Dashboard** - Followed creators feed and activity timeline
- **Creator Dashboard** - Revenue tracking and content management (preview)
- **Upgrade System** - Creator Pro subscription with Stripe integration prep
- User stats and engagement metrics

#### 📞 **Static Pages**
- **About Us** (`/about`) - Mission statement, team bios, company story
- **Contact** (`/contact`) - Multiple contact methods, FAQ, anime suggestions
- Professional layouts with social links and clear CTAs

#### 🔮 **Future Sections (Scaffolded)**
- **Creator Gigs** (`/gigs`) - Freelance marketplace preview
- **Merch Store** (`/merch`) - Official merchandise with pre-order system
- **Discord Integration** - Live community widget component

### 🛠 **Technical Features**
- **Next.js 13+** with modern React patterns
- **Tailwind CSS** for responsive, utility-first styling
- **Component Architecture** - Reusable UI components
- **State Management** - React hooks for local state
- **SEO Optimized** - Proper meta tags and head management
- **Accessibility** - Semantic HTML and keyboard navigation

## 🏗 **Project Structure**

```
shonen-ark/
├── components/
│   ├── Navbar.js              # Main navigation component
│   └── DiscordEmbed.js         # Discord widget integration
├── pages/
│   ├── index.js               # Enhanced homepage
│   ├── theories/
│   │   ├── index.js           # Theory feed with filters
│   │   └── [slug].js          # Individual theory posts
│   ├── animations/
│   │   └── index.js           # Fan content categories
│   ├── calendar.js            # Release schedule tracker
│   ├── login.js               # Authentication
│   ├── register.js            # User registration
│   ├── account.js             # User dashboard
│   ├── about.js               # Company information
│   ├── contact.js             # Contact forms and support
│   ├── gigs.js                # Creator marketplace (preview)
│   ├── merch.js               # Merchandise store (preview)
│   └── api/
│       └── auth/
│           └── [...nextauth].js # NextAuth configuration
├── styles/
│   └── globals.css            # Global styles and Tailwind
├── .github/
│   └── copilot-instructions.md # AI coding guidelines
└── .vscode/
    └── tasks.json             # Development tasks
```

## 🚦 **Getting Started**

### Prerequisites
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/marimondaa/Shonen-Ark.git
   cd Shonen-Ark
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install additional packages** (recommended)
   ```bash
   # For animations and enhanced UX
   npm install framer-motion
   
   # For authentication (when ready)
   npm install next-auth
   
   # For form handling
   npm install react-hook-form
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### 🔧 **Development Commands**

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Type checking (if using TypeScript)
npm run type-check
```

## 🎨 **Design System**

### Color Palette
- **Primary**: Red/Pink gradients (`from-red-600 to-pink-600`)
- **Secondary**: Purple/Blue gradients (`from-purple-900 to-indigo-900`)
- **Background**: Dark grays (`bg-gray-950`, `bg-gray-900`)
- **Text**: White primary, gray-400 secondary
- **Accents**: Blue-400 for links, green-400 for success

### Typography
- **Headings**: Bold, large sizes (text-4xl, text-5xl)
- **Body**: Regular weight, good contrast
- **UI Elements**: Semibold for buttons and labels

### Components
- **Cards**: Rounded corners (rounded-xl, rounded-2xl)
- **Buttons**: Gradient backgrounds with hover states
- **Forms**: Dark inputs with blue focus rings
- **Navigation**: Sticky header with smooth transitions

## 🔮 **Future Enhancements**

### Phase 1 - Core Features
- [ ] Complete NextAuth integration with Discord/Google
- [ ] Database setup (Supabase/PostgreSQL)
- [ ] Real-time commenting system
- [ ] Image upload and processing
- [ ] Email notifications

### Phase 2 - Advanced Features
- [ ] Payment integration (Stripe)
- [ ] Creator monetization tools
- [ ] Advanced search with filters
- [ ] Mobile app (React Native)
- [ ] AI-powered content recommendations

### Phase 3 - Community Features
- [ ] Live streaming integration
- [ ] Community events and contests
- [ ] Gamification system
- [ ] Multi-language support
- [ ] Advanced moderation tools

## 📱 **API Integration Ready**

The codebase is prepared for these integrations:

### Authentication
```javascript
// NextAuth providers ready
- Discord OAuth
- Google OAuth  
- Email/Password
```

### Database Schema (Planned)
```sql
- Users (fans, creators)
- Theories (with tags, votes)
- Comments and likes
- Release schedules
- Creator earnings
```

### External APIs
```javascript
- Discord Widget API
- Stripe Payments API
- Image storage (Cloudinary)
- Email service (SendGrid)
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and patterns
- Add proper TypeScript types where applicable
- Include responsive design for all new components
- Write meaningful commit messages
- Test on multiple screen sizes

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 **Acknowledgments**

- **Inspired by** - Viz.com's community features
- **Design influenced by** - Modern anime streaming platforms
- **Community first** - Built for anime and manga fans
- **Open source** - Contributions welcome from the community

## 📞 **Contact & Support**

- **Discord**: Coming soon
- **Email**: support@shonenark.com
- **Twitter**: @ShonenArk
- **GitHub Issues**: For bug reports and feature requests

---

**Built with ❤️ for the anime community by passionate fans**

*Shonen Ark - Where theories become reality* ✨
