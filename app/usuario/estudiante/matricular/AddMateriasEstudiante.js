"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function AddMateriasForm({ usuarioID }) {
    const [materias, setMaterias] = useState([]);
    const [materiaID, setMateriaID] = useState("");
    const router = useRouter();
    
    useEffect(() => {
        fetchApi();
    }, []);
    
    const fetchApi = async () => { await fetch(`http://localhost:8080/api/materias`)
        .then(res => res.json())
        .then(data => setMaterias(data))
    }

    const fetchMaterias = async () => {
        const res = await fetch(`http://localhost:8080/api/usuarios/${usuarioID}/materias`)
        const data = await res.json()
        setMaterias(data)
    }

    const inscribir = async (e) => {
        e.preventDefault();

        const estudiantes = materias.find(materia => materia.id === Number(materiaID)).estudiantes;
        // Verificar los estudiantes inscritos en la materia seleccionada

        const materiaActual = materias.find(materia => materia.id === Number(materiaID));
        // Identificar la materia seleccionada

        const materiasRegistradas = materias.filter(materia => materia.nombre === materiaActual.nombre);
        // Filtrar las materias registradas por el nombre de la materia seleccionada

        // Si el estudiante ya está inscrito en la materia o a la misma materia con diferente profesor, mostrar un mensaje de alerta
        if (estudiantes.some(estudiante => estudiante.id === usuarioID)) {
            alert("Ya estás inscrito en esta materia");
            return;
        }

        try {await fetch(`http://localhost:8080/api/materias/${materiaID}/agregar-estudiante/${usuarioID}`, {
            method: "POST",
        });
        
        alert("Usuario agregado correctamente");
        // Limpiar los campos después de enviar el formulario
        setMateriaID("");
        } catch (error) {
            alert(error);
        }
        fetchMaterias();
        fetchApi();
        router.refresh();
        window.location.reload();
    };

    return (
        <form onSubmit={inscribir} className="text-black flex gap-2">
            <select
                value={materiaID}
                onChange={(e) => setMateriaID(e.target.value)}
                required
                className="border border-solid border-black/[.08] dark:border-black rounded-full px-4 py-2 w-full sm:w-[400px]"
            >
                <option className="text-black" value="" disabled>
                    Selecciona una materia
                </option>
                {materias.map((materia) => (
                    <option key={materia.id} value={materia.id}>
                        {materia.nombre} - {materia.profesor.name}
                    </option>
                ))}
            </select>
            <button type="submit" className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black text-background gap-2 hover:bg-black dark:hover:bg-[#ccc] font-medium text-sm sm:text-base hover:text-black h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
                Agregar Materia
            </button>
        </form>
    );
}
