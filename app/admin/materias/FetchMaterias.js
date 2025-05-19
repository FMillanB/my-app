"use client";

import { useState, useEffect } from 'react';

export default function FetchMaterias() {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => { await fetch("http://localhost:8080/api/materias")
    .then(res => res.json())
    .then(data => setMaterias(data))
  }

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta materia?")) return;
    await fetch(`http://localhost:8080/api/usuarios/${id}`, {
      method: "DELETE",
    });
    fetchApi();
  }

  return (
    <div>
      <ul className="list-inside list-disc text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        {materias.map((materia) => (
          <li key={materia.id} onClick={() => handleDelete(materia.id)} className="mb-2 tracking-[-.01em]">
            {materia.name} - {materia.profesor} years old
            <button className="ml-2 text-red-500 hover:text-red-700">
                Delete
              </button>
          </li>
        ))}
      </ul>
    </div>
  );
}