'use server';

import { cookies } from 'next/headers';

export async function loginUsuario(_, formData) {
  const user = formData.get('user');
  const password = formData.get('password');

  const res = await fetch('http://localhost:8080/api/usuarios');
  const users = await res.json();

  const found = users.find(
    (u) =>
      (u.email === user) &&
      u.password === password
  );

  if (found) {
    const cookieStore = await cookies(); // 👈 aquí va el await obligatorio
    cookieStore.set('auth', JSON.stringify({
      id: found.id,
      name: found.name,
      rol: found.rol
    }), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 60 * 60 * 24
    });

    return { ok: true, rol: found.rol };
  }

  return { ok: false, error: 'Usuario o contraseña incorrectos' };
}