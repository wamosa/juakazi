import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkerById, updateWorker, deleteWorker } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function WorkerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    skill: '',
    county: '',
    contact: '',
  });

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const cleanId = id?.replace(/['"]/g, ''); // remove quotes if accidentally included
        const data = await getWorkerById(cleanId);
        setWorker(data);
        setFormData({
          name: data.name || '',
          skill: data.skill || '',
          county: data.county || '',
          contact: data.contact || '',
        });
      } catch (error) {
        console.error('Error fetching worker:', error);
        alert('Failed to load worker. Please try again later.');
      }
    };

    fetchWorker();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const updated = await updateWorker(id, formData);
      setWorker(updated);
      setIsEditing(false);
      alert('Worker updated successfully');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update worker');
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this worker?');
    if (!confirm) return;

    try {
      await deleteWorker(id);
      alert('Worker deleted');
      navigate('/');
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete worker');
    }
  };

  if (!worker) return <div className="text-center p-4">Loading worker profile...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4 max-w-2xl">
        <h2 className="text-3xl font-bold mb-6">Worker Profile</h2>

        {worker.photoUrl && (
          <img
            src={worker.photoUrl}
            alt={worker.name}
            className="w-40 h-40 object-cover rounded-full mb-4"
          />
        )}

        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Full Name"
            />
            <input
              type="text"
              name="skill"
              value={formData.skill}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Skill"
            />
            <input
              type="text"
              name="county"
              value={formData.county}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="County"
            />
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Contact Info"
            />
            <div className="flex gap-4">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-lg">
            <p><strong>Name:</strong> {worker.name}</p>
            <p><strong>Skill:</strong> {worker.skill}</p>
            <p><strong>County:</strong> {worker.county}</p>
            <p><strong>Contact:</strong> {worker.contact}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
