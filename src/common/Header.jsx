import React, { useEffect, useState } from 'react';
import { CloudCheck, X, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Prevent scrolling when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const DocumentationURL = import.meta.env.VITE_OPEN_WEATHER_URL_DOCUMENTATION;

  const handleDocsLink = (e) => {
    e.preventDefault();
    if(DocumentationURL){
      window.open(DocumentationURL, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('Documentation URL not found in the .env file');
    }
  }

  const navlinks = [
    { name: "Documentation", isExternal: true },
    { name: "Illustration", id: "illustration", isExternal: false },
    { name: "Showcase", id: "showcase", isExternal: false },
  ];

  const handleNavigationClick = (e, targetId) => {
    e.preventDefault();

    // Check if menu is open
    if(isMenuOpen) setIsMenuOpen(false);

    // Check if we are in the homepage
    if(location.pathname === "/"){
      const element = document.getElementById(targetId);
      if(element){
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on a different page, go home then scrooll view
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if(element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
        
    }
  };

  const onScrollTop = () => {
    setIsMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <header className='sticky top-0 z-50 border-b border-gray-100 bg-white transition-all'>
      {/* --- DESKTOP & MOBILE HEADER BAR --- */}
      <div className='flex justify-center w-full px-4 md:px-10 py-3'>
        <div className='flex items-center justify-between w-full max-w-7xl'>
          
          {/* Logo */}
          <Link
            to="/"
            onClick={onScrollTop}
            className='flex items-center gap-2 text-slate-900 group'
          >
            <div className='w-10 h-10 rounded-lg bg-[#135bec] flex items-center justify-center text-white transition-transform group-hover:scale-105'>
              <CloudCheck size={22} fill='currentColor' />
            </div>
            <h2 className='text-xl tracking-tight font-bold'>OWD</h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-8'>
            {navlinks.map((nav) => (
              nav.isExternal ? (
                <button
                  key={nav.name}
                  onClick={handleDocsLink}
                  className='text-sm font-bold text-slate-600 hover:text-[#135bec] transition-colors'
                >
                  {nav.name}
                </button>
              ) : (
                <a
                  key={nav.name}
                  href={`#${nav.id}`}
                  onClick={(e) => handleNavigationClick(e, nav.id)}
                  className='text-sm font-bold text-slate-600 hover:text-[#135bec] transition-colors cursor-pointer'
                >
                  {nav.name}
                </a>
              )
            ))}
          </nav>
          
          {/* Mobile Menu Toggle */}
          <div className='md:hidden'>
            <button onClick={toggleMenu} className='p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors'>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE OVERLAY & MENU --- */}
      <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        
        {/* BG Dimmer */}
        <div 
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={toggleMenu} 
        />

        {/* Slide-down Panel */}
        <div className={`absolute top-0 left-0 w-full h-[65vh] bg-slate-50 shadow-2xl transition-transform duration-500 ease-in-out flex flex-col p-6 rounded-b-[2.5rem] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          
          {/* Logo & Close Button */}
          <div className='flex items-center justify-between w-full mb-10'>
            <div className='flex items-center gap-2'>
              <div className='w-9 h-9 rounded-lg bg-[#135bec] flex items-center justify-center text-white'>
                <CloudCheck size={20} fill='currentColor' />
              </div>
              <span className='text-lg font-bold text-slate-900'>OWD</span>
            </div>
            
            <button 
              onClick={toggleMenu} 
              className='p-2 bg-white rounded-full text-slate-900 shadow-md border border-gray-100 group transition-all active:scale-90'
            >
              <X size={20} className='group-hover:text-red-500 transition-colors' />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className='flex flex-col items-center justify-center flex-grow gap-8'>
            {navlinks.map((nav) => (
              nav.isExternal ? (
                <button
                  key={nav.name}
                  onClick={handleDocsLink}
                  className='text-xl font-bold text-slate-800 hover:text-[#135bec] active:scale-95 transition-all'
                >
                  {nav.name}
                </button>
              ) : (
                <button
                  key={nav.name}
                  onClick={(e) => handleNavigationClick(e, nav.id)}
                  className='text-xl font-bold text-slate-800 hover:text-[#135bec] active:scale-95 transition-all'
                >
                  {nav.name}
                </button>
              )
            ))}
          </nav>

          {/* Footer Branding */}
          <div className='mt-auto text-center pb-4'>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              © 2025 OWD • Open Weather Demo
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;