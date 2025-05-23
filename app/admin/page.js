import React from "react";
import Link from "next/link";
import { cookies } from 'next/headers'

export default async function AdminHomePage() {
    const cookieStore = await cookies();
    const user = cookieStore ? JSON.parse(cookieStore.get('auth')?.value) : null;
    console.log(user);
    const adminName = user ? user.name : "Usuario";

    return (
        <div className="text-black max-w-[500px] mx-auto my-10 p-6 border border-gray-100 rounded-lg shadow-md shadow-black/60">
            <h1>Bienvenido, {adminName}</h1>
            <p>¡Hola {adminName}! Selecciona una opción para gestionar en el sistema:</p>
            <div className="flex flex-col gap-4 mt-8">
                <Link href="/admin/usuarios">
                    <button
                        className="bg-gray-300 text-black px-6 py-3 text-base rounded transition-colors duration-200 hover:bg-black hover:text-white cursor-pointer"
                    >
                        Gestionar Usuarios
                    </button>
                </Link>
                <Link href="/admin/materias">
                    <button
                        className="bg-gray-300 text-black px-6 py-3 text-base rounded transition-colors duration-200 hover:bg-black hover:text-white cursor-pointer"
                    >
                        Gestionar Materias
                    </button>
                </Link>
            </div>
        </div>
    );
}