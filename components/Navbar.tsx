import Link from "next/link"
import { Button } from "./ui/button"
import { getServerSession } from "next-auth"
import { Avatar, AvatarFallback } from "./ui/avatar"
import Image from "next/image"
import SignOutButton from "./SignOutButton"
import { options } from "@/app/api/auth/[...nextauth]/options"


const Navbar = async ({ dashboard }: { dashboard?: boolean }) => {

  const session = await getServerSession(options)
  const username = session?.user?.name
  const avatarText = username?.slice(0, 2)

  return (
    <nav className="bg-emon-accent text-emon-light">
      <div className="container px-20">
        <div className="flex justify-between items-center py-4">
          <Link href={"/"} className="flex gap-3 items-center">
            <Image src={"/logo.svg"} alt="logo" height={32} width={32} />
            <h1 className="text-2xl font-sofia font-black text-emon-light">Doc_Time</h1>
          </Link>
          {dashboard ? <div className="flex items-center gap-4">
            <Avatar className="text-emon-dark uppercase font-black">
              <AvatarFallback>{avatarText}</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">{username}</h1>
            <SignOutButton />
          </div> :
            <div className="flex gap-4">
              {session ? (
                <>
                  <div className="hidden md:block">
                    <div className="flex items-center gap-4">
                      <Avatar className="text-emon-dark uppercase font-black">
                        <AvatarFallback>{avatarText}</AvatarFallback>
                      </Avatar>
                      <h1 className="font-bold">{username}</h1>
                    </div>
                  </div>
                  {session.user?.role === "user" ? (<Link href={"/user"}><Button variant={"secondary"}>Dashboard</Button></Link>) : (
                    <Link href={"/admin"}><Button variant={"secondary"}>Dashboard</Button></Link>
                  )}
                </>
              ) : (
                <>
                  <Link href={"/sign-in"}><Button variant={"secondary"}>Login</Button></Link>
                  <Link href={"/sign-up"}><Button variant={"secondary"}>Register</Button></Link>
                </>
              )}
            </div>

          }


        </div >
      </div >
    </nav >
  )
}

export default Navbar