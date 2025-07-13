# PowerShell script to push Shonen Ark changes to GitHub
Write-Host "🔍 Checking Git Status..." -ForegroundColor Cyan
try {
    git status
    Write-Host "`n📦 Adding all changes..." -ForegroundColor Yellow
    git add .
    
    Write-Host "`n📝 Committing changes..." -ForegroundColor Green
    git commit -m "✨ Mystical animated homepage with Bokoko33-inspired design

- 🏯 Shrine illustration background with atmospheric effects  
- 🎭 Animated vertical navigation with Framer Motion
- 🎨 Bokoko33 color palette (pink/beige accents on dark base)
- ✨ Generous spacing philosophy and smooth hover interactions
- 🌸 Enhanced particle system with color-coded ambient effects
- 📱 Responsive design with mystical typography (Cinzel/Crimson Text)
- 🔮 Placeholder areas for future bonsai, incense, monk elements
- 💫 CSS variables and Tailwind config for consistent theming"

    Write-Host "`n🚀 Pushing to GitHub..." -ForegroundColor Magenta
    git push origin main
    
    Write-Host "`n✅ SUCCESS! Git operations completed!" -ForegroundColor Green
    Write-Host "📋 Check your repository at: https://github.com/marimondaa/Shonen-Ark" -ForegroundColor Blue
    
} catch {
    Write-Host "`n❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Try running commands manually or check git configuration" -ForegroundColor Yellow
}

Write-Host "`nPress any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
