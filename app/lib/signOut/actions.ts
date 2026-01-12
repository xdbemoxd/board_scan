'use server';

import { signOut } from '@/auth';
import { redirect } from 'next/navigation';

export async function handleSignOut() {
 try {
    // Intentamos cerrar sesión.
    // Usamos redirect: false para evitar que Auth.js intente navegar por su cuenta.
    await signOut({ redirect: false });
  } catch (error) {
    // Si signOut falla o lanza un error de interrupción, lo capturamos aquí.
    // Esto evita que el Server Action crashee y devuelva "Unexpected response".
    // Solo lo logueamos por si quieres depurar, pero no dejamos que rompa el flujo.
    console.error("Error controlado en signOut:", error);
  } finally {
    // El bloque finally SE EJECUTA SIEMPRE, haya error o no.
    // Aquí lanzamos la redirección nativa de Next.js.
    redirect('/');
  }
}