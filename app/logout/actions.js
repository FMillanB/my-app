'use server';

import { cookies } from 'next/headers';

export async function logoutUsuario() {
  const cookieStore = await cookies(); // 👈 aquí va el await obligatorio
// Eliminar todas las cookies relacionadas con la autenticación y datos de usuario
cookieStore.delete('auth');      // Elimina la cookie de autenticación
}