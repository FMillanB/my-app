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
    await fetch(`http://localhost:8080/api/materias/${id}`, {
      method: "DELETE",
    });
    fetchApi();
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 text-black">
      <ul className="list-inside list-disc text-1xl text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        {materias.map((materia) => (
          <li key={materia.id} className="mb-2 tracking-[-.01em]">
            {materia.nombre} - {materia.profesor ? materia.profesor.name : "Sin profesor"}
            <button onClick={() => handleDelete(materia.id)} className="ml-2 text-red-200 hover:text-red-700 font-bold cursor-pointer">
                Delete
              </button>
          </li>
        ))}
      </ul>
    </div>
  );
}