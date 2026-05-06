import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Wrench,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Award,
  Factory,
  ShieldCheck,
  Zap,
  Target,
  Users,
  User,
  Briefcase,
  BarChart,
  Network,
  ChevronDown,
  ChevronUp,
  Upload,
  Clock,
  X,
  Menu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import ThreeDCarousel from './components/ThreeDCarousel.jsx';

// Removed unused social icon components
import './index.css';

// Reusable Animated Counter Component
const AnimatedCounter = ({ target, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        } else {
          // Reset when scrolled out of view
          setHasStarted(false);
          setCount(0);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    const currentCounterRef = counterRef.current;
    return () => {
      if (currentCounterRef) observer.unobserve(currentCounterRef);
    };
  }, []); // Remove hasStarted dependency to prevent constant re-triggering of observer

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth deceleration (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, hasStarted]);

  return <span ref={counterRef}>{count}{suffix}</span>;
};

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [formStatus, setFormStatus] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [currentGallery, setCurrentGallery] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isAddressHovered, setIsAddressHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lang, setLang] = useState('en');
  const [isScrolled, setIsScrolled] = useState(false);

  const translations = {
    en: {
      home: "Home",
      about: "About Us",
      strength: "Strength",
      products: "Products",
      quality: "Quality",
      clients: "Clients",
      contact: "Contact",
      heroTitle: "Excellence in Precision Machining & Fabrication",
      heroDesc: "Specializing in precision machining of bar, forging, casting, press components, and sheet metal parts. Delivering uncompromised quality through state-of-the-art technology.",
      discover: "Discover Our Heritage",
      download: "Download Brochure"
    }
  };

  const t = translations[lang];

  // Force document title update to clear browser cache
  useEffect(() => {
    document.title = "D. K. Techno Industries | Precision Manufacturing Excellence";
  }, []);

  // Dynamic Year Calculation
  const establishedYear = 2011;
  const currentYear = new Date().getFullYear();
  const yearsOfExcellence = currentYear - establishedYear;

  // Scroll Progress Logic
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
      
      // Update Navbar state
      if (currentScroll > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preloader Logic
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 500); // Wait half a sec at 100% before hiding
      }
      setLoadProgress(progress);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // ScrollSpy Logic (Active Navigation)
  useEffect(() => {
    const sections = document.querySelectorAll('section');

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is exactly in middle of screen
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  // Scroll to Top Logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Custom Cursor Logic (Direct DOM manipulation for high performance)
  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');
    const dot = document.querySelector('.custom-cursor-dot');
    
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      // 3D Tilt Logic for cards
      const tiltCards = document.querySelectorAll('.tilt-card');
      tiltCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = x - rect.left - rect.width / 2;
        const cardY = y - rect.top - rect.height / 2;
        const rotateX = (cardY / (rect.height / 2)) * -10; // Max 10 deg
        const rotateY = (cardX / (rect.width / 2)) * 10;
        
        // Only apply if mouse is close enough to the card
        if (Math.abs(cardX) < rect.width && Math.abs(cardY) < rect.height) {
           card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        } else {
           card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        }
      });

      // Using requestAnimationFrame for perfectly synced screen updates
      requestAnimationFrame(() => {
        if (cursor) {
          cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
        if (dot) {
          dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      });
    };

    const handleMouseOver = (e) => {
      const tag = e.target.tagName.toLowerCase();
      // Add more tags or classes to trigger the hover effect
      if (['a', 'button', 'input', 'textarea', 'select'].includes(tag) || e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Intersection Observer for Scroll Animations
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: stop observing once revealed for a one-time animation
          // observer.unobserve(entry.target); 
        } else {
          // Remove this line if you only want elements to animate in once
          entry.target.classList.remove('active');
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const revealElements = document.querySelectorAll('.reveal');
    
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle clicking outside the mobile menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.mobile-nav-toggle')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Submitting...');

    const formData = new FormData(e.target);
    // Use environment variable for the Web3Forms Access Key
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setFormStatus('Success');
        e.target.reset();
        // Reset file input label
        const fileLabel = e.target.querySelector('input[type="file"]').parentElement.nextSibling;
        if (fileLabel) fileLabel.innerText = "No file chosen";
      } else {
        setFormStatus('Error');
      }
    } catch (error) {
      console.error(error);
      setFormStatus('Error');
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar" style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        height: '4px', 
        background: 'linear-gradient(to right, var(--brand-cyan), var(--accent-blue))', 
        width: `${scrollProgress}%`, 
        zIndex: 10001,
        transition: 'width 0.1s ease-out'
      }}></div>

      {/* Preloader */}
      <div className={`preloader ${!isLoading ? 'hidden' : ''}`}>
        <div className="loader-logo">
          <img src="/logo.png" alt="Logo" style={{ height: '40px', background: 'white', borderRadius: '50%', padding: '2px' }} />
          <span>D. K. Techno <span className="brand-accent">Industries</span></span>
        </div>
        <div className="loader-line-container">
          <div className="loader-line" style={{ width: `${loadProgress}%` }}></div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="floating-actions">
        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="floating-btn whatsapp-btn" title="Chat on WhatsApp">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        <button className={`floating-btn back-to-top-btn ${showScrollTop ? 'visible' : ''}`} onClick={scrollToTop} title="Back to Top">
          <ChevronUp size={24} />
        </button>
      </div>

      {/* Custom Cursor Elements */}
      <div className={`custom-cursor ${isHovering ? 'hovering' : ''}`} />
      <div className="custom-cursor-dot" />

      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-brand">
          <img src="/logo.png" alt="D. K. Techno Industries Logo" style={{ height: '40px', objectFit: 'contain', background: 'white', borderRadius: '50%', padding: '2px', marginRight: '5px' }} />
          <span>D. K. Techno <span className="brand-accent">Industries</span></span>
        </div>
        <ul className="nav-links">
          <li><a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} style={activeSection === 'home' ? { color: 'var(--brand-cyan)' } : {}}>Home</a></li>
          <li><a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} style={activeSection === 'about' ? { color: 'var(--brand-cyan)' } : {}}>About Us</a></li>
          <li><a href="#strength" className={`nav-link ${activeSection === 'strength' ? 'active' : ''}`} style={activeSection === 'strength' ? { color: 'var(--brand-cyan)' } : {}}>Strength</a></li>
          <li><a href="#products" className={`nav-link ${activeSection === 'products' ? 'active' : ''}`} style={activeSection === 'products' ? { color: 'var(--brand-cyan)' } : {}}>Products</a></li>
          <li><a href="#quality" className={`nav-link ${activeSection === 'quality' ? 'active' : ''}`} style={activeSection === 'quality' ? { color: 'var(--brand-cyan)' } : {}}>Quality</a></li>
          <li><a href="#clients" className={`nav-link ${activeSection === 'clients' ? 'active' : ''}`} style={activeSection === 'clients' ? { color: 'var(--brand-cyan)' } : {}}>Clients</a></li>
          <li><a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} style={activeSection === 'contact' ? { color: 'var(--brand-cyan)' } : {}}>Contact</a></li>
          <li>
            <button
              onClick={toggleTheme}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: '1rem' }}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
        </ul>
        
        <div className="mobile-nav-toggle">
          <button
            onClick={toggleTheme}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', marginRight: '1rem' }}
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><a href="#home" onClick={() => setIsMenuOpen(false)}>{t.home}</a></li>
          <li><a href="#about" onClick={() => setIsMenuOpen(false)}>{t.about}</a></li>
          <li><a href="#strength" onClick={() => setIsMenuOpen(false)}>{t.strength}</a></li>
          <li><a href="#products" onClick={() => setIsMenuOpen(false)}>{t.products}</a></li>
          <li><a href="#quality" onClick={() => setIsMenuOpen(false)}>{t.quality}</a></li>
          <li><a href="#clients" onClick={() => setIsMenuOpen(false)}>{t.clients}</a></li>
          <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>{t.contact}</a></li>
          <li style={{ marginTop: '1rem' }}>
            <button
              onClick={() => { setLang(lang === 'en' ? 'mr' : 'en'); setIsMenuOpen(false); }}
              style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', color: 'var(--text-primary)', cursor: 'pointer', padding: '8px 20px', borderRadius: '8px', width: '100%' }}
            >
              Switch to {lang === 'en' ? 'मराठी (Marathi)' : 'English'}
            </button>
          </li>
        </ul>
      </div>

      {/* Hero Section */}
      <section id="home" className="hero" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=2560&auto=format&fit=crop)' }}>
        <div className="container">
          <div className="hero-content">
            <div className="badge animate-fade-in">Est. 2011</div>
            <h1 className="hero-title animate-fade-in delay-100">
              {t.heroTitle}
            </h1>
            <p className="hero-desc animate-fade-in delay-200">
              {t.heroDesc}
            </p>
            <div className="hero-actions animate-fade-in delay-300">
              <a href="#about" className="btn btn-primary">
                {t.discover} <ArrowRight size={18} />
              </a>
              <a href="brochure.pdf" download="DK_Techno_Brochure.pdf" type="application/pdf" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Upload size={18} style={{ transform: 'rotate(180deg)' }} /> {t.download}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner Section */}
      <section style={{ background: 'var(--bg-glass-heavy)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)', padding: '3rem 0', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem', textAlign: 'center' }}>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: '1' }}>
                <AnimatedCounter target={yearsOfExcellence} suffix="+" />
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem', fontWeight: '500' }}>Years of Excellence</div>
            </div>
            <div style={{ width: '1px', background: 'var(--border-glass)' }}></div>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: '1' }}>
                <AnimatedCounter target={25} suffix="+" />
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem', fontWeight: '500' }}>Skilled Employees</div>
            </div>
            <div style={{ width: '1px', background: 'var(--border-glass)' }}></div>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: '1' }}>
                <AnimatedCounter target={10} suffix="k+" />
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem', fontWeight: '500' }}>Projects Completed</div>
            </div>
            <div style={{ width: '1px', background: 'var(--border-glass)' }}></div>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: '1' }}>
                <AnimatedCounter target={100} suffix="%" />
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem', fontWeight: '500' }}>Satisfied Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1565153158-ebc3587e5967?q=80&w=2560&auto=format&fit=crop)' }}>
        <div className="container">
          <div className="grid">
            <div className="glass-panel reveal fade-left">
              <h2 className="section-title">About Us</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <span className="badge">EST. 2011</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--brand-cyan)' }}>Excellence in Precision Machining & Fabrication</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '1.05rem' }}>
                Specializing in precision machining of bar, forging, casting, press components, and sheet metal parts. Delivering uncompromised quality through state-of-the-art technology.
              </p>
            </div>

            <div className="reveal fade-right">
              <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', height: '100%' }}>
                <div className="glass-panel stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Founded by</h4>
                  <p style={{ color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--brand-cyan)' }}>Mrs. Kanta Eknath Gaikwad</strong>, D. K. Techno Industries has grown into a trusted name in precision engineering.</p>
                </div>
                <div className="glass-panel stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                    <AnimatedCounter target={100} suffix="%" />
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem', fontWeight: '500' }}>Satisfied Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strength Section */}
      <section id="strength" className="section" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2560&auto=format&fit=crop)' }}>
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">Strength</h2>
            <p className="section-subtitle">
              Comprehensive manufacturing processes equipped with advanced machinery to meet exact client specifications.
            </p>
          </div>

          {/* Desktop View: Grid */}
          <div className="desktop-only reveal-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass-panel reveal" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <Factory size={28} className="brand-accent" />
                <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>Machining & Fabrication</h3>
              </div>
              <ul className="spec-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Manufacturing Business Processes</span></li>
                <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Machined Components</span></li>
                <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Bar, Forging, Casting & Press Components</span></li>
                <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Sheet Metal Parts & Fabricated Assemblies</span></li>
              </ul>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <ShieldCheck size={28} className="brand-accent" />
                <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>Specialized Processes & Support</h3>
              </div>
              <ul className="spec-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Welding Assembly, Traub, Drill & Cutting Processes</span></li>
                <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>CMM Inspection & NABL Calibration Labs</span></li>
                <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Material Test & Mill TC Reporting</span></li>
              </ul>
            </div>
          </div>

          {/* Mobile View: Combined List */}
          <div className="mobile-only glass-panel reveal" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <Factory size={28} className="brand-accent" />
              <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>Comprehensive Manufacturing</h3>
            </div>
            <ul className="spec-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Manufacturing Business Processes</span></li>
              <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Machined Components</span></li>
              <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Bar, Forging, Casting & Press Components</span></li>
              <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Sheet Metal Parts & Fabricated Assemblies</span></li>
              <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Welding Assembly, Traub, Drill & Cutting Processes</span></li>
              <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>CMM Inspection & NABL Calibration Labs</span></li>
              <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Material Test & Mill TC Reporting</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="section" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2560&auto=format&fit=crop)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <h2 className="section-title">Our Products & Services</h2>
            <p className="section-subtitle">
              Comprehensive machinery strength and precision-engineered products.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem', overflow: 'visible' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <Cpu size={28} className="brand-accent" />
              <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>Machinery Strength</h3>
            </div>

            {/* Desktop: 3D Carousel | Mobile: Horizontal Scroll */}
            <div className="desktop-only">
              <ThreeDCarousel 
                items={[
                  { name: "VMC 4th Axis", desc: "Equipped with high-precision 4th axis rotary tables for complex multi-sided machining of aerospace and medical components.", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop" },
                  { name: "CNC Turning", desc: "High-speed precision CNC turning centers capable of maintaining tolerances up to 5 microns for critical shafts and bushings.", img: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=1200&auto=format&fit=crop" },
                  { name: "M1TR Machine", desc: "Versatile tool-room milling machines for specialized prototype development, fixture manufacturing, and precision secondary operations.", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop" },
                  { name: "Centerless Grinding", desc: "Specialized grinding services for high-volume cylindrical components, ensuring perfect roundness and superior surface finishes.", img: "/images/centerless-grinding.jpg" },
                  { name: "Radial Drilling", desc: "Heavy-duty radial arm drilling machines capable of drilling, tapping, and boring large, heavy workpieces with extreme accuracy and stability.", img: "/images/radial-drilling.jpg" },
                  { name: "CO2 Welding", desc: "Industrial-grade CO2 (MIG) welding stations ensuring strong, deep-penetrating, and clean welds for heavy structural fabrication and intricate assembly work.", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1200&auto=format&fit=crop" },
                  { name: "Band Saw Cutting", desc: "Automated and manual band saw cutting machinery for precise, clean, and rapid sizing of raw material stock before the primary machining processes begin.", img: "/images/band-saw-cutting.jpg" }
                ]} 
                onPreview={(item, index, array) => { setPreviewItem(item); setPreviewIndex(index); setCurrentGallery(array); }}
              />
            </div>

            <div className="mobile-only">
              <ul style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', listStyle: 'none', scrollSnapType: 'x mandatory' }}>
                {[
                  { name: "VMC 4th Axis", desc: "Equipped with high-precision 4th axis rotary tables.", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop" },
                  { name: "CNC Turning", desc: "High-speed precision CNC turning centers.", img: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=1200&auto=format&fit=crop" },
                  { name: "M1TR Machine", desc: "Versatile tool-room milling machines.", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop" },
                  { name: "Centerless Grinding", desc: "High-volume cylindrical grinding.", img: "/images/centerless-grinding.jpg" },
                  { name: "Radial Drilling", desc: "Heavy-duty radial arm drilling.", img: "/images/radial-drilling.jpg" },
                  { name: "CO2 Welding", desc: "Industrial-grade CO2 welding.", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1200&auto=format&fit=crop" },
                  { name: "Band Saw Cutting", desc: "Automated sizing of raw material.", img: "/images/band-saw-cutting.jpg" }
                ].map((machine, index, array) => (
                  <li 
                    key={index} 
                    className="glass-panel"
                    style={{ minWidth: '280px', padding: '1rem', scrollSnapAlign: 'start' }}
                    onClick={() => { setPreviewItem(machine); setPreviewIndex(index); setCurrentGallery(array); }}
                  >
                    <img src={machine.img} alt={machine.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
                    <h4 style={{ color: 'var(--brand-cyan)', marginBottom: '0.5rem' }}>{machine.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{machine.desc}</p>
                  </li>
                ))}
              </ul>
              <div className="swipe-indicator" style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                 ← Swipe to explore →
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)', textAlign: 'center' }}>Featured Products</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              { name: "Precision Machined Components", desc: "Custom CNC machined parts crafted to exact dimensional tolerances for critical engineering applications.", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop" },
              { name: "Custom Forged Parts", desc: "High-strength forged metal components designed to withstand intense mechanical stress.", img: "/images/custom_forged_parts.png" },
              { name: "Fabricated Assemblies", desc: "Complete structural assemblies fabricated and welded to precise blueprint specifications.", img: "/images/Fabricated-Assemblies.jpg" },
              { name: "Sheet Metal Pressings", desc: "Accurately formed sheet metal components for structural and aesthetic use cases.", img: "/images/sheet_metal_pressing.jpg" },
              { name: "Heavy Duty Brackets", desc: "Durable and reliable brackets engineered for heavy industrial machinery.", img: "/images/heavy-duty-brackets.jpg" },
              { name: "Hydraulic Fittings", desc: "Leak-proof custom hydraulic fittings manufactured with exacting thread tolerances.", img: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=1200&auto=format&fit=crop" },
              { name: "Cast Machine Bases", desc: "Solid cast foundations providing stability and vibration damping for large equipment.", img: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=1200&auto=format&fit=crop" },
              { name: "Welded Structures", desc: "Complex multi-piece welded structures for robust industrial load-bearing applications.", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1200&auto=format&fit=crop" },
              { name: "Custom Solutions", desc: "Bespoke products engineered and manufactured entirely based on specific customer requirements and blueprints.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop" }
            ].map((product, index, array) => (
              <div 
                key={index} 
                className="glass-panel tilt-card" 
                style={{ cursor: 'pointer', padding: 0, overflow: 'hidden' }}
                onClick={() => { setPreviewItem(product); setPreviewIndex(index); setCurrentGallery(array); }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--brand-cyan)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,180,216,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-glass)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                </div>
                <div style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'rgba(0,180,216,0.1)', padding: '8px', borderRadius: '8px' }}>
                    <Target size={20} className="brand-accent" />
                  </div>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '1rem' }}>{product.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mobile-only swipe-indicator">
            <span className="swipe-indicator-arrow"><ChevronLeft size={16} /></span>
            Swipe to explore
            <span className="swipe-indicator-arrow"><ChevronRight size={16} /></span>
          </div>
        </div>
      </section>

      {/* Quality Management Section */}
      <section id="quality" className="section" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2560&auto=format&fit=crop)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Quality Management Principles</h2>
            <p className="section-subtitle">
              Our operations are guided by a strict adherence to fundamental quality management principles, ensuring consistency and excellence in every component we deliver.
            </p>
          </div>

          {/* Desktop View: Grid */}
          <div className="desktop-only" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { title: "Customer Focus", icon: <Target size={24} /> },
              { title: "Leadership", icon: <Award size={24} /> },
              { title: "Involvement of People", icon: <Users size={24} /> },
              { title: "Process Approach", icon: <Zap size={24} /> },
              { title: "Systematic Approach to Management", icon: <Briefcase size={24} /> },
              { title: "Continual Improvements", icon: <BarChart size={24} /> },
              { title: "Factual Approach to Decision Making", icon: <CheckCircle2 size={24} /> },
              { title: "Mutually Beneficial Relationship", icon: <Network size={24} /> },
              { title: "Use of Required Measuring Instrument", icon: <ShieldCheck size={24} /> }
            ].map((principle, index) => (
              <div key={index} className="glass-panel reveal" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', padding: '1.5rem' }}>
                <div style={{ color: 'var(--accent-blue)', background: 'rgba(0, 112, 243, 0.1)', padding: '10px', borderRadius: '10px' }}>
                  {principle.icon}
                </div>
                <div style={{ alignSelf: 'center' }}>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: '600', margin: 0 }}>{principle.title}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View: Combined List */}
          <div className="mobile-only glass-panel" style={{ padding: '2rem' }}>
            <ul className="spec-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: 0 }}>
              <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Customer Focus</span></li>
              <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Leadership</span></li>
              <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Involvement of People</span></li>
              <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Process Approach</span></li>
              <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Systematic Approach to Management</span></li>
              <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Continual Improvements</span></li>
              <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Factual Approach to Decision Making</span></li>
              <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Mutually Beneficial Relationship</span></li>
              <li style={{ alignItems: 'flex-start' }}><CheckCircle2 size={18} className="brand-accent" style={{ marginTop: '4px', flexShrink: 0 }} /> <span style={{ color: 'var(--text-secondary)' }}>Use of Required Measuring Instrument</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="section" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2560&auto=format&fit=crop)' }}>
        <div className="container" style={{ paddingBottom: '0', flexGrow: 0 }}>
          <div className="section-header">
            <h2 className="section-title">OUR CUSTOMERS</h2>
            <p className="section-subtitle">
              From startups to global enterprises, we are proud to serve customers who trust us for quality, reliability, and innovation. Together, we build partnerships that drive growth and success.
            </p>
          </div>
        </div>

        {/* Full-width Marquee Area */}
        <div className="marquee-container" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', zIndex: 1 }}>
          <div className="marquee-track">
            {[
              { name: "Montanari Group", logo: null },
              { name: "Hindustan Pressings", logo: null },
              { name: "Metamorphosis", logo: null },
              { name: "Fori Automation", logo: null },
              { name: "Jaguar Coating", logo: null },
              { name: "Kajaria Ceramics", logo: null },
              { name: "ADCL FAFECO", logo: null },
              { name: "Parulekar Patterns", logo: null },
              { name: "Montanari Group", logo: null },
              { name: "Hindustan Pressings", logo: null },
              { name: "Metamorphosis", logo: null },
              { name: "Fori Automation", logo: null },
              { name: "Jaguar Coating", logo: null },
              { name: "Kajaria Ceramics", logo: null },
              { name: "ADCL FAFECO", logo: null },
              { name: "Parulekar Patterns", logo: null }
            ].map((client, index) => (
              <div key={index} className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', height: '100px', minWidth: '240px', padding: '1rem 1.5rem', background: 'var(--bg-glass-heavy)', border: '1px solid var(--border-glass)', borderRadius: '8px', flexShrink: 0, transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 180, 216, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}>
                {client.logo && (
                  <img 
                    src={client.logo} 
                    alt={`${client.name} Logo`}
                    style={{ width: '40px', height: '40px', objectFit: 'contain', background: 'transparent', borderRadius: '4px' }}
                  />
                )}
                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: '700', margin: 0, textAlign: 'center', fontFamily: 'var(--font-heading)', whiteSpace: 'nowrap' }}>{client.name}</h4>
              </div>
            ))}
          </div>
        </div>
        <div className="mobile-only swipe-indicator" style={{ marginTop: '20px' }}>
          <span className="swipe-indicator-arrow"><ChevronLeft size={16} /></span>
          Swipe to view more
          <span className="swipe-indicator-arrow"><ChevronRight size={16} /></span>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section" style={{ 
        backgroundImage: 'linear-gradient(rgba(10, 17, 40, 0.4), rgba(10, 17, 40, 0.6)), url(https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2560&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderTop: '1px solid var(--border-glass)',
        borderBottom: '1px solid var(--border-glass)'
      }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Client Testimonials</h2>
            <p className="section-subtitle">What our partners say about our precision and commitment.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { company: "Montanari Group", text: "D. K. Techno Industries has consistently delivered high-precision components that meet our rigorous standards. Their attention to detail is unmatched." },
              { company: "Fori Automation", text: "Reliable partner for complex fabrication. Their ability to handle difficult geometries and maintain tight tolerances is impressive." },
              { company: "Hindustan Pressings", text: "Exceptional quality management and professional communication. They feel like an extension of our own manufacturing team." }
            ].map((t, i) => (
              <div key={i} className="glass-panel reveal" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', color: '#ffd700', gap: '2px' }}>
                  {[...Array(5)].map((_, starI) => <span key={starI}>★</span>)}
                </div>
                <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: '1.6' }}>"{t.text}"</p>
                <div style={{ marginTop: 'auto' }}>
                  <h4 style={{ color: 'var(--brand-cyan)', margin: 0, fontSize: '1.1rem' }}>{t.company}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section" style={{ 
        backgroundImage: 'linear-gradient(rgba(10, 17, 40, 0.5), rgba(10, 17, 40, 0.7)), url(https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2560&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div className="container" style={{ maxWidth: '1200px', padding: '0 2rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '4rem', 
            alignItems: 'center'
          }}>
            {/* Left Column: Branding & Info */}
            <div className="reveal">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '50px', height: '2px', background: 'var(--brand-cyan)' }}></div>
                <span style={{ color: 'var(--brand-cyan)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Connect With Us</span>
              </div>
              <h2 style={{ fontSize: '3.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                Let's Build the <span className="brand-accent">Future</span> Together.
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem', maxWidth: '500px' }}>
                Ready to take your manufacturing to the next level? Our engineering team is standing by to discuss your precision requirements and provide a custom quote.
              </p>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="glass-panel" style={{ 
              padding: '2.5rem', 
              background: 'var(--bg-glass-heavy)', 
              border: '1px solid var(--border-glass)',
              width: '100%'
            }}>
              <h3 style={{ fontSize: '1.8rem', margin: 0, marginBottom: '2rem', color: 'var(--text-primary)' }}>Inquiry Form</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} style={{ position: 'absolute', top: '50%', left: '0.85rem', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none', zIndex: 1 }} />
                    <input type="text" name="name" required className="form-control" style={{ paddingLeft: '2.5rem' }} placeholder="Your Name" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Contact no.</label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} style={{ position: 'absolute', top: '50%', left: '0.85rem', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none', zIndex: 1 }} />
                    <input type="tel" name="phone" required className="form-control" style={{ paddingLeft: '2.5rem' }} placeholder="Contact No." />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', top: '50%', left: '0.85rem', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none', zIndex: 1 }} />
                    <input type="email" name="email" required className="form-control" style={{ paddingLeft: '2.5rem' }} placeholder="Email Address" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea name="message" required className="form-control" style={{ minHeight: '120px' }} placeholder="How can we help you?"></textarea>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                    By clicking submit, you agree to our privacy policy and terms.
                  </p>
                </div>

                {formStatus === 'Success' && (
                  <div className="animate-fade-in" style={{ padding: '0.75rem', background: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.3)', color: '#00ff88', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    Thank you! Your message has been sent successfully.
                  </div>
                )}

                {formStatus === 'Error' && (
                  <div className="animate-fade-in" style={{ padding: '0.75rem', background: 'rgba(255, 0, 0, 0.1)', border: '1px solid rgba(255, 0, 0, 0.3)', color: '#ff4444', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    Oops! Something went wrong.
                  </div>
                )}

                <button type="submit" disabled={formStatus === 'Submitting...'} className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}>
                  {formStatus === 'Submitting...' ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="navbar-brand" style={{ marginBottom: '1rem' }}>
                <img src="/logo.png" alt="D. K. Techno Industries Logo" style={{ height: '40px', objectFit: 'contain', background: 'white', borderRadius: '50%', padding: '2px', marginRight: '5px' }} />
                <span style={{ fontSize: '1.2rem' }}>D. K. Techno <span className="brand-accent">Industries</span></span>
              </div>
              <p className="footer-desc" style={{ marginBottom: '2.5rem' }}>
                Pioneers in the field of development and manufacturing of precision engineering components.
              </p>

              <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Quick Links</h4>
              <ul className="footer-links" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <li><a href="#home">• Home</a></li>
                <li><a href="#about">• About Us</a></li>
                <li><a href="#business">• Business & Strength</a></li>
                <li><a href="#products">• Products</a></li>
                <li><a href="#quality">• Equipment</a></li>
                <li><a href="#clients">• Clients</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Get In Touch</h4>
              <ul className="footer-links">
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <Phone size={20} style={{ color: 'var(--text-secondary)' }} />
                  <a href="tel:+919623159111" style={{ color: 'inherit', textDecoration: 'none' }}>+91 96231 59111</a>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <Mail size={20} style={{ color: 'var(--text-secondary)' }} />
                  <a href="mailto:dktechnoindustries@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>dktechnoindustries@gmail.com</a>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <Clock size={20} style={{ color: 'var(--text-secondary)' }} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Mon to Sat 09:00 to 18:00</span>
                </li>
                <li className="address-item">
                  <div className="address-text-row">
                    <MapPin size={20} style={{ marginTop: '4px', color: isAddressHovered ? 'var(--brand-cyan)' : 'var(--text-secondary)', flexShrink: 0, transition: 'color 0.3s ease' }} />
                    <a 
                      href="https://maps.google.com/?q=18.639304888421623,73.8475528956482" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="address-link"
                      onMouseEnter={() => setIsAddressHovered(true)}
                      onMouseLeave={() => setIsAddressHovered(false)}
                      style={{ transition: 'color 0.3s ease', color: isAddressHovered ? 'var(--brand-cyan)' : 'inherit' }}
                    >
                      95/1 Ekant Plaza, Landge Nagar, Bhosari, Pune - 411039. Maharashtra (INDIA).
                    </a>
                  </div>
                  <div className={`map-container ${isAddressHovered ? 'hover-active' : ''}`} style={{ marginTop: '1rem', transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease', transform: isAddressHovered ? 'scale(1.02)' : 'scale(1)', boxShadow: isAddressHovered ? '0 10px 25px rgba(0, 180, 216, 0.25)' : 'none', borderRadius: '8px' }}>
                    <a href="https://maps.google.com/?q=18.639304888421623,73.8475528956482" target="_blank" rel="noopener noreferrer" className="map-box" style={{ borderColor: isAddressHovered ? 'var(--brand-cyan)' : 'var(--border-glass)' }}>
                      <iframe
                        className="map-iframe"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://maps.google.com/maps?width=100%25&amp;height=120&amp;hl=en&amp;q=18.639304888421623,73.8475528956482+(D.%20K.%20Techno%20Industries)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                      </iframe>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p style={{ marginBottom: '0.5rem' }}>&copy; {new Date().getFullYear()} D. K. Techno Industries. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Detailed Item Modal / Lightbox */}
      {previewItem && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.9)', backdropFilter: 'blur(15px)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}
          onClick={() => setPreviewItem(null)}
        >
          {/* Navigation Buttons */}
          <button 
            onClick={(e) => { e.stopPropagation(); const nextIdx = (previewIndex - 1 + currentGallery.length) % currentGallery.length; setPreviewIndex(nextIdx); setPreviewItem(currentGallery[nextIdx]); }}
            style={{ position: 'absolute', left: '20px', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', color: 'white', cursor: 'pointer', padding: '1rem', borderRadius: '50%', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); const nextIdx = (previewIndex + 1) % currentGallery.length; setPreviewIndex(nextIdx); setPreviewItem(currentGallery[nextIdx]); }}
            style={{ position: 'absolute', right: '20px', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', color: 'white', cursor: 'pointer', padding: '1rem', borderRadius: '50%', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ChevronRight size={24} />
          </button>

          <div 
            style={{ position: 'relative', maxWidth: '900px', width: '100%', maxHeight: '90vh', background: 'var(--bg-glass-heavy)', borderRadius: '24px', border: '1px solid var(--border-glass)', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setPreviewItem(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', cursor: 'pointer', padding: '0.6rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 11 }}
            >
              <X size={20} />
            </button>
            <div style={{ width: '100%', height: '500px', overflow: 'hidden', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img 
                src={previewItem.img} 
                alt={previewItem.name} 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', animation: 'scaleIn 0.4s ease' }} 
              />
            </div>
            <div style={{ padding: '2.5rem', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '2rem', color: 'var(--brand-cyan)', margin: 0, fontWeight: '700' }}>{previewItem.name}</h3>
                <span style={{ background: 'var(--bg-glass)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)', border: '1px solid var(--border-glass)' }}>
                  {previewIndex + 1} / {currentGallery.length}
                </span>
              </div>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>{previewItem.desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
