"use client";

import { useState, useEffect } from 'react';
import FetchMateriasEstudiante from './FetchEstudiantesMateria';
import { useRouter } from 'next/navigation';

export default function FetchMaterias({ usuarioID }) {
  const [materias, setMaterias] = useState([]);
  const router = useRouter();
  const apiUrl = process.env.NEXT_API;

  useEffect(() => {
    const fetchMaterias = async () => {
      const res = await fetch(`https://backend-davi.onrender.com/api/usuarios/${usuarioID}/materiasImpartidas`)
      const data = await res.json()
      setMaterias(data)
    }
    fetchMaterias()
  }, [usuarioID])

  return (
    <div className="text-black">
      <ul className="list-inside list-disc text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        {materias.map((materia) => (
          <li
            key={materia.id}
            className="mb-2 tracking-[-.01em]"
            onClick={() => router.push(`/usuario/profesor?materiaID=${materia.id}`)}
          >
            {materia.nombre} - <span className="font-bold text-1xl">{materia.estudiantes.length} </span> estudiantes
          </li>
        ))}
      </ul>
    </div>
  );
}