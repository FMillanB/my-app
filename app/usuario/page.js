import React from "react";
import Link from "next/link";
import { cookies } from 'next/headers'
import FetchMaterias from "./profesor/fetchMateriasUser";
import FetchMateriasEstudiante from "./estudiante/FetchMateriasUser";
import AddMateriasForm from "./estudiante/matricular/AddMateriasEstudiante";

export default async function EstudentHomePage() {
    const cookieStore = await cookies();
    const user = cookieStore ? JSON.parse(cookieStore.get('auth')?.value) : null;
    const userName = user ? user.name : "Usuario";
    const userRol = user ? user.rol : "Usuario";

    if (userRol == "ESTUDIANTE") {
        return (
        <div className="text-black" style={{ maxWidth: 500, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
            <h1 className="text-2xl font-bold">Bienvenido, {userName}</h1>
            <p>¡Hola {userName}! Estas son tus materias registradas:</p>
            <div className="" style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
                <FetchMateriasEstudiante usuarioID={user.id}/>
                <AddMateriasForm usuarioID={user.id}/>
            </div>
        </div>
        );
    } else {
        return (
        <div className="text-black" style={{ maxWidth: 500, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
            <h1 className="text-2xl font-bold">Bienvenido, {userName}</h1>
            <p>¡Hola {userName}! Estas son tus materias registradas:</p>
            <div className="" style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
                <FetchMaterias usuarioID={user.id}/>
            </div>
        </div>
        );
    }
} 