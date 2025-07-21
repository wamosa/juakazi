// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import WorkerCard from '../components/WorkerCard';
import { getWorkers } from '../services/api';

export default function Home() {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [filters, setFilters] = useState({ skill: '', county: '' });

  // Fetch all workers on mount
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await getWorkers();
        setWorkers(data);
        setFilteredWorkers(data);
      } catch (err) {
        console.error('Error fetching workers:', err);
      }
    };
    fetchWorkers();
  }, []);

  // Handle search
  const handleSearch = (query) => {
    const q = query.toLowerCase();
    const results = workers.filter((worker) =>
      worker.name.toLowerCase().includes(q) ||
      worker.skill.toLowerCase().includes(q) ||
      worker.county.toLowerCase().includes(q)
    );
    setFilteredWorkers(results);
  };

  // Handle filter
  useEffect(() => {
    const results = workers.filter((worker) => {
      const matchSkill = filters.skill ? worker.skill.toLowerCase().includes(filters.skill.toLowerCase()) : true;
      const matchCounty = filters.county ? worker.county.toLowerCase().includes(filters.county.toLowerCase()) : true;
      return matchSkill && matchCounty;
    });
    setFilteredWorkers(results);
  }, [filters, workers]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Available Workers</h1>
        <SearchBar onSearch={handleSearch} />
        <FilterBar filters={filters} setFilters={setFilters} />

        <div className="flex flex-wrap gap-4">
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker) => (
              <WorkerCard key={worker._id} worker={worker} />
            ))
          ) : (
            <p>No workers found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
