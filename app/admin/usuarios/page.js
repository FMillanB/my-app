// This is the main page for the usuarios route
import FetchUser from "./FetchUser";
import LogoutButton from "../../components/logoutButton.js";

export default function UsuariosPage() {
  return (
    <main>
      <h2>Usuarios</h2>
      <FetchUser />
      <a href="admin/usuarios/create">Crear usuario</a>
      <LogoutButton />
    </main>
  );
}