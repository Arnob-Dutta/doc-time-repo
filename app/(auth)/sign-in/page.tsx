"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { signIn } from "next-auth/react"
import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod";

import { loginSchema } from "@/lib/validation"
import { checkUser } from "@/lib/actions/user.action"

import { toast } from 'sonner'
import Image from "next/image"

const SignInPage = () => {

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {

    const res = await checkUser({ email: values.email, password: values.password })
    if (res) {
      signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/user"
      })
      toast.success("Login success.")
    } else {
      toast.error("Invalid credentials.");
    }
  }



  return (
    <>

      <div className="grid place-content-center bg-emon-accent/50 min-h-screen">
        <div className="w-screen md:w-[400px] space-y-3 items-center gap-1.5 p-10 bg-white rounded-xl shadow-lg">
          <div className="flex justify-between items-center">
            <Link href={"/"} className="flex gap-3 items-center">
              <Image src={"/logo.svg"} alt="logo" height={32} width={32} />
              <h1 className="text-2xl font-sofia font-black text-emon-accent">Doc_Time</h1>
            </Link>
            <h1 className="text-2xl font-sofia font-black text-emon-dark">Login</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center">
                <Button type="submit">Log In</Button>
                <Link href={"/sign-up"} className="text-sm text-blue-500">Don't have an account?</Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default SignInPage