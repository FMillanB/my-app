"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function AddMateriasForm() {
    const [name, setName] = useState("");
    const [profesorID, setProfesorID] = useState("");
    const [profesores, setProfesores] = useState([]);
    const [materias, setMaterias] = useState([]);
    const router = useRouter();
    const apiUrl = process.env.NEXT_BACKAPI;
    
    useEffect(() => {
        fetchProfesores();
        fetchMaterias();
    }, []);

    const fetchProfesores = async () => { await fetch(`https://backend-davi.onrender.com/api/usuarios`)
        .then(res => res.json())
        .then(data => setProfesores(data.filter(user => user.rol === "PROFESOR")));
    }

    const fetchMaterias = async () => { await fetch(`https://backend-davi.onrender.com/api/materias`)
    .then(res => res.json())
    .then(data => setMaterias(data))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() ||!profesorID) return;

        if (materias.some(materia => materia.nombre === name)) {
            alert("Ya existe una materia con ese nombre");
            return;
        }

        const profesor = profesores.filter(user => user.id === Number(profesorID))[0];

        try {await fetch(`https://backend-davi.onrender.com/api/materias`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre: name, profesor: profesor}),
        });
        
        alert("Materia agregada correctamente");
        // Limpiar los campos después de enviar el formulario
        setName("");
        setProfesorID("");
        fetchProfesores();
        } catch (error) {
            alert(error);
        }
        router.refresh();
    };

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit} className="flex gap-2 text-black">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border border-solid border-black/[.08] dark:border-black rounded-full px-4 py-2 w-full sm:w-[400px]"
                />
                <select
                    value={profesorID}
                    onChange={(e) => setProfesorID(e.target.value)}
                    required
                    className="border border-solid border-black/[.08] dark:border-black rounded-full px-4 py-2 w-full sm:w-[400px]"
                >
                    <option value="" disabled>
                        Selecciona un profesor
                    </option>
                    {profesores.map((profesor) => (
                        <option key={profesor.id} value={profesor.id}>
                            {profesor.name}
                        </option>
                    ))}
                </select>
                <button type="submit" className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black text-background gap-2 hover:bg-black dark:hover:bg-[#ccc] font-medium text-sm sm:text-base hover:text-black h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
                    Agregar Materia
                </button>
            </form>
        </div>
    );
}
