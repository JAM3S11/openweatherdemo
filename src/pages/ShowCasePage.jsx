import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const ShowcasePage = () => {
  const features = [
    "Clear Documentation",
    "JSON & XML Response Formats",
    "SDKs for Python, Node.js, and more"
  ];

  return (
    <section id="showcase" className="py-24 bg-white px-4 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                    Simple Integration
                </h2>
                
                <div className="space-y-6">
                    <p className="text-slate-600 text-lg max-w-md leading-relaxed">
                    This section illustrates a live demonstration of the <strong>OpenWeather API</strong> integration. 
                    With just a few lines of code, you can fetch real-time weather data and 
                    forecasts for any global coordinate as shown in the <span className='text-slate-900/70 italic font-bold'>app.js</span>.
                    </p>

                    <div className="pt-2">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
                            Developer Resources
                        </p>
                        <a 
                            href="https://github.com/JAM3S11/openweatherdemo.git" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#135bec] font-bold hover:underline group"
                        >
                            View implementation on GitHub 
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Check className="text-emerald-500" size={14} strokeWidth={3} />
                  </div>
                  <span className="font-bold text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Code Editor Mockup */}
          <div className="relative group">
            {/* Background decorative glow */}
            <div className="absolute -inset-4 bg-blue-500/5 rounded-[2.5rem] blur-3xl group-hover:bg-blue-500/10 transition-colors" />
            
            <div className="relative bg-[#1e293b] rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-700 bg-[#1e293b]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="ml-4 text-xs font-mono text-slate-400">app.js</div>
              </div>

              {/* Code Content */}
              <div className="p-8 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto">
                <pre className="text-slate-300">
                  <code>
                    <span className='text-slate-200/50 text-sm italic tracking-tighter'>//Example of a Weather API key implementation</span><br />
                    <span className="text-purple-400">const</span> axios = <span className="text-blue-400">require</span>(<span className="text-emerald-400">'axios'</span>);<br />
                    <span className="text-purple-400">async function</span> <span className="text-yellow-400">getWeather</span>(city) {'{'}<br />
                    &nbsp;&nbsp;<span className="text-purple-400">try</span> {'{'}<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> axios.<span className="text-blue-400">get</span>(<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">`https://api.openweathermap.org/data/2.5/weather?q={`cityName`}&appid={`yourAPIKEY`}`</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;);<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;console.<span className="text-blue-400">log</span>(response.data);<br />
                    &nbsp;&nbsp;{'}'} <span className="text-purple-400">catch</span> (error) {'{'}<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;console.<span className="text-red-400">error</span>(error);<br />
                    &nbsp;&nbsp;{'}'}<br />
                    {'}'}<br />
                    <span className="text-slate-200/50 text-sm italic tracking-tighter">// Fetch London weather</span><br />
                    <span className="text-yellow-400">getWeather</span>(<span className="text-emerald-400">'Nairobi'</span>);
                  </code>
                </pre>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ShowcasePage;