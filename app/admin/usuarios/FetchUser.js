"use client";

import { useState, useEffect } from 'react';

export default function FetchUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => { await fetch("http://localhost:8080/api/usuarios")
    .then(res => res.json())
    .then(data => setUsers(data))
  }

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/usuarios/${id}`, {
      method: "DELETE",
    });
    fetchApi();
  }

  return (
    <div>
      <ul className="list-inside list-disc text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        {users.map((user) => (
          <li key={user.id} onClick={() => handleDelete(user.id)} className="mb-2 tracking-[-.01em]">
            {user.name} - {user.age} years old
            <button className="ml-2 text-red-500 hover:text-red-700">
                Delete
              </button>
          </li>
        ))}
      </ul>
    </div>
  );
}