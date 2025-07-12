import { useState } from 'react'

export default function DiscordEmbed({ 
  serverId = "your-server-id", 
  channelId = "your-channel-id",
  theme = "dark",
  width = "350", 
  height = "500" 
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Discord widget URL - replace with actual server ID when available
  const discordWidgetUrl = `https://discord.com/widget?id=${serverId}&theme=${theme}`

  return (
    <div className="discord-embed">
      {/* Header */}
      <div className="bg-gray-800 rounded-t-lg p-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">🔵</span>
        </div>
        <div>
          <h3 className="font-bold text-white">Shonen Ark Discord</h3>
          <p className="text-gray-400 text-sm">Join our community!</p>
        </div>
      </div>

      {/* Discord Widget Iframe */}
      <div 
        className="relative bg-gray-900 rounded-b-lg overflow-hidden"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading Discord...</p>
            </div>
          </div>
        )}
        
        {/* 
          Uncomment when you have a real Discord server:
          <iframe
            src={discordWidgetUrl}
            width={width}
            height={height}
            allowtransparency="true"
            frameBorder="0"
            onLoad={() => setIsLoaded(true)}
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></iframe>
        */}

        {/* Placeholder for now */}
        <div className="p-6 h-full flex flex-col justify-center text-center">
          <span className="text-6xl mb-4">🔵</span>
          <h4 className="text-xl font-bold text-white mb-2">Discord Integration</h4>
          <p className="text-gray-400 text-sm mb-6">
            Live Discord widget will be available once the server is set up.
          </p>
          
          {/* Placeholder Members List */}
          <div className="space-y-3 mb-6">
            <h5 className="text-sm font-semibold text-gray-300 text-left">Online Members (247)</h5>
            <div className="space-y-2">
              {[
                { name: 'TheoryMaster99', status: 'online', activity: 'Discussing JJK theories' },
                { name: 'AnimeFanatic', status: 'online', activity: 'Sharing fan art' },
                { name: 'SoundNinja', status: 'away', activity: 'Creating audio edits' },
                { name: 'MangaReader', status: 'online', activity: 'Reading One Piece' }
              ].map((member, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full ${
                    member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <span className="text-gray-300">{member.name}</span>
                </div>
              ))}
              <div className="text-xs text-gray-500">+ 243 more online</div>
            </div>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
            Join Discord Server
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-b-lg p-3 flex gap-2 text-xs">
        <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 rounded font-semibold transition-colors">
          💬 General Chat
        </button>
        <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 rounded font-semibold transition-colors">
          🧠 Theories
        </button>
        <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 rounded font-semibold transition-colors">
          🎨 Fan Art
        </button>
      </div>
    </div>
  )
}

/*
Props explanation:
- serverId: Your Discord server ID (get from Discord Developer Portal)
- channelId: Specific channel ID to display (optional)
- theme: "dark" or "light" 
- width: Widget width in pixels
- height: Widget height in pixels

Usage example:
<DiscordEmbed 
  serverId="123456789012345678"
  theme="dark"
  width="350"
  height="500"
/>

To set up the Discord widget:
1. Go to your Discord server settings
2. Navigate to Widget settings
3. Enable the widget and copy the server ID
4. Replace the placeholder serverId prop with your actual server ID
5. Uncomment the iframe code above and remove the placeholder div
*/
