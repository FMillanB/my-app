"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function AddMateriasForm() {
    const [name, setName] = useState("");
    const [profesorID, setProfesorID] = useState("");
    const [profesores, setProfesores] = useState([]);
    const router = useRouter();
    
    useEffect(() => {
        fetchApi();
    }, []);
    
    const fetchApi = async () => { await fetch("http://localhost:8080/api/materias")
        .then(res => res.json())
        .then(data => setProfesores(data.filter(user => user.rol === "PROFESOR")))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() ||!profesorID) return;

        try {await fetch("http://localhost:8080/api/materias", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, profesorID: Number(profesorID) }),
        });
        
        alert("Usuario agregado correctamente");
        router.push("/materias");
        // Limpiar los campos después de enviar el formulario
        setName("");
        setProfesorID("");
        } catch (error) {
            alert("Error al agregar usuario");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-solid border-black/[.08] dark:border-white/[.145] rounded-full px-4 py-2 w-full sm:w-[400px]"
            />
            <select
                value={profesorID}
                onChange={(e) => setProfesorID(e.target.value)}
                required
                className="border border-solid border-black/[.08] dark:border-white/[.145] rounded-full px-4 py-2 w-full sm:w-[400px]"
            >
                <option value="" disabled>
                    Selecciona un rol
                </option>
                {profesores.map((profesor) => (
                    <option key={profesor.id} value={profesor.id}>
                        {profesor.name}
                    </option>
                ))}
            </select>
            <button type="submit" className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
                Agregar Materia
            </button>
        </form>
    );
}
