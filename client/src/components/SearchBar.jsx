import React from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = React.useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(query);
      }}
      className="flex items-center gap-2 mb-4"
    >
      <input
        type="text"
        placeholder="Search by skill or county"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-full md:w-1/2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}