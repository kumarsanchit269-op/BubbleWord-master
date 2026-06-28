# BubbleWord - Quick Start Guide

## 🚀 Start Both Servers (5 minutes)

### Terminal 1: Backend
```bash
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v8.1.0  ready in 508 ms
➜  Local:   http://localhost:5173/
```

### Terminal 3 (Optional): Test API
```bash
curl http://localhost:8000/api/stories/
```

---

## 🌐 Access the Application

- **App**: http://localhost:5173
- **Backend API**: http://localhost:8000/api
- **Health Check**: http://localhost:8000/health


---

## 🧪 Testing the Flow

### 1. Home Page
- Visit http://localhost:5173
- Stories should load from backend

### 2. Select a Story
- Click on an Easy story (shorter for testing)

### 3. Reading Page
- Allow microphone access when prompted
- Click "Start Reading"
- Read the story clearly

### 4. View Report
- See accuracy, WPM, and practice words
- Click "Back to Home" to try another story

---

## 🛠️ Development Commands

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview build
npm run lint     # Run linter
```

### Backend
```bash
# Start with auto-reload
python -m uvicorn app.main:app --reload

# Test API endpoints
curl http://localhost:8000/api/stories/
curl http://localhost:8000/api/stories/1
```

---

## 📁 Adding New Stories

Add to `backend/app/stories/easy.json`, `medium.json`, or `hard.json`:

```json
[
  {
    "id": 10,
    "title": "Story Title",
    "difficulty": "Easy",
    "estimated_time": "1 min",
    "paragraph": "Your story text here..."
  }
]
```

Restart backend to load new stories.

---

## ⚙️ Troubleshooting

### Microphone not working?
- Check browser permissions: Settings → Privacy → Microphone
- Try a different browser
- Ensure HTTPS (required for production)

### API returning 404?
- Make sure trailing slash is used: `/api/stories/`
- Check backend is running on port 8000
- Verify CORS is enabled

### Stories not loading?
- Check backend logs for errors
- Verify JSON files are valid JSON
- Restart backend server

### Port already in use?
```bash
# Kill process on port 8000 (backend)
lsof -i :8000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -i :5173 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

---

## 📱 Device Testing

### Desktop
- ✅ Chrome, Firefox, Safari, Edge

### Mobile
- ⚠️ iOS Safari has limitations (requires user gesture)
- ✅ Android Chrome

### Tablet
- ✅ iPad Safari
- ✅ Android tablets

---

## 🎯 Key Features to Try

1. **Difficulty Filtering** - Try stories from each difficulty level
2. **Word Highlighting** - Watch as correct/incorrect words update
3. **Real-time Transcript** - See what you're saying below the text
4. **Detailed Report** - Check practice words for improvement
5. **Responsive Design** - Try on different screen sizes

---

## 📊 Example Metrics

- **Accuracy**: Percentage of correctly spoken words
- **WPM**: Words per minute (reading speed)
- **Total Words**: How many words in the story
- **Wrong Words**: Words that need practice

---

## 🔄 Development Workflow

1. Make changes to frontend in `src/`
2. Changes auto-reload (HMR)
3. Check console for errors
4. Make changes to backend in `app/`
5. Backend auto-reloads (--reload flag)
6. Test API changes with curl

---

## 🎓 Learning Resources

- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **FastAPI**: https://fastapi.tiangolo.com
- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion

---

**Ready to start? Run the servers and visit http://localhost:5173! 🚀**
