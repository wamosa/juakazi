import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4 text-sm">
      &copy; {new Date().getFullYear()} JuaKazi. All rights reserved.
    </footer>
  );
}