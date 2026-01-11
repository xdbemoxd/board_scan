import dbConnect from "@/app/lib/dbConnect"; // Asegúrate que la ruta sea correcta
import User from "@/app/lib/models/User";

export default async function Home2() {
  await dbConnect();

  const usersResult = await User.find({}).lean();

  const users = usersResult.map((user) => ({
    ...user,
    _id: user._id.toString(),
    // IMPORTANTE: Si 'create' es fecha, Next.js te dará error al pasarla.
    // Descomenta la siguiente línea para evitar problemas:
    // create: user.create.toISOString(),
  }));

  return (
    <main>
        <p>hola</p>
      
      {/* Si la lista está vacía, avisamos */}
      {users.length === 0 && <p>No hay usuarios para mostrar</p>}

      {users.map((u) => (
        // 1. CORRECCIÓN: La key debe ser el ID, no el objeto 'u'
        <div key={u._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
          
          {/* 2. CORRECCIÓN: El campo en tu DB es 'name', no 'nombre' */}
          <h2>{u.name} {u.lastname}</h2>
          
          {/* Opcional: Mostrar el email o imagen si existe */}
          <p>{u.email}</p>
        </div>
      ))}
    </main>
  );
}