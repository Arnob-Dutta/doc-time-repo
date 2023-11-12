"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import Link from "next/link"
import { signIn } from "next-auth/react"
import { Skeleton } from "@/components/ui/skeleton"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod";

import { signUpSchema } from "@/lib/validation"
import { createUser } from "@/lib/actions/user.action"
import Image from "next/image"


const SignUpPage = () => {

  const handleSubmit = async (values: z.infer<typeof signUpSchema>) => {

    const res = await createUser({ firstName: values.firstName, lastName: values.lastName, email: values.email, password: values.password })

    if (res) {
      signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/user"
      })
    }
  }

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })



  return (
    <>
      <div className="grid place-content-center bg-emon-accent/50 min-h-screen">
        <div className="w-screen md:w-[400px] space-y-3 items-center gap-1.5 p-10 bg-white rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Link href={"/"} className="flex gap-3 items-center">
              <Image src={"/logo.svg"} alt="logo" height={32} width={32} />
              <h1 className="text-2xl font-sofia font-black text-emon-accent">Doc_Time</h1>
            </Link>
            <h1 className="text-2xl font-sofia font-black text-emon-dark">Register</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
              <div className="flex flex-col md:flex-row gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Josh" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Dio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                <Button type="submit">Sign Up</Button>
                <Link href="/sign-in" className="text-blue-500 text-sm">Already have an account?</Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default SignUpPage