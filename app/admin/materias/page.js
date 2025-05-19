'use client';
import FetchMaterias from './FetchMaterias';

export default function MateriasPage() {
  return (
    <main>
      <h2>Materias</h2>
      <FetchMaterias />
      <a href="admin/materias/create">Crear materia</a>
    </main>
  );
}