# BubbleWord - Interactive Reading Platform

A full-stack application that makes reading fun for children using continuous speech recognition. Read stories aloud, get instant feedback, and track your progress!

## 🎯 Features

- ✨ **Interactive Stories** - Easy, Medium, and Hard difficulty levels with engaging narratives
- 🎙️ **Continuous Speech Recognition** - Real-time voice input using Web Speech API
- 📊 **Instant Feedback** - Visual indicators for correct/incorrect words (green/red underlines)
- 📈 **Detailed Reports** - Accuracy, WPM, practice words, and personalized appreciation messages
- 🎨 **Child-Friendly UI** - Colorful, responsive design with smooth animations
- 🚀 **Fast & Performant** - Built with React, Vite, FastAPI, and TailwindCSS

## 🏗️ Architecture

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: TailwindCSS 3 for rapid UI development
- **State Management**: React Context API + useReducer
- **Routing**: React Router v7
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Icons**: React Icons

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Text Matching**: RapidFuzz for similarity scoring
- **Validation**: Pydantic models
- **Server**: Uvicorn
- **Storage**: JSON files (no database)
- **No**: Authentication, Database, Docker, Redis, WebSockets

## 📁 Project Structure

```
BubbleWord/
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI application setup
│   │   ├── api/
│   │   │   ├── router.py          # API routing
│   │   │   └── routes/
│   │   │       ├── stories.py     # Story endpoints
│   │   │       └── report.py      # Report generation
│   │   ├── models/
│   │   │   ├── story.py           # Story data model
│   │   │   └── report.py          # Report data model
│   │   ├── services/
│   │   │   ├── story_service.py   # Story loading & management
│   │   │   ├── matcher_service.py # Word matching logic
│   │   │   └── report_service.py  # Report generation
│   │   ├── utils/
│   │   │   └── text_utils.py      # Text processing utilities
│   │   └── stories/
│   │       ├── easy.json          # Easy stories
│   │       ├── medium.json        # Medium stories
│   │       └── hard.json          # Hard stories
│   └── requirements.txt           # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Story selection page
│   │   │   ├── Reading.jsx        # Reading page with speech recognition
│   │   │   ├── Report.jsx         # Results & report page
│   │   │   └── NotFound.jsx       # 404 page
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   └── AlertBox.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── index.jsx
│   │   │   ├── story/
│   │   │   │   ├── StoryCard.jsx
│   │   │   │   └── StorySelector.jsx
│   │   │   ├── reading/
│   │   │   │   └── ReadingDisplay.jsx
│   │   │   └── report/
│   │   │       └── ReportDisplay.jsx
│   │   ├── hooks/
│   │   │   ├── useSpeechRecognition.js
│   │   │   ├── useStories.js
│   │   │   └── useReading.js
│   │   ├── context/
│   │   │   └── ReadingContext.jsx
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── textUtils.js
│   │   │   ├── helpers.js
│   │   ├── router/
│   │   │   └── index.jsx
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── .env
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (Frontend)
- Python 3.11+ (Backend)
- Modern browser with Web Speech API support (Chrome, Firefox, Safari, Edge)

### Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Start the server (runs on http://localhost:8000)
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 How to Use

1. **Open the App**: Visit `http://localhost:5173`
2. **Choose a Story**: Select Easy, Medium, or Hard and pick a story
3. **Start Reading**: Click "Start Reading" and grant microphone permission
4. **Read Aloud**: Read the story clearly into your microphone
5. **Watch Feedback**: 
   - ✅ Green underline = Correct word
   - ❌ Red underline = Incorrect word
   - 🔵 Blue outline = Current word
6. **View Report**: When finished, see your results including accuracy and WPM

## 🔌 API Endpoints

### Stories
- `GET /api/stories/` - Get all stories
- `GET /api/stories/{id}` - Get a specific story

### Report
- `POST /api/report/` - Generate reading report
  ```json
  {
    "total_words": 100,
    "correct_words": 85,
    "reading_time": 120.5,
    "practice_words": ["word1", "word2"]
  }
  ```

## 📊 Speech Recognition

- **Language**: English (en-US)
- **Mode**: Continuous recognition with interim results
- **Matching Algorithm**: Levenshtein distance with 80% similarity threshold
- **No Duplicate Matching**: Each spoken word is matched only once

## 🎨 UI Components

### Color Scheme
- **Primary**: #FF6B9D (Bubble Pink)
- **Secondary**: #C44569 (Deep Pink)
- **Success**: #2ECC71 (Green)
- **Error**: #E74C3C (Red)
- **Accent**: #00D4FF (Cyan)

### Animations
- Smooth transitions (Framer Motion)
- Floating elements
- Pulse effects
- Scale animations
- Gradient backgrounds

## 📈 Performance

- **Frontend Build**: ~487KB JS, ~29KB CSS (gzipped)
- **Load Time**: < 1 second
- **API Response**: < 100ms for story data
- **Speech Recognition**: Real-time with <500ms latency

## 🔧 Configuration

### Environment Variables

**Frontend** (`.env`):
```
VITE_API_URL=http://localhost:8000/api
```

**Backend** (CORS configuration in `app/main.py`):
```python
allow_origins=["http://localhost:5173"]
```

### Matching Threshold
Edit `src/utils/constants.js`:
```javascript
export const MATCH_THRESHOLD = 80; // 0-100
```

## 🐛 Browser Support

| Browser | Status |
|---------|--------|
| Chrome | ✅ Full Support |
| Firefox | ✅ Full Support |
| Safari | ✅ Full Support |
| Edge | ✅ Full Support |
| Safari (iOS) | ⚠️ Limited* |

*iOS Safari requires user gesture to start speech recognition.

## 🚀 Production Deployment

### Frontend
```bash
npm run build
# Deploy dist/ folder to any static hosting (Vercel, Netlify, etc.)
```

### Backend
```bash
# Using Gunicorn + Uvicorn
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## 📝 API Response Examples

### Get Stories
```json
[
  {
    "id": 1,
    "title": "The Little Rabbit",
    "difficulty": "Easy",
    "estimated_time": "1 min",
    "word_count": 23,
    "paragraph": "The little rabbit jumped over the log..."
  }
]
```

### Generate Report
```json
{
  "accuracy": 92.5,
  "total_words": 100,
  "correct_words": 92,
  "wrong_words": 8,
  "reading_speed": 95,
  "practice_words": ["difficult", "word"],
  "appreciation": "👏 Great Job! Keep practicing."
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ for making reading fun!

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Happy Reading! 📚🎙️**
