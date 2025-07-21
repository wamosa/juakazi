import React from 'react';
import { Link } from 'react-router-dom';

export default function WorkerCard({ worker }) {
  return (
    <div className="border rounded shadow-sm p-4 w-full md:w-1/3 lg:w-1/4">
      <img
        src={worker.photo}
        alt={worker.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-bold mt-2">{worker.name}</h3>
      <p>{worker.skill}</p>
      <p className="text-sm text-gray-600">{worker.county}</p>
      <Link to={`/worker/${worker._id}`} className="text-blue-600 text-sm underline">
        View Profile
      </Link>
    </div>
  );
}