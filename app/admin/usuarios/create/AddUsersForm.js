"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function AddUserForm() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [rol, setRol] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !age || !rol) return;

        try {await fetch("http://localhost:8080/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, age: Number(age), rol }),
        });
        
        alert("Usuario agregado correctamente");
        router.push("/usuarios");
        // Limpiar los campos después de enviar el formulario
        setName("");
        setAge("");
        setRol("");
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
            <input
                type="number"
                placeholder="Edad"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="border border-solid border-black/[.08] dark:border-white/[.145] rounded-full px-4 py-2 w-full sm:w-[400px]"
            />
            <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                required
                className="border border-solid border-black/[.08] dark:border-white/[.145] rounded-full px-4 py-2 w-full sm:w-[400px]"
            >
                <option value="" disabled>
                    Selecciona un rol
                </option>
                <option value="ESTUDIANTE">Estudiante</option>
                <option value="PROFESOR">Profesor</option>
            </select>
            <button type="submit" className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
                Agregar Usuario
            </button>
        </form>
    );
}
