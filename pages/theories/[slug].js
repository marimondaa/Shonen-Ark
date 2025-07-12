import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'

export default function TheoryPost() {
  const router = useRouter()
  const { slug } = router.query

  // Sample theory data - in a real app, this would be fetched based on the slug
  const theory = {
    id: 1,
    slug: 'gojo-return-theory',
    title: 'How Gojo Will Return: The Six Eyes Resurrection Theory',
    author: 'TheoryMaster99',
    authorAvatar: '/placeholder-avatar.jpg',
    createdAt: '2025-07-10',
    updatedAt: '2025-07-11',
    likes: 234,
    comments: 45,
    tags: ['Jujutsu Kaisen', 'Gojo', 'Theory', 'Spoilers'],
    hasSpoilers: true,
    content: `
# The Six Eyes Resurrection Theory

After analyzing the latest chapters of Jujutsu Kaisen, I believe Gojo's return is not only possible but inevitable. Here's my comprehensive theory on how it will happen.

## The Power of the Six Eyes

The Six Eyes have always been portrayed as more than just enhanced vision. They represent a fundamental connection to the flow of cursed energy itself. When Gojo was sealed, his Six Eyes weren't just disabled - they were potentially transferred to a different state of existence.

### Evidence from Chapter 236

In the recent chapter where Gojo appears to die, there are several visual cues that suggest this isn't the end:

1. **The lotus imagery** - Buddhist symbolism often represents rebirth and enlightenment
2. **Gojo's peaceful expression** - Suggests transcendence rather than death
3. **The separation technique** - May have affected his soul differently than his body

## The Sukuna Connection

Interestingly, Sukuna's reaction to defeating Gojo seemed almost... disappointed? This could suggest that Sukuna knows something about the nature of the Six Eyes that we don't.

### The King of Curses' Knowledge

Sukuna has lived for over 1000 years and has encountered the Six Eyes before. His understanding of jujutsu far exceeds anyone else's. If anyone would know about the true nature of the Six Eyes and potential resurrection methods, it would be him.

## Historical Precedent

Looking back at the history of the Six Eyes users:

- Every Six Eyes user has been "unique" in their generation
- The power seems to choose its wielder rather than being inherited normally
- There have been gaps in Six Eyes users throughout history

This suggests that the Six Eyes might exist as a separate entity that can manifest through different individuals.

## The Geto Factor

Kenjaku's possession of Geto's body proves that consciousness and physical form can be separated in the JJK universe. If Kenjaku can inhabit Geto's body, could Gojo's consciousness exist in a similar state?

### Prison Realm's True Purpose

The Prison Realm doesn't just seal - it preserves. What if Gojo's time in the Prison Realm wasn't imprisonment but preparation? A chrysalis stage for something greater?

## Prediction: The Return

I predict that Gojo will return in one of these ways:

1. **Spiritual Manifestation** - As a cursed spirit embodying the concept of "limitless"
2. **Six Eyes Transfer** - The power manifesting in a new host while retaining Gojo's memories
3. **Domain Expansion Resurrection** - Using Unlimited Void as a bridge between life and death

## Conclusion

Gojo's "death" feels too convenient, too clean for a character of his importance. The themes of JJK revolve around breaking cycles and transcending limitations. Gojo's return would perfectly embody these themes.

What do you think? Have I missed any crucial evidence? Let me know in the comments below!

---

*This theory contains spoilers for Jujutsu Kaisen manga chapters up to 236. Please read at your own discretion.*
    `
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Head>
        <title>{theory.title} - Shonen Ark</title>
        <meta name="description" content={`Fan theory: ${theory.title} by ${theory.author}`} />
      </Head>

      <Navbar />

      {/* Breadcrumb */}
      <section className="bg-gray-900 py-4 px-6 border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-gray-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">→</span>
            <Link href="/theories" className="hover:text-white">Theories</Link>
            <span className="mx-2">→</span>
            <span className="text-white">{theory.title}</span>
          </nav>
        </div>
      </section>

      {/* Theory Header */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Spoiler Warning */}
          {theory.hasSpoilers && (
            <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-8">
              <div className="flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                <div>
                  <h3 className="font-bold">Spoiler Warning</h3>
                  <p className="text-sm text-red-200">This theory contains spoilers. Proceed with caution.</p>
                </div>
              </div>
            </div>
          )}

          {/* Title and Meta */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{theory.title}</h1>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {theory.tags.map((tag, idx) => (
                <span key={idx} className="text-sm bg-blue-600 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Author and Meta Info */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <p className="font-semibold">{theory.author}</p>
                  <p className="text-sm text-gray-400">
                    Published {theory.createdAt} • Updated {theory.updatedAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors">
                  ❤️ {theory.likes}
                </button>
                <span className="flex items-center gap-2 text-gray-400">
                  💬 {theory.comments} comments
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Theory Content */}
      <main className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-invert prose-lg max-w-none">
            <div className="bg-gray-900 rounded-2xl p-8">
              <div className="whitespace-pre-line leading-relaxed">
                {theory.content.split('\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('# ')) {
                    return <h2 key={idx} className="text-3xl font-bold mt-8 mb-4">{paragraph.substring(2)}</h2>
                  }
                  if (paragraph.startsWith('## ')) {
                    return <h3 key={idx} className="text-2xl font-bold mt-6 mb-3">{paragraph.substring(3)}</h3>
                  }
                  if (paragraph.startsWith('### ')) {
                    return <h4 key={idx} className="text-xl font-bold mt-4 mb-2">{paragraph.substring(4)}</h4>
                  }
                  if (paragraph.trim() === '') {
                    return <br key={idx} />
                  }
                  return <p key={idx} className="mb-4">{paragraph}</p>
                })}
              </div>
            </div>
          </article>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition-colors">
              ❤️ Like This Theory
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition-colors">
              💬 Join Discussion
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors">
              📤 Share
            </button>
          </div>

          {/* Related Theories */}
          <section className="mt-16">
            <h3 className="text-2xl font-bold mb-8">Related Theories</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Sukuna\'s True Plan Revealed', author: 'CurseAnalyst', likes: 156 },
                { title: 'The Origin of Domain Expansions', author: 'JujutsuExpert', likes: 203 }
              ].map((related, idx) => (
                <div key={idx} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
                  <h4 className="font-bold mb-2">{related.title}</h4>
                  <p className="text-sm text-gray-400 mb-3">by {related.author}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">❤️ {related.likes}</span>
                    <Link href="#" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                      Read Theory →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
