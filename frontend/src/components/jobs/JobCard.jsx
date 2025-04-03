import { Link } from 'react-router-dom'

export default function JobCard({ job }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold mb-2">
            <Link to={`/jobs/${job._id}`} className="text-blue-600 hover:text-blue-700">
              {job.title}
            </Link>
          </h3>
          <p className="text-gray-600 mb-2">{job.company}</p>
          <p className="text-gray-700 mb-4">{job.location}</p>
        </div>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          Rs. {job.salary?.toLocaleString() || 'Negotiable'}
        </span>
      </div>
      <Link 
        to={`/jobs/${job._id}`}
        className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
      >
        View Details →
      </Link>
    </div>
  )
}