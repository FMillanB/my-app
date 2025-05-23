"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function AddUserForm() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [rol, setRol] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const apiUrl = process.env.NEXT_BACKAPI;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !age || !rol) return;

        try {await fetch(`https://backend-davi.onrender.com/api/usuarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, age: Number(age), rol }),
        });
        
        alert("Usuario agregado correctamente");
        router.refresh("/admin/usuarios");
        // Limpiar los campos después de enviar el formulario
        setName("");
        setAge("");
        setRol("");
        } catch (error) {
            alert("Error al agregar usuario");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center py-8 text-black gap-2">
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-solid border-black/[.08] dark:border-black rounded-full px-4 py-2 w-full sm:w-[400px]"
            />
            <input
                type="number"
                placeholder="Edad"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="border border-solid border-black/[.08] dark:border-black rounded-full px-4 py-2 w-full sm:w-[400px]"
            />
            <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                required
                className="border border-solid border-black/[.08] dark:border-black rounded-full px-4 py-2 w-full sm:w-[400px]"
            >
                <option value="" disabled>
                    Selecciona un rol
                </option>
                <option value="ESTUDIANTE">Estudiante</option>
                <option value="PROFESOR">Profesor</option>
            </select>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-solid border-black/[.08] dark:border-black rounded-full px-4 py-2 w-full sm:w-[400px]"
            />
            <input
                type="text"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-solid border-black/[.08] dark:border-black rounded-full px-4 py-2 w-full sm:w-[400px]"
            />
            <button type="submit" className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black text-background gap-2 hover:bg-black dark:hover:bg-[#ccc] font-medium text-sm sm:text-base hover:text-black h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
                Agregar Usuario
            </button>
        </form>
    );
}
