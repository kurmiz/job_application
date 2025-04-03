import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error('Error fetching job:', err);
      }
      setLoading(false);
    };
    fetchJob();
  }, [id]);

  if (loading) return <div className="text-center py-12"><div className="loading-spinner mx-auto" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {job.company}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              {job.location}
            </span>
            {job.salary && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                Rs. {job.salary.toLocaleString()}/month
              </span>
            )}
          </div>
          
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-2">Job Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}