import { UserHeader } from '@/components/layout/page';
import { auth } from "@/auth";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/models/User";

export default async function SecontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  let userName = "";
  let userImageSrc = null;

  if (session?.user?.email) {
    await dbConnect();

    // LA CONSULTA:
    // .select('image name') -> Trae SOLO la imagen y el nombre (muy rápido)
    // .lean() -> Devuelve objeto plano, ahorra memoria
    const user = await User.findOne({ email: session.user.email })
      .select("image name lastname")
      .lean();

    if (!user) return null

    userName = `${user.name} ${user.lastname}`
    userImageSrc = `data:image/jpeg;base64,${user.image}`;

  }

  return (
    
   
      <main>

        <UserHeader userName={userName} userImage={userImageSrc}/>
        
        
        {children}
      </main>
    
  );
}
