"use client";

import { useState, useEffect } from 'react';

export default function FetchMateriasEstudiante({ usuarioID }) {
  const [materias, setMaterias] = useState([]);
  const apiUrl = process.env.NEXT_API;

  useEffect(() => {
    const fetchMaterias = async () => {
      const res = await fetch(`https://backend-davi.onrender.com/api/usuarios/${usuarioID}/materias`)
      const data = await res.json()
      setMaterias(data)
    }
    fetchMaterias()
  }, [usuarioID])

  const fetchApi = async () => {
    const res = await fetch(`https://backend-davi.onrender.com/api/usuarios/${usuarioID}/materias`)
    const data = await res.json()
    setMaterias(data)
  }

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta materia?")) return;
    await fetch(`https://backend-davi.onrender.com/api/materias/${id}/eliminar-estudiante/${usuarioID}`, {
      method: "DELETE",
    });
    fetchApi();
  }

  return (
    <div className="text-black">
      <ul className="list-inside list-disc text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        {materias.map((materia) => (
          <li key={materia.id} className="mb-2 tracking-[-.01em]">
            {materia.nombre} - {materia.profesor.name}
            <button onClick={() => handleDelete(materia.id)} className="ml-2 text-red-200 hover:text-red-700 font-bold cursor-pointer">
                Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}