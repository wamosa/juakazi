import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">JuaKazi</Link>
      <nav>
        <Link to="/login" className="mr-4">Login</Link>
      </nav>
    </header>
  );
}
