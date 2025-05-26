"use client";

import { useState, useEffect } from "react";

export default function FetchMaterias() {
  const [materias, setMaterias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [profesorId, setProfesorId] = useState("");

  const apiMaterias = "https://backend-davi.onrender.com/api/materias";
  const apiUsuarios = "https://backend-davi.onrender.com/api/usuarios";

  useEffect(() => {
    fetchMaterias();
    fetchUsuarios();
  }, []);

  const fetchMaterias = async () => {
    await fetch(apiMaterias)
      .then((res) => res.json())
      .then((data) => setMaterias(data));
  };

  // Traer todos los usuarios y filtrar solo PROFESOR
  const fetchUsuarios = async () => {
    await fetch(apiUsuarios)
      .then((res) => res.json())
      .then((data) => setUsuarios(data.filter(u => u.rol === "PROFESOR")));
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta materia?")) return;
    await fetch(`${apiMaterias}/${id}`, {
      method: "DELETE",
    });
    fetchMaterias();
  };

  const handleEditClick = (materia) => {
    setEditingId(materia.id);
    setProfesorId(materia.profesor ? materia.profesor.id : "");
  };

  const handleCancel = () => {
    setEditingId(null);
    setProfesorId("");
  };

  const handleSave = async (materia) => {
    // Ajusta el body si tu API espera otra estructura
    await fetch(`${apiMaterias}/${materia.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...materia,
        profesor: profesorId ? { id: Number(profesorId) } : null,
      }),
    });
    setEditingId(null);
    setProfesorId("");
    fetchMaterias();
  };

  const PencilIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 15v-2zm0 0H7v2a2 2 0 002 2h2v-2H9z" />
    </svg>
  );
  const TrashIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className="flex flex-col items-center justify-center py-8 text-black border-2 border-gray-300 rounded-lg p-4 bg-white shadow-md text-black">
      <ul className="list-inside list-disc text-1xl text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        {materias.map((materia) => (
          <li key={materia.id} className="mb-2 tracking-[-.01em] flex items-center">
            <span className="mr-2">{materia.nombre} - </span>
            {editingId === materia.id ? (
              <>
                <select
                  value={profesorId}
                  onChange={(e) => setProfesorId(e.target.value)}
                  className="border px-1 py-1 rounded text-black"
                >
                  <option value="">Sin profesor</option>
                  {usuarios.map((prof) => (
                    <option key={prof.id} value={prof.id}>
                      {prof.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleSave(materia)}
                  className="ml-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-xs"
                >
                  Guardar
                </button>
                <button
                  onClick={handleCancel}
                  className="ml-1 bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400 text-xs"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-600">
                  {materia.profesor ? materia.profesor.name : "Sin profesor"}
                </span>
                <button
                  onClick={() => handleEditClick(materia)}
                  className="ml-2 text-blue-500 hover:text-blue-700 font-bold cursor-pointer"
                  aria-label="Editar"
                  title="Editar profesor"
                >
                  <PencilIcon />
                </button>
                <button
                  onClick={() => handleDelete(materia.id)}
                  className="ml-1 text-red-500 hover:text-red-700 font-bold cursor-pointer"
                  aria-label="Eliminar"
                  title="Eliminar materia"
                >
                  <TrashIcon />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}