"use client";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");

  // Projects load karne ka function
  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    if (!projectName) return alert("Ass project");
    
    const res = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({ name: projectName }),
    });

    if (res.ok) {
      setProjectName("");
      fetchProjects(); // List update karo
      alert("Project is ready!");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">Manager Dashboard</h1>
        <button onClick={() => signOut()} className="text-red-500">Logout</button>
      </div>

      {/* Admin Section */}
      {session?.user?.role === "ADMIN" && (
        <div className="mb-10 p-6 border rounded-xl bg-gray-50">
          <h2 className="text-lg font-bold mb-4">Create New Project (Admin Only)</h2>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Project Name" 
              className="border p-2 flex-1 rounded"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <button 
              onClick={handleCreateProject}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Project
            </button>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div>
        <h2 className="text-xl font-bold mb-4">All Projects</h2>
        <div className="grid gap-4">
          {projects.map((proj: any) => (
            <div key={proj.id} className="p-4 border rounded shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{proj.name}</h3>
                <p className="text-sm text-gray-500">Tasks: {proj.tasks?.length || 0}</p>
              </div>
              <button className="text-blue-500 text-sm font-medium">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}