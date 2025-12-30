import React from 'react';
import taskimage from "../assets/TASKLIST.png";
import { ArrowRight, BookOpen } from 'lucide-react';

const HomePage = ({ onStart }) => {
  const Read_Docs = import.meta.env.VITE_OPEN_WEATHER_URL_DOCS;

  const handleReadDocs = () => {
    if(Read_Docs){
      window.open(Read_Docs, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('Docs URL not foundin the .env file');
    }
  }
  return (
    <main className="flex-grow max-w-7xl mx-auto px-4 md:px-10 py-12 md:py-20 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* LEFT COLUMN*/}
        <div className="space-y-8 text-left order-1 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ecfdf5] text-[#059669] 
          text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            Level 2 • Rest API Integration
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 
          leading-[1.1] tracking-tight">
            Seamless Weather <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#135bec] to-[#10b981]">
              Data Integration
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-md leading-relaxed">
            Integrate reliable global weather data into your applications. Fetch forecasts, 
            historical data and real-time conditions with ease using RESTful services.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button onClick={onStart} className="flex items-center gap-2 bg-[#0f172a] text-white 
            px-8 py-4 rounded-xl font-bold hover:bg-slate-800 
            transition-all hover:translate-y-[-1px] shadow-lg">
              Live User's Data <ArrowRight size={18} />
            </button>
            <button onClick={handleReadDocs} className="flex items-center gap-2 bg-white text-slate-900 
            border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all">
              Read Docs <BookOpen size={18} />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="relative flex justify-center lg:justify-end order-2">
          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#135bec]/10 to-[#10b981]/15 
          rounded-[2.5rem] blur-2xl" />
          
          <div className="relative z-10 w-full max-w-[580px] group">
            <div className="overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] 
            shadow-2xl border border-slate-100 bg-white transition-transform duration-500 hover:scale-[1.02]">
              <img 
                src={taskimage} 
                alt="Task 2: REST API Integration" 
                className="w-full h-auto block object-contain"
              />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default HomePage;