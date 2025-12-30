import React, { useState } from 'react';
import axios from 'axios';
import { Search, MapPin, Wind, Droplets, Thermometer, Cloud, Navigation, Loader2 } from 'lucide-react';

const IllustrationPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_OPENWEATHERAPIKEY;
  const BASE_URL = import.meta.env.VITE_BASE;

  const fetchWeather = async (query) => {
    setLoading(true);
    setError(null);
    try {
      let params = { appid: API_KEY, units: 'metric' };

      if (query.includes(',')) {
        const [lat, lon] = query.split(',').map(coord => coord.trim());
        params.lat = lat;
        params.lon = lon;
      } else {
        params.q = query;
      }

      const response = await axios.get(`${BASE_URL}weather`, { params });
      setWeatherData(response.data);
    } catch (err) {
      setError("Location not found. Please try again.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeather(searchQuery);
    }
  };

  const handleAutoDetect = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = `${pos.coords.latitude}, ${pos.coords.longitude}`;
          setSearchQuery(coords);
          fetchWeather(coords);
        },
        () => {
          setError("Location access denied.");
          setLoading(false);
        }
      );
    }
  };

  return (
    <section id='illustration' className="py-24 bg-white px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <h4 className="text-[#135bec] font-bold uppercase tracking-widest text-xs">Live Capability</h4>
          <h2 className="text-4xl font-black text-slate-900">Check Weather in Your Area</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Instantly retrieve hyper-local weather data. Experience the precision of our geocoding and real-time API.
          </p>
        </div>

        <div className="bg-slate-50/50 rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-sm max-w-4xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Search Form */}
            <div className="space-y-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">
                    Enter Location
                  </label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text"
                      placeholder="City (e.g. Kiambu) or Lat, Lon"
                      className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#135bec] outline-none transition-all shadow-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-rose-500 text-xs mt-2 ml-2 font-bold">{error}</p>}
                </div>

                <div className="flex gap-3">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#135bec] text-white font-bold py-4 rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <>Get Weather <Navigation size={16} /></>}
                  </button>
                  <button 
                    type="button"
                    onClick={handleAutoDetect}
                    className="bg-white border border-slate-200 text-slate-600 font-bold py-4 px-6 rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2"
                  >
                    <MapPin size={18} className="text-green-500" /> Auto
                  </button>
                </div>
              </form>

              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {['Nairobi', 'London', 'New York'].map(city => (
                    <button 
                      key={city}
                      onClick={() => {setSearchQuery(city); fetchWeather(city);}}
                      className="text-xs font-bold text-slate-500 bg-white border border-slate-100 px-4 py-2 rounded-full hover:border-[#135bec] hover:text-[#135bec] transition-all"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Display Result */}
            <div className="relative min-h-[300px] flex items-center justify-center">
              {weatherData ? (
                <div className="w-full bg-white p-8 rounded-[2rem] shadow-xl border border-slate-50 animate-in zoom-in-95 duration-500">
                  <div className="space-y-6">
                    <div>
                      <p className="text-rose-500 text-sm font-medium">
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <h3 className="text-3xl font-black text-slate-900">{weatherData.name}, {weatherData.sys.country}</h3>
                    </div>

                    <div className="flex items-center gap-4">
                      <img 
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                        alt="icon" 
                        className="w-16 h-16 bg-slate-100 rounded-full"
                      />
                      <div className="text-5xl font-black text-slate-900">
                        {Math.round(weatherData.main.temp)}°<span className="text-2xl font-light">C</span>
                      </div>
                    </div>

                    <p className="text-slate-700 font-bold">
                      Feels like {Math.round(weatherData.main.feels_like)}°C. <span className="first-letter:uppercase">{weatherData.weather[0].description}</span>
                    </p>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 border-t border-slate-100 pt-6">
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                        <Navigation size={14} className="rotate-45" /> {weatherData.wind.speed}m/s
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                        <Wind size={14} /> {weatherData.main.pressure}hPa
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                        <Droplets size={14} className="text-blue-400" /> Humidity: {weatherData.main.humidity}%
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                        <Thermometer size={14} className="text-orange-400" /> Visibility: {weatherData.visibility / 1000}km
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 opacity-40">
                  <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto flex items-center justify-center">
                    {loading ? <Loader2 className="animate-spin" size={32} /> : <Search size={32} />}
                  </div>
                  <p className="font-bold text-slate-400">
                    {loading ? "Fetching live data..." : "Search for a location to see live data"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IllustrationPage;