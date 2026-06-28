# 🎙️ BubbleWord - User Guide

## Getting Started

### Step 1: Start Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 2: Open the Application
Visit: **http://localhost:5173**

---

## 🏠 Home Page

### What You'll See:
1. **BubbleWord Logo** with animated microphone icon
2. **Tagline**: "Make reading fun with continuous speech recognition! 📚🎙️"
3. **Feature Cards**: 
   - 📚 Engaging Stories
   - 🎙️ Speech Recognition
   - 🏆 Instant Feedback
4. **Difficulty Selector**: Easy (🌱), Medium (🌿), Hard (🌳)
5. **Story Grid**: All available stories with difficulty badges

### Actions:
- ✅ Click difficulty button to filter stories
- ✅ Click "Show All Stories" to remove filter
- ✅ Click "Start Reading" on a story card to begin

---

## 📖 Reading Page

### Layout:
```
┌─────────────────────────────────────────┐
│ Header: Story Title                      │
├─────────────────────────────────────────┤
│ Stats Bar:                               │
│ ⏱️ Time: 0:35  ✓ Correct: 15  ✕ Wrong: 2 │
├─────────────────────────────────────────┤
│                                          │
│ The little rabbit jumped over the log.  │
│ It was a sunny day. The rabbit...       │
│                                          │
│ ✅ (Green underline) = Correct          │
│ ❌ (Red underline) = Incorrect          │
│ 🔵 (Blue outline) = Current word        │
│                                          │
├─────────────────────────────────────────┤
│ You said: "The little rabbit..."        │
├─────────────────────────────────────────┤
│ [🎤 Start Reading] [🔄 Reset]           │
└─────────────────────────────────────────┘
```

### Features:
1. **Story Text Display**
   - Large, easy-to-read font
   - Word-by-word highlighting
   - Current word highlighted with blue outline
   - Correct words: ✅ Green underline
   - Incorrect words: ❌ Red underline

2. **Real-time Stats**
   - Time elapsed
   - Correct words count
   - Incorrect words count
   - Progress (X of Y words)

3. **Transcript Display**
   - Shows what the microphone detected
   - Updates in real-time
   - Shows interim results while speaking

4. **Controls**
   - **Start Reading**: Begin speech recognition
   - **Stop Reading**: Pause recognition
   - **Reset**: Restart the reading (clears progress)
   - **View Report**: Shows once all words are complete

### How It Works:
1. Click **"Start Reading"** button
2. Browser requests microphone permission (allow it!)
3. Start reading the story clearly and naturally
4. Watch the underlines appear under each word:
   - ✅ Green = You said it correctly!
   - ❌ Red = Needs practice
5. Continue until all words have been read
6. Click **"View Report"** to see your results

---

## 📊 Report Page

### Results Display:

```
┌──────────────────────────────────────┐
│ 👏 Great Reader! 🎉                  │
├──────────────────────────────────────┤
│ Story: "The Little Rabbit"           │
├──────────────────────────────────────┤
│ ┌─────────────┬──────────────────┐  │
│ │ Accuracy    │ Reading Speed    │  │
│ │ 92.5%       │ 95 WPM          │  │
│ ├─────────────┼──────────────────┤  │
│ │ Correct     │ Total Words      │  │
│ │ 92          │ 100              │  │
│ └─────────────┴──────────────────┘  │
├──────────────────────────────────────┤
│ Words to Practice:                   │
│ [difficult] [word] [pronunciation]   │
├──────────────────────────────────────┤
│ 👏 Great Job! Keep practicing.       │
├──────────────────────────────────────┤
│ [← Back to Home] [📤 Share Results] │
└──────────────────────────────────────┘
```

### Metrics Explained:

**Accuracy**: Percentage of words correctly spoken
- 95-100% = 🌟 Excellent
- 85-94% = 👏 Great Job
- 70-84% = 🙂 Nice Work
- Below 70% = 💪 Keep Practicing

**Reading Speed (WPM)**: Words per minute
- Calculated as: (Correct Words) / (Time in Minutes)
- Average for kids: 80-120 WPM

**Total Words**: Number of words in the story

**Correct Words**: Number of words you spoke correctly

**Practice Words**: Words that need more practice
- Click them for pronunciation tips (in production)

### Appreciation Messages:
- 🌟 "Excellent! You read almost perfectly!"
- 👏 "Great Job! Keep practicing."
- 🙂 "Nice Work! Practice the highlighted words."
- 💪 "Don't give up! Practice every day."

---

## 🎮 Interactive Features

### Visual Feedback:
- **Green Underline** = ✅ Correct pronunciation
- **Red Underline** = ❌ Needs practice
- **Blue Outline** = 🔵 Current word you should be reading
- **Animated Transitions** = Smooth word highlighting

### Real-time Transcript:
- Shows interim results while speaking
- Updates as you speak
- Final transcript when you finish speaking

### Progress Indicators:
- Word count (e.g., "45/100")
- Time elapsed (e.g., "2:35")
- Completion bar (implicit in progress)

### Error Handling:
- "No speech detected. Please try again."
- "No microphone found. Ensure it is working."
- "Network error. Please check your connection."
- "Microphone permission denied."

---

## 💡 Tips for Best Results

### For Children:
1. **Read slowly and clearly** - The app is more accurate
2. **Use natural intonation** - Read like you're telling a story
3. **Practice daily** - Build reading skills progressively
4. **Start with Easy** - Build confidence first
5. **Retake stories** - Improve your score over time

### For Parents:
1. **Encourage them** - Positive feedback helps!
2. **Use as practice tool** - Before bed or daily routine
3. **Track progress** - Note scores over time
4. **Mix with other reading** - Combine with books
5. **Make it fun** - It should feel like play, not work

### Technical Tips:
1. Use a **quiet environment** for better recognition
2. Ensure **microphone is clean** and working
3. Speak into the **microphone at an angle**
4. Use **modern browser** (Chrome, Firefox, Safari, Edge)
5. Have **good internet connection** for API calls

---

## 🎨 Story Difficulty Levels

### 🌱 Easy Stories
- **Word Count**: 20-25 words
- **Time**: ~1 minute
- **For**: Age 5-7
- **Features**: Simple sentences, common words
- **Examples**: "The Little Rabbit", "Red Balloon"

### 🌿 Medium Stories
- **Word Count**: 70-75 words
- **Time**: ~2 minutes
- **For**: Age 8-10
- **Features**: Complex sentences, interesting plots
- **Examples**: "The Friendly Caterpillar", "The Lost Kitten"

### 🌳 Hard Stories
- **Word Count**: 100-115 words
- **Time**: ~3 minutes
- **For**: Age 11+
- **Features**: Sophisticated vocabulary, longer narratives
- **Examples**: "The Mysterious Library", "The Explorer's Challenge"

---

## 📱 Multi-Device Support

### Desktop ✅
- Chrome: Full support
- Firefox: Full support
- Safari: Full support
- Edge: Full support

### Tablet ✅
- iPad: Full support
- Android tablets: Full support

### Mobile ⚠️
- Android phones: Good support
- iPhones: Limited (requires user gesture)

---

## ⌨️ Keyboard Shortcuts (Future)

Currently only mouse/touch controls. Planned shortcuts:
- `Space` = Start/Stop Reading
- `R` = Reset
- `H` = Home Page
- `Esc` = Back

---

## 🔧 Troubleshooting

### Microphone Not Working?
1. Check browser permissions
2. Refresh page
3. Try a different browser
4. Restart computer
5. Check microphone works in other apps

### Stories Not Loading?
1. Check backend server is running
2. Open http://localhost:8000/api/stories/
3. Should show JSON list of stories
4. Refresh browser

### Words Not Matching?
1. Speak more clearly
2. Slow down speech
3. Try easier story first
4. Check microphone volume

### Can't Grant Permission?
1. Check browser isn't blocking microphone
2. Click allow in browser dialog
3. Try incognito/private window
4. Check OS-level microphone settings

---

## 🌍 Browser Compatibility

| Browser | Version | Support | Notes |
|---------|---------|---------|-------|
| Chrome | 90+ | ✅ Full | Best support |
| Firefox | 88+ | ✅ Full | Excellent |
| Safari | 14+ | ✅ Full | Desktop & iPad |
| Edge | 90+ | ✅ Full | Chromium-based |
| iPhone Safari | 14+ | ⚠️ Limited | Requires gesture |
| Samsung Internet | 10+ | ✅ Full | Android native |

---

## 📊 Sample Scores

### Example Session:

**Story**: "The Little Rabbit" (Easy)
**Time**: 1 minute 23 seconds
**Total Words**: 23

**Results**:
- Correct Words: 21
- Accuracy: 91.3%
- WPM: 15.2
- Words to Practice: ["log", "sunny"]
- Message: "👏 Great Job! Keep practicing."

---

## 🚀 Advanced Features (Roadmap)

Future enhancements being considered:
- 🎵 Audio pronunciation samples
- 📝 Word definitions
- 🏆 Leaderboard and achievements
- 📈 Progress tracking over time
- 🎯 Personalized practice plans
- 🌍 Multiple language support
- 🎨 More story themes
- 👥 Parent/teacher dashboard

---

## 📞 Support

### Getting Help:
1. Check **QUICKSTART.md** for common issues
2. Review **README.md** for documentation
3. Check browser console (F12) for error messages
4. Try different browser if issues persist

### Reporting Issues:
- Note exact error message
- Take screenshot
- Note browser and device
- Describe what you were trying to do

---

## 🎓 Educational Value

BubbleWord helps develop:
- ✅ Reading fluency
- ✅ Pronunciation accuracy
- ✅ Speaking confidence
- ✅ Listening skills
- ✅ Self-correction ability
- ✅ Vocabulary expansion
- ✅ Reading comprehension

---

**Happy Reading! 📚🎙️✨**
