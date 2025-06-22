import { auth } from "@/auth"
import UserDetailsComponent from "@/components/UserDetailsComponent"



async function UserProfilePage() {
 const session = await auth()
 const id =   session?.user?.id || ""
  return (
    <div>
        <UserDetailsComponent userId = {id} isAdminPage = {false} />
    </div>
  )
}

export default UserProfilePage