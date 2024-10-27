import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell, User, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#022424] border-b border-[#03ffc3]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-[#03ffc3] text-xl font-bold">
            GreenCabal
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6">
                <Link 
                  to="/community" 
                  className="text-[#03ffc3] hover:text-[#00ff3f] transition-colors"
                >
                  Community
                </Link>
                <Link 
                  to="/dashboard" 
                  className="text-[#03ffc3] hover:text-[#00ff3f] transition-colors"
                >
                  Dashboard
                </Link>
              </div>
              <button className="text-[#03ffc3] hover:text-[#00ff3f] transition-colors">
                <Bell size={20} />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-[#03ffc3] hover:text-[#00ff3f] transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="hidden md:flex items-center gap-4">
                <Link to="/profile">
                  <User size={20} className="text-[#03ffc3] hover:text-[#00ff3f] transition-colors" />
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="text-[#03ffc3] hover:text-[#00ff3f] transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/signin"
                className="text-[#03ffc3] hover:text-[#00ff3f] transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-[#00ff3f] text-[#022424] rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          {isAuthenticated && isMenuOpen && (
            <div className="absolute top-16 right-0 left-0 bg-[#022424] border-b border-[#03ffc3]/20 p-4 md:hidden">
              <div className="flex flex-col gap-4">
                <Link 
                  to="/community" 
                  className="text-[#03ffc3] hover:text-[#00ff3f] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Community
                </Link>
                <Link 
                  to="/dashboard" 
                  className="text-[#03ffc3] hover:text-[#00ff3f] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile"
                  className="text-[#03ffc3] hover:text-[#00ff3f] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    navigate('/');
                    setIsMenuOpen(false);
                  }}
                  className="text-[#03ffc3] hover:text-[#00ff3f] transition-colors text-left"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;