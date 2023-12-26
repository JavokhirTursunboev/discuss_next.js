'use client'
import { signIn,signOut } from "@/actions";
import { Avatar,  
   NavbarItem,
   Button, Popover, 
   PopoverTrigger, PopoverContent,} from "@nextui-org/react";
import { useSession } from "next-auth/react";

    export default  function HeaderAuth(){
         const session = useSession()
        
  let authContent: React.ReactNode;

  if(session.status === 'loading'){
    authContent = null
  } else if (session.data?.user) {
    authContent = <Popover placement="left" >
      <PopoverTrigger>

      <Avatar  src={session.data.user.image ||''}/>
      </PopoverTrigger>

      <PopoverContent>
      <div>
      <form action={signOut}>
   
      <Button type='submit' > Sign Out</Button> 
    </form>
         </div>
      </PopoverContent>
    </Popover>
  } else {
    authContent = <> 
    <form action={signIn}>
    <NavbarItem>
      <Button type='submit' color="secondary" variant="bordered"> Sign In</Button> 
      </NavbarItem></form>

      <form action={signOut}>
    <NavbarItem>
      <Button type='submit' color="primary" variant="flat"> Sign Out</Button> 
      </NavbarItem></form>
      </>
  }
  return authContent

    }