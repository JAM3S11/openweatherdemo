import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sun, Clock, History, Map as MapIcon, AlertTriangle, Zap, Droplets, Wind, Loader2 } from 'lucide-react';

const MoreHomePage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_OPENWEATHERAPIKEY;
  const BASE_URL = import.meta.env.VITE_BASE;

  useEffect(() => {
    const fetchAllData = async (lat, lon) => {
      try {
        // 1. Fetch Current Weather
        const currentRes = await axios.get(`${BASE_URL}weather`, {
          params: { lat, lon, appid: API_KEY, units: 'metric' }
        });

        // 2. Fetch 5-Day / 3-Hour Forecast
        const forecastRes = await axios.get(`${BASE_URL}forecast`, {
          params: { lat, lon, appid: API_KEY, units: 'metric' }
        });

        setWeatherData(currentRes.data);
        // Reads the 1st 4 items for the "Hourly" display
        setForecast(forecastRes.data.list.slice(0, 4));
        setLoading(false);
      } catch (err) {
        setError("API limit reached or key invalid.");
        setLoading(false);
      }
    };

    // Fetches the devices location
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchAllData(pos.coords.latitude, pos.coords.longitude),
      () => setError("Location access denied.")
    );
  }, [API_KEY, BASE_URL]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 bg-slate-50">
      <Loader2 className="animate-spin text-[#135bec] mb-4" size={40} />
      <p className="text-slate-500 font-bold">Connecting to live satellites...</p>
    </div>
  );

  return (
    <section className="bg-slate-50/50 py-24 px-4 md:px-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16 space-y-4">
          <h4 className="text-[#135bec] font-bold uppercase tracking-widest text-xs">Global Intelligence</h4>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Live Feed: {weatherData?.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* 1. WILL READ LIVE WEATHER DATA */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-8">
                <h3 className="font-bold text-slate-800 text-sm">Current Weather</h3>
                <Sun className="text-orange-400" size={24} />
              </div>
              <div className="text-6xl font-black text-slate-900 tracking-tighter">
                {Math.round(weatherData?.main.temp)}°<span className="text-2xl font-light text-slate-400">C</span>
              </div>
              <p className="text-slate-900 font-extrabold text-xl mt-4">{weatherData?.name}</p>
              <p className="text-slate-500 text-sm capitalize">{weatherData?.weather[0].description}</p>
            </div>
          </div>

          {/* 2. LIVE HOURLY FORECAST (Next 9 hours) */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-bold text-slate-800 text-sm">Upcoming (4h Steps)</h3>
              <Clock className="text-[#135bec]" size={24} />
            </div>
            <div className="flex justify-between items-end h-24 mb-4">
               {forecast.map((item, i) => (
                 <div key={i} className="flex flex-col items-center gap-2">
                   <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="icon" className="w-8" />
                   <span className="text-xs font-bold text-slate-700">{Math.round(item.main.temp)}°</span>
                   <span className="text-[10px] font-bold text-slate-400">
                     {new Date(item.dt * 1000).getHours()}:00
                   </span>
                 </div>
               ))}
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Real-time forecast cycles.</p>
          </div>

          {/* 3. LIVE BAROMETER (Using Pressure for "Historical" look) */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-8">
              <h3 className="font-bold text-slate-800 text-sm">Atmospheric</h3>
              <History className="text-purple-500" size={24} />
            </div>
            <div className="space-y-2">
                <div className="text-2xl font-black text-slate-800">{weatherData?.main.pressure} hPa</div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full" style={{ width: `${(weatherData?.main.pressure / 1100) * 100}%` }}></div>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Live pressure monitoring from ground stations.</p>
            </div>
          </div>

          {/* 4. LIVE WEATHER MAP */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-8">
              <h3 className="font-bold text-slate-800 text-sm">Weather Maps</h3>
              <MapIcon className="text-green-500" size={24} />
            </div>
            <div className="h-24 bg-slate-900 rounded-2xl relative overflow-hidden mb-4 group cursor-pointer">
               {/* bELOW GENERATES REAL TEMP MAP */}
               <img 
                 src={`https://tile.openweathermap.org/map/temp_new/3/4/3.png?appid=${API_KEY}`} 
                 className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform"
                 alt="Weather Map" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <p className="text-[10px] text-slate-400 font-medium leading-tight">Live temperature thermal layers.</p>
          </div>
        </div>

        {/* BOTTOM SECTION - SYSTEM ALERTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex items-center gap-8">
            <div className="p-5 bg-rose-50 rounded-2xl">
              <AlertTriangle className="text-rose-500" size={32} />
            </div>
            <div>
              <div className="text-rose-500 font-bold uppercase tracking-tighter text-sm mb-1">
                {weatherData?.weather[0].main === "Rain" ? "Rain Alert" : "System Normal"}
              </div>
              <p className="text-sm text-slate-500 first-letter:uppercase">
                {weatherData?.weather[0].description} detected in your vicinity.
              </p>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex items-center gap-8">
            <div className="p-5 bg-amber-50 rounded-2xl"><Zap className="text-amber-400" size={32} /></div>
            <div>
              <div className="text-amber-500 font-bold uppercase tracking-tighter text-sm mb-1">Solar Visibility</div>
              <p className="text-sm text-slate-500">
                Visibility: {weatherData?.visibility / 1000}km. Optimized for solar capture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreHomePage;