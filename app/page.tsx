import { auth } from "@/auth";
import ChooseOption from "@/app/pages/chooseOption/page";

export default async function Home() {

  const session = await auth()

  if (session?.user === undefined) {
    
    return(
      
      <div>

        <ChooseOption/>
        
      </div>
    
    )

  }


}
