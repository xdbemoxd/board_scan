"use server"

import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/lib/models/User';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

// 1. Definimos la forma del estado de respuesta
export type UpdateUserState = {
  message: string | null;
  error?: boolean;
}

// 2. Cambiamos el tipo de prevState para que coincida con la interfaz
export async function UpdateDataUser(
    prevState: UpdateUserState, 
    formData: FormData
): Promise<UpdateUserState> { // Prometemos devolver este tipo

    const session = await auth();
    if (!session?.user?.email) {
        return { message: 'No autorizado', error: true };
    }
    const userEmail = session.user.email;

    const name = formData.get('name');
    const lastname = formData.get('lastname');
    const password = formData.get('password') as string;
    const image = formData.get('image') as string;

    const updateFields : any = {
        name,
        lastname
    };

    if (image && image.trim() !== '' && image.startsWith('data:')) {
        updateFields.image = image.split(',')[1];
    }

    if (password && password.trim() !== '') {
        updateFields.password = password; 
    }

    try {
        await dbConnect();

        const result = await User.findOneAndUpdate(
            { email: userEmail },
            { $set: updateFields },
            { new: true }
        );

        if (!result) {
            return { message: 'Usuario no encontrado', error: true };
        }

    } catch (error) {
        console.error("Error updating user:", error);
        return { message: 'Error al actualizar la base de datos', error: true };
    }

    // El redirect debe ser lo último. 
    // Nota: redirect lanza un error "NEXT_REDIRECT", por eso interrumpe la ejecución
    // y no necesitamos devolver el objeto State aquí.
    redirect('/dashboard');
}