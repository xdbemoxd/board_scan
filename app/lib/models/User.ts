import { Schema, model, models } from 'mongoose';

export interface IUser {
  name: string;
  lastname: string;
  email: string;
  image?: string;
  create: Date;
  password:string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, default: null },
  create: { type: Date, default: Date.now },
  password: { type: String, required: true, select: false },
}, {
  // 👇 ESTA ES LA LÍNEA MÁGICA QUE TE FALTA
  collection: 'USERS',
  // Esto evita que Mongoose busque 'users' en minúscula
  timestamps: false // Opcional: ponlo en true si quieres que gestione created_at automáticamente
});

// Importante: Asegúrate de que el string aquí coincida también por si acaso
const User = models.USERS || model<IUser>('USERS', UserSchema);

export default User;