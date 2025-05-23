"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import FetchEstudiantesMateria from './FetchEstudiantesMateria';

export default function EstudiantesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const materiaID = searchParams.get('materiaID');

    return (
        <main className="flex flex-col items-center justify-center min-h-screen text-black">
            <h2 className="font-bold text-3xl">Estudiantes Registrados</h2>
            <FetchEstudiantesMateria materiaID={materiaID}  />
            <button
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black text-background gap-2 hover:bg-black dark:hover:bg-[#ccc] font-medium text-sm sm:text-base hover:text-black h-10 sm:h-12 px-4 sm:px-5 sm:w-auto mt-4"
                onClick={() => router.back()}
            >
                Volver
            </button>
        </main>
  );
}