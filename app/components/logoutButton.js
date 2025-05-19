'use client';
import { logoutUsuario } from '../logout/actions'; // ajusta según ruta
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUsuario();        // Borra la cookie
    router.push('/login');        // Redirige al login
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
}