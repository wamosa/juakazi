import React, { useEffect, useState } from 'react';
import { getWorkers } from '../services/api';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import WorkerCard from '../components/WorkerCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Footer from '../components/Footer';
import { Link, animateScroll as scroll } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Home() {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [filters, setFilters] = useState({ skill: '', county: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen , setIsMenuOpen] =  useState(false);

    const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  useEffect(() => {
  const handleStorageChange = () => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  };

  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}, []);

 

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await getWorkers();
        setWorkers(data);
        setFilteredWorkers(data);
      } catch (err) {
        setError('Failed to fetch workers');
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  const handleSearch = (query) => {
    const q = query.toLowerCase();
    const results = workers.filter((worker) =>
      worker.name.toLowerCase().includes(q) ||
      worker.skill.toLowerCase().includes(q) ||
      worker.county.toLowerCase().includes(q)
    );
    setFilteredWorkers(results);
  };

  useEffect(() => {
    const results = workers.filter((worker) => {
      const matchSkill = filters.skill ? worker.skill.toLowerCase().includes(filters.skill.toLowerCase()) : true;
      const matchCounty = filters.county ? worker.county.toLowerCase().includes(filters.county.toLowerCase()) : true;
      return matchSkill && matchCounty;
    });
    setFilteredWorkers(results);
  }, [filters, workers]);

  return (
    <div className="min-h-screen flex flex-col bg-yellow-50 text-gray-900 scroll-smooth">
      <Helmet>
        <title>Find Skilled Workers - JuaKazi</title>
        <meta name="description" content="Search skilled and verified workers in Kenya." />
      </Helmet>

      {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md fixed w-full top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-800">JuaKazi</h1>
        
        {/* Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-blue-800 text-2xl focus:outline-none">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-blue-800">
          <Link to="hero" className="hover:text-yellow-500">Home</Link>
          <Link to="why" className="hover:text-yellow-500">Login / Register</Link>
          <Link to="categories" className="hover:text-yellow-500">Browse Workers</Link>
          <Link to="cta" className="hover:text-yellow-500">Contact</Link>
        </div>
      </nav>
       {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-16 left-0 w-full z-40 shadow-lg px-6 py-4 space-y-4">
          <Link onClick={toggleMenu} to="hero" className="block text-blue-800 hover:text-yellow-500">Home</Link>
          <Link onClick={toggleMenu} to="why" className="block text-blue-800 hover:text-yellow-500">Login / Register</Link>
          <a onClick={toggleMenu} href="categories" className="block text-blue-800 hover:text-yellow-500">Browse Workers</a>
          <a onClick={toggleMenu} href="cta" className="block text-blue-800 hover:text-yellow-500">Contact</a>
        </div>
      )}
    

      {/* Hero Section with image */}
      <motion.section
        id="hero"
        className="bg-cover bg-center py-16 px-4 text-center text-blue"
        style={{ backgroundImage: `url('/images/hero-banner.jpg')` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">Welcome to JuaKazi</h2>
        <p className="text-lg max-w-2xl mx-auto drop-shadow">
          Discover trusted, skilled local fundis, tailors, welders and more near you.
        </p>
      </motion.section>

      {/* Why Section */}
      <motion.section id="why" className="py-10 px-4 bg-blue-100 text-center" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-blue-900 mb-2">Why JuaKazi?</h2>
          <p className="text-blue-950">
            Kenya has thousands of skilled individuals who struggle to reach clients. JuaKazi bridges the gap by offering visibility, reviews, and contact tools to connect them with customers who need them.
          </p>
        </div>
      </motion.section>

      {/* Categories Section */}
      <section className="py-10 px-4 bg-yellow-100 text-center" id="categories">
        <h2 className="text-xl font-bold mb-6 text-blue-900">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {["Fundis", "Tailors", "Plumbers", "Welders"].map((cat) => (
            <div key={cat} className="bg-white p-4 shadow rounded-lg hover:scale-105 transition">
              <p className="text-blue-800 font-semibold">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Search Section */}
      <section id="search" className="flex-1 container mx-auto px-4 py-8 bg-white">
        {isLoggedIn ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <SearchBar onSearch={handleSearch} />
            <FilterBar filters={filters} setFilters={setFilters} />
          </div>
        ) : (
          <p className="text-center text-blue-800 font-medium mb-4">
            Please <a href="/login" className="underline text-blue-900">log in</a> to search and filter workers.
          </p>
        )}

        {loading ? (
          <p className="text-center text-blue-900">Loading workers...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : filteredWorkers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredWorkers.map((worker) => (
              <motion.div
                key={worker._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <WorkerCard worker={worker} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-blue-700">No workers found.</p>
        )}
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-blue-900 py-10 text-center text-yellow-100">
        <h3 className="text-2xl font-semibold mb-2">Are you a skilled worker?</h3>
        <p className="mb-4">Join JuaKazi and grow your customer base online.</p>
        <a
          href="/login"
          className="bg-yellow-300 text-blue-900 px-6 py-2 rounded-full hover:bg-yellow-400 transition duration-300"
        >
          Register Now
        </a>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 bg-white text-center" id="testimonials">
        <h2 className="text-xl font-bold mb-6 text-blue-900">What Clients Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[
            { name: "Amina", feedback: "JuaKazi helped me find a fundi in minutes!" },
            { name: "James", feedback: "Fast, reliable, and trustworthy platform." },
            { name: "Winnie", feedback: "Highly recommend for anyone needing skilled work!" },
          ].map((t) => (
            <div key={t.name} className="bg-yellow-50 p-6 rounded shadow">
              <p className="italic text-blue-950">"{t.feedback}"</p>
              <p className="mt-2 font-bold text-blue-900">- {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
