import React from "react";
import Link from "next/link";
import { cookies } from 'next/headers'

export default async function AdminHomePage() {
    const cookieStore = await cookies();
    const user = cookieStore ? JSON.parse(cookieStore.get('auth')?.value) : null;
    console.log(user);
    const adminName = user ? user.name : "Usuario";

    return (
        <div style={{ maxWidth: 500, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
            <h1>Bienvenido, {adminName}</h1>
            <p>¡Hola {adminName}! Selecciona una opción para gestionar el sistema:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
                <Link href="/admin/usuarios">
                    <button style={{ padding: "12px 24px", fontSize: 16, cursor: "pointer" }}>
                        Gestionar Usuarios
                    </button>
                </Link>
                <Link href="/admin/materias">
                    <button style={{ padding: "12px 24px", fontSize: 16, cursor: "pointer" }}>
                        Gestionar Materias
                    </button>
                </Link>
            </div>
        </div>
    );
}