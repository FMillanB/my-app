"use client";

import { useState, useEffect } from 'react';

export default function FetchMateriasEstudiante({ materiaID }) {
    const [estudiantes, setEstudiantes] = useState([]);
    const apiUrl = process.env.NEXT_API;

    useEffect(() => { 
        fetchMateria()
    }, [materiaID])
    
    const fetchMateria = async () => {
        const res = await fetch(`${apiUrl}/api/materias/${materiaID}`)
        const data = await res.json()
        setEstudiantes(data.estudiantes)
    }


    return (
        <div className="text-black">
        <ul className="list-inside list-disc text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            {estudiantes.map((estudiante) => (
            <li key={estudiante.id} className="mb-2 tracking-[-.01em]">
                {estudiante.name}
            </li>
            ))}
        </ul>
        </div>
    );
}