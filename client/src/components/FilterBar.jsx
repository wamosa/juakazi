import React from 'react';

export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Skill"
        value={filters.skill}
        onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
        className="border p-2 rounded w-full md:w-1/3"
      />
      <input
        type="text"
        placeholder="County"
        value={filters.county}
        onChange={(e) => setFilters({ ...filters, county: e.target.value })}
        className="border p-2 rounded w-full md:w-1/3"
      />
    </div>
  );
}