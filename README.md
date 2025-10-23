# SWR Learning Application

A comprehensive Next.js application designed to teach SWR (Stale-While-Revalidate) data fetching patterns through interactive examples and hands-on tutorials.

## 🎯 What This App Teaches

This application demonstrates key SWR features through practical examples:

- **Data Fetching**: Basic SWR hooks and fetcher functions
- **Caching**: Automatic data caching and revalidation
- **Deduplication**: Request deduplication for performance
- **Focus Refresh**: Automatic data refresh on window focus
- **Mutations**: Optimistic updates and manual revalidation
- **Custom Hooks**: Reusable data fetching patterns
- **Parallel Fetching**: Multiple simultaneous requests
- **Error Handling**: Built-in error states and retry logic

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-guild-useswr
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   echo "OPENWEATHER_API_KEY=your_api_key_here" > .env.local
   ```
   
   Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
app/
├── (demo)/                    # Demo pages
│   └── weather/              # Weather app with SWR
├── (test-it-yourself)/       # Interactive learning pages
│   └── favorite-artists/     # Artist tracker tutorial
├── api/                      # API routes
│   ├── weather/              # Weather API endpoint
│   └── users/[id]/favorites/ # User favorites API
├── components/               # Shared components
│   ├── ApiGuide.tsx         # Interactive tutorial guide
│   ├── StepCard.tsx         # Tutorial step component
│   └── CodeBlock.tsx        # Code display component
└── lib/                     # Utilities
    └── mockDatabase.ts      # In-memory database
```

## 🎓 Learning Modules

### 1. Weather App Demo (`/weather`)
- **Real API Integration**: Fetches live weather data
- **City Selection**: Choose from 20 major cities worldwide
- **Unit Toggle**: Switch between Celsius and Fahrenheit
- **SWR Features**: Caching, focus refresh, error handling

### 2. Artist Tracker Tutorial (`/favorite-artists`)
- **Interactive Guide**: Step-by-step SWR implementation
- **API Documentation**: Complete endpoint reference
- **Hands-on Learning**: Build features incrementally
- **Custom Hooks**: Learn reusable patterns

## 🛠️ Key Features

### SWR Features Demonstrated

| Feature | Description | Example |
|---------|-------------|---------|
| `refreshInterval` | Auto-refresh data every N milliseconds | `{ refreshInterval: 3000 }` |
| `revalidateOnFocus` | Refresh when window regains focus | `{ revalidateOnFocus: true }` |
| `mutate` | Manual data revalidation | `mutate()` |
| `dedupingInterval` | Prevent duplicate requests | `{ dedupingInterval: 2000 }` |
| Custom Hooks | Reusable data fetching logic | `useUserFavorites(userId)` |
| Parallel Fetching | Multiple simultaneous requests | Multiple `useSWR` calls |
| Error Handling | Built-in error states | `{ error, isError }` |
| Loading States | Automatic loading indicators | `{ isLoading }` |

### API Endpoints

#### Weather API
- `GET /api/weather?city=London&units=metric`
- Returns current weather data for specified city

#### User Favorites API
- `GET /api/users/[id]/favorites` - Get user's favorite artists
- `POST /api/users/[id]/favorites` - Add artist to favorites
- `DELETE /api/users/[id]/favorites` - Remove artist from favorites

## 🎨 UI Components

### Interactive Tutorial Guide
- **Tabbed Interface**: Endpoints, Tutorial, SWR Reference
- **Step-by-Step**: 4 progressive learning steps
- **Code Examples**: Copy-paste ready code snippets
- **Live Testing**: Test features as you learn

### Weather Display
- **Card Layout**: Clean, modern weather cards
- **Real-time Data**: Live weather information
- **Responsive Design**: Works on all screen sizes
- **Dark Mode**: Automatic theme switching

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

### Environment Variables

```bash
# Required for weather functionality
OPENWEATHER_API_KEY=your_openweather_api_key

# Optional: Disable SSL verification for development
NODE_TLS_REJECT_UNAUTHORIZED=0
```

## 📚 Learning Path

### Beginner Level
1. **Start with Weather App**: See SWR in action
2. **Explore the Code**: Understand basic patterns
3. **Try the Tutorial**: Follow step-by-step guide

### Intermediate Level
1. **Custom Hooks**: Learn to create reusable hooks
2. **Error Handling**: Implement robust error states
3. **Optimistic Updates**: Learn mutation patterns

### Advanced Level
1. **Performance Optimization**: Understand caching strategies
2. **Complex State Management**: Handle multiple data sources
3. **Real-world Patterns**: Apply SWR in production apps

## 🐛 Troubleshooting

### Common Issues

**SSL Certificate Errors**
```bash
# If you see SELF_SIGNED_CERT_IN_CHAIN errors
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run dev
```

**API Key Issues**
- Ensure your OpenWeather API key is valid
- Check the `.env.local` file is in the project root
- Verify the API key has the correct permissions

**Port Already in Use**
```bash
# Use a different port
npm run dev -- -p 3001
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is for educational purposes. Feel free to use it for learning SWR and React patterns.

## 🔗 Useful Links

- [SWR Documentation](https://swr.vercel.app/)
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [React Documentation](https://react.dev/)

---

**Happy Learning! 🚀**

Start with the weather app to see SWR in action, then dive into the interactive tutorial to build your own features step by step.