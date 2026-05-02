"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]); // Task assign karne ke liye

  // Data load karne ka function
  const loadData = async () => {
    const [pRes, tRes] = await Promise.all([
      fetch("/api/projects"),
      fetch("/api/tasks")
    ]);
    setProjects(await pRes.json());
    setTasks(await tRes.json());
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">🚀 Project Manager</h1>
          <button onClick={() => signOut()} className="text-red-500 font-semibold">Logout</button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Column 1: Projects */}
          <div className="col-span-1 border-r pr-4">
            <h2 className="font-bold text-lg mb-4">Projects</h2>
            {projects.map((p: any) => (
              <div key={p.id} className="p-3 bg-blue-50 mb-2 rounded border border-blue-100 text-sm">
                {p.name}
              </div>
            ))}
          </div>

          {/* Column 2 & 3: Tasks List */}
          <div className="col-span-2">
            <h2 className="font-bold text-lg mb-4">Current Tasks</h2>
            <div className="space-y-3">
              {tasks.length === 0 && <p className="text-gray-400">Abhi koi task nahi hai.</p>}
              {tasks.map((t: any) => (
                <div key={t.id} className="flex justify-between items-center p-4 border rounded-lg shadow-sm">
                  <div>
                    <p className="font-bold">{t.title}</p>
                    <p className="text-xs text-gray-500">Project: {t.project.name} | Assignee: {t.assignee.email}</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}