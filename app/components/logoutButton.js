'use client';
import { logoutUsuario } from '../logout/actions'; // ajusta según ruta
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUsuario();        // Borra la cookie
    router.push('/');        // Redirige al login
  };

  return <button className='text-black cursor-pointer' onClick={handleLogout}>Cerrar sesión</button>;
}