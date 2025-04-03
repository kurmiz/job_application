import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs/employer');
        setJobs(res.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
      setLoading(false);
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Your Job Postings</h1>
        {/* Display employer's jobs */}
      </div>
    </div>
  );
}