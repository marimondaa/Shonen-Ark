
Shonen Ark: Master Website Blueprint
Overview: Shonen Ark is a fan-powered anime platform focused on shounen manga and anime. It blends AI-assisted content generation, user-submitted fan creations, community features, and dynamic UI/UX animations to create a centralized hub for anime theories, animations, sound design, calendars, and more.
Core Goals:
•	Showcase high-quality personal  theories made with ai, animations made by fans, and soundscapes made by fans as well
•	Allow creators to share work, gain followers and grow their media
•	Foster an authentic, anime-loving community
•	Keep fans updated with anime/manga release calendars
•	Build a scalable, AI-assisted platform with monetization for me. Meaning creators will pay 
________________________________________
Core Pages:
1.	Homepage
o	Central title ("Shonen Ark ") I want to remplace it with a brand png image I have created 
o	Scroll-to-reveal sections: at the bottom   
o	Join or log in butons will be in thee menu not in the gome page to make more aesthetic 
2.	Theories Feed
o	List of short fan-written or mine  theories across anime
o	Filter by anime/manga, popularity, or newest
o	Each post: Title, cover image, tags, short blurb, spoiler toggle
3.	Discovery feed 
o	Categories inside the categorie (meaning a second personalised screen from within ):
	Fan Fights (video upload)
	Audio FX (upload MP3 or MP4)
	Character Designs (image upload)
o	Preview thumbnails, tags, likes, and comments
4.	Calendar Page
o	Split views:
	Anime Episodes
	Manga/Manhwa Chapters
o	For each title:
	Cover image, description, release schedule, episode/chapter count
	Real-time updates via AniList or similar API
5.	Account Pages :
Each one will have different benefits :
o	Fan Account:
	Follow creators, view feed, comment, bookmark posts
o	Creator Account:
	Post animations, audio, designs, blog theories
	Creator dashboard: stats, subscribers, upload tools
	$4/month subscription required
o	Upgrade to Creator Flow (paywall logic via Stripe or crypto in a future )
6.	About Us / Contact
o	Team bios (Founder: You)
o	Mission statement
o	Contact form & social links
o	Anime submission form (fans suggest anime to cover)



Future menu categories to be developed : 
7.	Gigs  / job offers / comunity work  (for the love of the anime  and reconnaissance )(future)
o	Small contract postings (voice actors, animators, etc.)
o	Pay-to-post (10$ job posting)
8.	Merch Page or collectibles merch 
o	Physical products when ready
o	Early signup interest form
9.	Community / Chat (mist likely a link via discord )
o	Discord embed or forum
o	Meme sharing, AMA announcements
________________________________________
Design Principles:
•	Cold color palette: black, deep purple, slate gray
•	Minimal but dynamic
•	TailwindCSS & Framer Motion animations
•	Mobile-first responsive
________________________________________
AI Use Cases for the fonctionality of the website :
•	AI-generated sample content for theories, blog, metadata
•	Automated calendar updates via API
•	Prompt-based image generation for character concepts
•	GPT-assistants for moderation, content quality control
•	Admin tools powered by AI (auto tag, review flagging, analytics)
________________________________________
Security & Hosting:
•	Next.js hosted on Vercel
•	Auth via NextAuth (OAuth + email/pass)
•	Payments via Stripe
•	Uploads via Cloudinary or S3
•	Database: Supabase or Firestore
•	Content moderation flags (auto + manual)
--------------------------------------------------------------------------------
### ✅ **SETUP TASKS**

1. **Initialize Project**

   * Create a new Next.js app with TypeScript.
   * Install TailwindCSS, Framer Motion, NextAuth, Stripe, Supabase client, Cloudinary SDK.

2. **Configure Project Structure**

   * Create folders: `pages/`, `components/`, `lib/`, `styles/`, `utils/`.

3. **Set up Tailwind with custom color palette**

   * Cold theme: black, deep purple, slate gray.

---

### 🏠 **HOMEPAGE**

4. **Replace text logo with PNG logo**

   * Load image `/public/brand-logo.png` in the header.

5. **Implement scroll-to-reveal sections using Framer Motion**

6. **Move Join/Login buttons to the navbar only**

---

### 🧠 **THEORIES FEED**

7. **Create `/pages/theories.tsx`**

   * Display list of theory posts with filter by anime, sort by newest/popularity.

8. **Build `TheoryCard` component**

   * Props: `title`, `image`, `tags`, `blurb`, `spoiler`.

9. **Fetch theories from Supabase (or placeholder static data)**

---

### 🔍 **DISCOVERY FEED**

10. **Create `/pages/discovery.tsx`**

    * Show category tiles: Fan Fights, Audio FX, Character Designs.

11. **Route to subpages per category: `/pages/discovery/[category].tsx`**

    * Display uploaded media items with likes/comments.

12. **Build upload component**

    * File input → upload to Cloudinary → preview thumbnail.

---

### 📅 **CALENDAR PAGE**

13. **Create `/pages/calendar.tsx`**

    * Tabs for Anime vs Manga view.

14. **Fetch release data via AniList API**

15. **Display entries with cover, description, date, count**

---

### 👤 **ACCOUNT PAGES**

16. **Create `/pages/account/fan.tsx`**

    * Feed of followed creators, bookmarks, comments.

17. **Create `/pages/account/creator.tsx`**

    * Upload dashboard for theories, audio, animations.
    * Show stats from Supabase.

18. **Add subscription guard middleware**

    * Allow only paid users to access creator tools.

19. **Stripe checkout integration**

    * Creator plan: \$4/month.
    * Use `/pages/account/onboarding.tsx` for upgrade flow.

---

### 📨 **ABOUT / CONTACT**

20. **Create `/pages/about.tsx`**

    * Team bios, mission, social links.

21. **Add `ContactForm` and `AnimeSuggestionForm`**

---

### 🤖 **AI UTILITIES**

22. **In `lib/ai.ts`:**

    * `autoTagContent(text)` → OpenAI tagging
    * `flagContent(text)` → moderation check

---

### 🔐 **AUTH + UPLOAD**

23. **Set up NextAuth (OAuth + email/pass)**

24. **Set up Cloudinary file upload util with signed URLs**

---

### 📦 **DEPLOY + GIT PUSH**

25. **Final Task: Commit & Push All Changes**

```bash
git add .
git commit -m "Implement Shonen Ark MVP structure"
git push origin main
```
