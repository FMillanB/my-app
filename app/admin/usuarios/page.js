"use client"// This is the main page for the usuarios route
import FetchUser from "./FetchUser";
import LogoutButton from "../../components/logoutButton.js";
import { useRouter } from 'next/navigation';
import AddUserForm from "./AddUsersForm";

export default function UsuariosPage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-black">
      <h2 className="font-bold text-3xl">Usuarios</h2>
      <FetchUser />
      <AddUserForm />
      <button
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black text-background gap-2 hover:bg-black dark:hover:bg-[#ccc] font-medium text-sm sm:text-base hover:text-black h-10 sm:h-12 px-4 sm:px-5 sm:w-auto mt-4"
        onClick={() => router.back()}
      >
        Volver
      </button>
    </main>
  );
}