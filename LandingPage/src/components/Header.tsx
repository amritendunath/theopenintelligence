import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const CONTACT_FORM_URL = import.meta.env.VITE_CONTACT_FORM_URL;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCompactBrand, setIsCompactBrand] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsCompactBrand(window.scrollY > 28);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-[#F5F1EB]/65 shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-[#F5F1EB]/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 -ml-0.5 sm:ml-0" aria-label="OpenIntelligence home">
            <img src={logo} alt="OpenIntelligence logo" className="h-7 sm:h-7 w-auto sm:mr-0" />
            <span className="relative h-7 w-[190px] sm:w-[230px] overflow-hidden">
              <span
                key={`full-${isCompactBrand ? 'erase' : 'type'}`}
                className={`absolute inset-0 text-lg sm:text-xl font-medium tracking-tight whitespace-nowrap ${
                  isCompactBrand ? 'brand-erase' : 'brand-typewriter'
                }`}
              >
                TheOpenIntell<span className="backwardII">I</span>gence
                {/* NEROSC<span className="backwardII">I</span>ENCE */}
                {/* OpenIntell<span className="backwardII">I</span>gence */}
                {/* OPEN<span className="backwardII">I</span>NTELL<span className="backwardII">I</span>GENCE */}
              </span>
              <span
                key={`oi-${isCompactBrand ? 'type' : 'hide'}`}
                className={`absolute inset-0 text-lg sm:text-xl font-medium whitespace-nowrap ${
                  isCompactBrand ? 'brand-typewriter-oi' : 'opacity-0'
                }`}
              >
                T<span className='-ml-0.5'>O</span><span className="backwardI">I</span>
                {/* N<span className="backwardI">I</span> */}
                {/* OI */}
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <a href="/#about" className="text-[13px] font-medium text-gray-700 hover:text-gray-900">About</a>
            <a href="/#differentiators" className="text-[13px] font-medium text-gray-700 hover:text-gray-900">How We Differ</a>
            <a href="/#case-studies" className="text-[13px] font-medium text-gray-700 hover:text-gray-900">Case Studies</a>
            <Link to="/insights" className="text-[13px] font-medium text-gray-700 hover:text-gray-900">Insights</Link>
            <a href="/#requirements" className="text-[13px] font-medium text-gray-700 hover:text-gray-900">Requirements & Pricing</a>
            <a href="/#agreements" className="text-[13px] font-medium text-gray-700 hover:text-gray-900">Agreements</a>
            <a
              href={CONTACT_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-black text-white px-4 py-2 rounded text-[13px] font-medium hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
            >
              Contact Us
            </a>
          </div>

          <button
            className="md:hidden p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-200">
            <a href="/#about" className="block text-sm font-medium text-gray-700">About</a>
            <a href="/#differentiators" className="block text-sm font-medium text-gray-700">How We Differ</a>
            <a href="/#case-studies" className="block text-sm font-medium text-gray-700">Case Studies</a>
            <Link to="/insights" className="block text-sm font-medium text-gray-700">Insights</Link>
            <a href="/#requirements" className="block text-sm font-medium text-gray-700">Requirements & Pricing</a>
            <a href="/#agreements" className="block text-sm font-medium text-gray-700">Agreements</a>
            <a
              href={CONTACT_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="block text-center w-full bg-black text-white px-4 py-2 rounded text-sm font-medium"
            >
              Contact Us
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
