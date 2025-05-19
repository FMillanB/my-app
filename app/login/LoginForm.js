'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUsuario } from './actions';

export default function LoginForm() {
  const [state, formAction] = useActionState(loginUsuario, { ok: false });
  const router = useRouter();

  useEffect(() => {
    if (state.ok && state.rol) {
      if (state.rol === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/usuario');
      }
    }
  }, [state, router]);

  return (
    <form action={formAction}>
      <label>
        Email:
        <input type="email" name="user" required />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" name="password" required />
      </label>
      <br />
      <button type="submit">Iniciar sesión</button>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
    </form>
  );
}
