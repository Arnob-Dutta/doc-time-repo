"use client"

import { signOut } from "next-auth/react"
import { Button } from './ui/button'
import { toast } from "sonner"

const SignOutButton = () => {

  const handleClick = () => {
    toast.error("Log out success.")
    signOut({ callbackUrl: "/" })
  }

  return (
    <Button variant={"secondary"} onClick={handleClick}>Logout</Button>
  )
}

export default SignOutButton