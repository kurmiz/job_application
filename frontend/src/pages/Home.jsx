import { useEffect, useState } from 'react'
import JobCard from '../components/jobs/JobCard'
import api from '../api/axios'

export default function Home() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs');
        setJobs(response.data);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Latest Jobs in Bhairahawa</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p>Loading jobs...</p>
          ) : jobs.length > 0 ? (
            jobs.map(job => <JobCard key={job._id} job={job} />)
          ) : (
            <p>No jobs available at the moment</p>
          )}
        </div>
      </div>
    </div>
  )
}