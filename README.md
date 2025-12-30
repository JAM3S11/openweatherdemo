# OpenWeather Demo

A modern, responsive React application demonstrating seamless integration with the OpenWeather API. This project showcases real-time weather data fetching, forecasts, and interactive weather maps using RESTful API services.

## 🌟 Features

- **Real-Time Weather Data**: Fetches current weather conditions based on user's geolocation
- **5-Day Forecast**: Displays upcoming weather forecasts in 3-hour intervals
- **Interactive Weather Maps**: Live temperature thermal layers visualization
- **Atmospheric Data**: Real-time pressure monitoring and visibility metrics
- **Modern UI**: Built with Tailwind CSS for a sleek, responsive design
- **Smooth Navigation**: React Router for seamless page transitions

## 🚀 Tech Stack

- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Unstyled, accessible UI components
- **Lucide React** - Beautiful icon library

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- An OpenWeather API key ([Get one here](https://openweathermap.org/api))

## 🔧 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd OPENWEATHERDEMO
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_OPENWEATHERAPIKEY=your_api_key_here
VITE_BASE=https://api.openweathermap.org/data/2.5/
VITE_OPEN_WEATHER_URL_DOCS=https://openweathermap.org/api
VITE_OPEN_WEATHER_URL_DOCUMENTATION=https://openweathermap.org/
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
OPENWEATHERDEMO/
├── src/
│   ├── assets/          # Images and static assets
│   ├── common/          # Reusable components (Header, Footer)
│   ├── pages/           # Page components
│   │   ├── HomePage.jsx
│   │   ├── MoreHomePage.jsx
│   │   ├── IllustrationPage.jsx
│   │   └── ShowCasePage.jsx
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Public assets
├── package.json
└── vite.config.js
```

## 🎯 Usage

### Getting Weather Data

The application automatically detects your location using the browser's Geolocation API and fetches:
- Current weather conditions
- Temperature, humidity, pressure
- Weather forecasts for the next 12 hours
- Interactive weather maps

### API Integration Example

The app demonstrates how to integrate OpenWeather API:

```javascript
// Fetch current weather
const response = await axios.get(`${BASE_URL}weather`, {
  params: { lat, lon, appid: API_KEY, units: 'metric' }
});

// Fetch 5-day forecast
const forecast = await axios.get(`${BASE_URL}forecast`, {
  params: { lat, lon, appid: API_KEY, units: 'metric' }
});
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Endpoints Used

- **Current Weather**: `/weather` - Real-time weather data
- **5-Day Forecast**: `/forecast` - Weather forecast data
- **Weather Maps**: `/map/temp_new` - Temperature map tiles

## 🔒 Environment Variables

Make sure to set up the following environment variables in your `.env` file:

- `VITE_OPENWEATHERAPIKEY` - Your OpenWeather API key (required)
- `VITE_BASE` - Base URL for OpenWeather API
- `VITE_OPEN_WEATHER_URL_DOCS` - Link to OpenWeather documentation
- `VITE_OPEN_WEATHER_URL_DOCUMENTATION` - Link to .... "    "

## 🎨 Features Showcase

- **HomePage**: Landing page with project overview
- **MoreHomePage**: Live weather data display with real-time updates
- **IllustrationPage**: Visual demonstrations of API capabilities
- **ShowcasePage**: Code examples and integration guide

## 📝 Notes

- The app requires location permissions to fetch weather data
- API rate limits apply based on your OpenWeather subscription plan
- Weather data is displayed in metric units (Celsius)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Resources

- [OpenWeather API Documentation](https://openweathermap.org/api)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
