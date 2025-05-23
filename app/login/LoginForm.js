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
    <div className="w-full md:w-1/2 flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-white text-4xl font-bold">Iniciar Sesión</h1>
        <form action={formAction} className='space-y-4'>
          <div>
            <label className="block text-sm font-medium text-white-600">
              Email:
            </label>
            <input type="email" name="user" required className="px-1 bg-white text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
            
          </div>

          <div>
            <label className="block text-sm font-medium text-white-600">
              Contraseña:
            </label>
            <input type="password" name="password" required className="px-1 bg-white text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
          </div>
              <button type="submit" className='cursor-pointer w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition'>Iniciar sesión</button>
                {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
        </form>
      </div>
    </div>
  );
}
