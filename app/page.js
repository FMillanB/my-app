'use client'

import LoginForm from './login/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Background gradient */}
      <div className="w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 hidden md:flex items-center justify-center">
        {/* Aquí puedes poner un logo, ilustración o texto decorativo */}
        <h2 className="text-white text-4xl font-bold">Bienvenido de nuevo</h2>
      </div>

      {/* Formulario de inicio de sesión */}
      <LoginForm />
    </div>
  );
}