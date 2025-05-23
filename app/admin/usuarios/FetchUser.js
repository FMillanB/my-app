"use client";

import { useState, useEffect } from 'react';

export default function FetchUser() {
  const [users, setUsers] = useState([]);
  const apiUrl = process.env.NEXT_BACKAPI;

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => { await fetch(`https://backend-davi.onrender.com/api/usuarios`)
    .then(res => res.json())
    .then(data => setUsers(data))
  }

  const handleDelete = async (id) => {
    await fetch(`https://backend-davi.onrender.com/api/usuarios/${id}`, {
      method: "DELETE",
    });
    fetchApi();
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 text-black">
      <ul className="list-inside list-disc text-1xl text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        {users.map((user) => (
          <li key={user.id} className="mb-2 tracking-[-.01em]">
            {user.name} - {user.age} años
            <button onClick={() => handleDelete(user.id)} className="ml-2 text-red-200 hover:text-red-700 font-bold cursor-pointer">
                Delete
              </button>
          </li>
        ))}
      </ul>
    </div>
  );
}