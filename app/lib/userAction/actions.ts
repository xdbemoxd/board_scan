'use server';

import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/lib/models/User';
import { redirect } from 'next/navigation';

export async function registerUser( 
    prevState: string | undefined, 
    formData: FormData
){
  
// 1. Extraer los datos del formulario
  const name = formData.get('name');
  const lastname = formData.get('lastname');
  const email = formData.get('email');
  const password = formData.get('password');
  const image64 = formData.get('image64')

  // 2. Validaciones básicas
  if (!name || !lastname || !email || !password) {
    return 'Todos los campos son obligatorios';
  }

  try {
    await dbConnect();

    // 3. Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return 'Este correo ya está registrado';
    }

    // 4. Guardar el usuario nuevo
    // Como pediste, guardamos la contraseña tal cual (texto plano)
    await User.create({
      name,
      lastname,
      email,
      password,
      image: image64,
      // create: Date.now() (se pone automático)
    });

  } catch (error) {
    console.error(error);
    return 'Error al conectar con la base de datos';
  }

  // 5. Si todo salió bien, redirigir al login
  redirect('/');
}