# 🛍️ Ladies Suits AI Chatbot - React Frontend

Modern, responsive chatbot UI for ladies suits e-commerce with AI-powered shopping assistant.

## ✨ Features

- 💬 **Real-time Chat Interface** - Smooth conversation with AI assistant
- 🎨 **Product Cards** - Visual display of ladies suits collection
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🎯 **Smart Search** - RAG-powered product recommendations
- 📊 **Source Attribution** - Shows which catalog sources were used
- ⚡ **Fast & Modern** - Built with React 18 and modern UI/UX

## 🚀 Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn
- Backend server running on http://localhost:5000

### Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📁 Project Structure
```
chatbot-frontend/
├── public/
│   └── index.html              # Main HTML file
├── src/
│   ├── components/
│   │   ├── ChatInterface.jsx   # Main chat component
│   │   ├── ProductCard.jsx     # Product display card
│   │   ├── MessageBubble.jsx   # Chat message component
│   │   └── Navbar.jsx          # Top navigation bar
│   ├── services/
│   │   └── api.js              # API calls to backend
│   ├── styles/
│   │   └── App.css             # All styles
│   ├── App.jsx                 # Main App component
│   └── index.js                # React entry point
├── package.json                # Dependencies
└── README.md                   # This file
```

## 🎯 Usage

### Connecting to Backend

Make sure your Flask backend is running:
```bash
cd backend-enhanced-final
python app/main.py
```

Backend should be accessible at: `http://localhost:5000`

### Test Queries

Try these in the chat:
- "Do you have black lawn suits?"
- "What colors are available?"
- "Show me summer collection"
- "Price of pink suit?"
- "What sizes do you have?"
- "How do I order?"

## 🎨 Customization

### Change Colors

Edit `src/styles/App.css`:
```css
:root {
  --primary-color: #E74C3C;     /* Main brand color */
  --secondary-color: #3498DB;   /* Accents */
}
```

### Add More Products

Edit `src/components/ChatInterface.jsx`:
```javascript
const featuredProducts = [
  { name: 'New Product', price: 5000, ... }
];
```

### Update Contact Info

Edit `src/components/Navbar.jsx` and `ProductCard.jsx`

## 📦 Build for Production
```bash
npm run build
```

Creates optimized production build in `build/` folder.

## 📞 Contact

- Phone: 0320-1007448
- Email: adsab2522@gmail.com

## 📝 License

MIT License - Free to use and modify

---npm

Built with ❤️ using React, powered by AI
```

---

## 🚀 Setup Instructions:

1. **Create folder structure**:
```
chatbot-frontend/
├── public/
├── src/
│   ├── components/
│   ├── services/
│   └── styles/