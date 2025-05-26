"use client";

import { useState, useEffect } from "react";

export default function FetchUser() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", age: "", rol: "",email: "", password: "" });

  // Cambia esta URL por tu variable de entorno si la usas
  const apiUrl = "https://backend-davi.onrender.com/api/usuarios";

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    await fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  const handleDelete = async (id) => {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchApi();
  };

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setForm({ name: user.name, age:user.age, rol:user.rol ,email: user.email, password: user.password });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ email: "", password: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setEditingId(null);
    fetchApi();
  };

  const PencilIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 15v-2zm0 0H7v2a2 2 0 002 2h2v-2H9z" />
    </svg>
  );

  const TrashIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-md text-black">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between mb-4 p-2 border-b border-gray-200"
        >
          {editingId === user.id ? (
            <div className="flex-1 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="border px-2 py-1 rounded"
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Nuevo password"
                className="border px-2 py-1 rounded"
              />
              <button
                onClick={() => handleSave(user.id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Guardar
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <>
              <div className="py-4 px-4 w-full">
                <span className="font-bold text-lg">{user.name}</span>
                <br />
                <span className="text-sm text-gray-600">{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditClick(user)}
                  className="text-blue-500 hover:text-blue-700 font-bold cursor-pointer"
                >
                  <PencilIcon />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                >
                  <TrashIcon />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}