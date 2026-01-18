import { GetDataUser } from "@/app/lib/getDataUser/actions"
import { EditProfileForm } from "@/components/auth/edit-profile-form"

export default async function EditProfilePage({ params }: { params : Promise< {email : string} > }) {

  const {email}= await params 

  const auxEmail = decodeURIComponent(email)

  const userRaw = await GetDataUser(auxEmail)

  const user = JSON.parse(JSON.stringify(userRaw))

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <EditProfileForm user={user}/>
      </main>
    </div>
  )
}
