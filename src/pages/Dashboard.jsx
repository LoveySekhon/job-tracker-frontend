import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");



  const [editingJobId, setEditingJobId] = useState(null);


  const token = localStorage.getItem("token");

  const fetchJobs = async (currentPage = 1) => {
  try {
    let url = `https://job-tracker-backend-gf6p.onrender.com/api/jobs?page=${currentPage}&limit=3`;

    if (statusFilter) {
      url += `&status=${statusFilter}`;
    }

    if (searchQuery) {
      url += `&search=${searchQuery}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setJobs(response.data.jobs);
    setTotalPages(response.data.totalPages);
    setPage(response.data.page);
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};




  useEffect(() => {
  if (!token) {
    navigate("/");
    return;
  }

  fetchJobs(page);
}, [page, statusFilter, searchQuery]);




  const handleAddJob = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://job-tracker-backend-gf6p.onrender.com/api/jobs",
        {
          company: e.target.company.value,
          position: e.target.position.value,
          status: e.target.status.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job added!");

      e.target.reset();     // clear form
      fetchJobs();          // re-fetch without reload
    } catch (error) {
      console.error(error);
      alert("Failed to add job");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8"
>
  <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded shadow">
  <h1 className="text-2xl font-bold text-blue-600">
    Job Tracker
  </h1>

  <button
    onClick={() => {
      localStorage.removeItem("token");
      navigate("/");
    }}
    className="bg-red-500 text-white px-4 py-2 rounded transition hover:bg-red-600 hover:scale-105 duration-200"
  >
    Logout
  </button>
</div>

        <div className="mb-6 flex flex-wrap items-center gap-4">

  {/* Status Filter */}
  <div>
    <label className="font-bold mr-2">Filter:</label>
    <select
      value={statusFilter}
      onChange={(e) => {
        setStatusFilter(e.target.value);
        setPage(1);
      }}
      className="p-2 border rounded"
    >
      <option value="">All</option>
      <option value="Applied">Applied</option>
      <option value="Interview">Interview</option>
      <option value="Offer">Offer</option>
      <option value="Rejected">Rejected</option>
    </select>
  </div>

  {/* Search */}
  <div>
    <input
      type="text"
      placeholder="Search by company..."
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        setPage(1);
      }}
      className="p-2 border rounded"
    />
  </div>

</div>



      <button
        onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
        }}
        className="bg-red-600 text-white px-4 py-2 rounded transition duration-200 hover:bg-red-700 hover:scale-105"

     >
        Logout
      </button>


      <form
        onSubmit={handleAddJob}
        className="bg-white p-6 rounded shadow mb-6"
      >
        <h2 className="text-xl font-bold mb-4">Add New Job</h2>

        <input
          name="company"
          placeholder="Company"
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          name="position"
          placeholder="Position"
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <select
          name="status"
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded transition duration-200 hover:bg-blue-700 hover:scale-105"

        >
          Add Job
        </button>
      </form>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
  key={job.id}
  className="bg-white p-5 rounded-xl shadow-md transition transform hover:shadow-xl hover:-translate-y-1 duration-300"
>


  {editingJobId === job.id ? (
    <>
      <input
        defaultValue={job.company}
        className="w-full mb-2 p-2 border rounded"
        onChange={(e) => job.company = e.target.value}
      />

      <input
        defaultValue={job.position}
        className="w-full mb-2 p-2 border rounded"
        onChange={(e) => job.position = e.target.value}
      />

      <select
        defaultValue={job.status}
        className="w-full mb-2 p-2 border rounded"
        onChange={(e) => job.status = e.target.value}
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <button
        onClick={async () => {
          try {
            await axios.put(
              `https://job-tracker-backend-gf6p.onrender.com/api/jobs/${job.id}`,
              {
                company: job.company,
                position: job.position,
                status: job.status,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setEditingJobId(null);
            fetchJobs(page);
          } catch (error) {
            console.error("Update failed", error);
          }
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded transition duration-200 hover:bg-blue-700 hover:scale-105"

      >
        Save
      </button>

      <button
        onClick={() => setEditingJobId(null)}
        className="bg-red-600 text-white px-4 py-2 rounded transition duration-200 hover:bg-red-700 hover:scale-105"

      >
        Cancel
      </button>
    </>
  ) : (
    <>
      <h2 className="font-bold">{job.company}</h2>
      <p>{job.position}</p>
      <p className="text-sm text-gray-600">
        Status: {job.status}
      </p>

      <button
        onClick={() => setEditingJobId(job.id)}
        className="bg-yellow-600 text-white px-4 py-2 rounded transition duration-200 hover:bg-yellow-700 hover:scale-105"

      >
        Edit
      </button>

      <button
        onClick={async () => {
          try {
            await axios.delete(
              `https://job-tracker-backend-gf6p.onrender.com/api/jobs/${job.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            fetchJobs(page);
          } catch (error) {
            console.error("Delete failed", error);
          }
        }}
        className="bg-red-600 text-white px-4 py-2 rounded transition duration-200 hover:bg-red-700 hover:scale-105"

      >
        Delete
      </button>
    </>
  )}

</div>

          ))}
        </div>
      )}  
      {totalPages > 1 && (
  <div className="flex justify-center items-center mt-6 gap-4">
    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className="bg-blue-600 text-white px-4 py-2 rounded transition duration-200 hover:bg-blue-700 hover:scale-105"

    >
      Previous
    </button>

    <span className="font-bold">
      Page {page} of {totalPages}
    </span>

    <button
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
      className="bg-blue-600 text-white px-4 py-2 rounded transition duration-200 hover:bg-blue-700 hover:scale-105"
    >
      Next
    </button>
  </div>
)}
    </div>
    </div>

  );
}

export default Dashboard;
