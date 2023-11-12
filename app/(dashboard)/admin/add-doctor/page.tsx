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
import Image from "next/image"
import Link from "next/link"
import { toast } from 'sonner'
import Select from 'react-select';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod";
import { addDoctorSchema } from "@/lib/validation"
import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent, useState } from "react"
import { useUploadThing } from "@/lib/uploadthings"
import { addDoctor } from "@/lib/actions/doctor.action"
import { selectOption } from "@/lib/constent"
import HashLoader from "react-spinners/HashLoader"
import { usePathname, useRouter } from "next/navigation"

const AddDoctor = () => {

  const { startUpload } = useUploadThing("media")
  const router = useRouter()

  const [specialty, setSpecialty] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const [fileNames, setFileNames] = useState<File[]>([]);

  const form = useForm<z.infer<typeof addDoctorSchema>>({
    resolver: zodResolver(addDoctorSchema),
    defaultValues: {
      name: "",
      title: "",
      desc: "",
      fee: 0,
      commission: 0,
    },
  })


  const handleSubmit = async (values: z.infer<typeof addDoctorSchema>) => {

    setIsLoading(true)
    const path = "/admin"


    const imgRes = await startUpload(fileNames)
    // @ts-ignore
    const fUrl = imgRes[0].fileUrl
    // @ts-ignore
    const res = await addDoctor({ name: values.name, commission: values.commission, desc: values.desc, fee: values.fee, thumbnail: fUrl, title: values.title, specialty: specialty.value, path })

    if (res) {
      setIsLoading(false)
      toast.success("Doctor added success.")
      router.push("/admin")

    } else {
      toast.error("Failed to add doctor.")
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileNames(Array.from(event.target.files))
    }
  }

  return (
    <>
      {isLoading && (
        <div className="absolute w-screen h-screen flex justify-center items-center top-0 left-0 place-content-center bg-emon-dark/25 z-50">
          <HashLoader
            color="#36d7b7"
            loading={isLoading}
          />
        </div>
      )}
      <div className="grid place-content-center bg-emon-accent/50 min-h-screen ">
        <div className="w-screen md:w-[600px] space-y-3 items-center gap-1.5 p-10 bg-white rounded-xl shadow-lg my-10">
          <div className="flex justify-between items-center">
            <Link href={"/admin"} className="flex gap-3 items-center">
              <Image src={"/logo.svg"} alt="logo" height={32} width={32} />
              <h1 className="text-2xl font-sofia font-black text-emon-accent">Dashboard</h1>
            </Link>

          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. Example" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Picture</FormLabel>
                    <FormControl>
                      <Input type="file" accept="image/png, image/gif, image/jpeg" {...field} onChange={(event) => {
                        handleFileChange(event);
                        field.onChange(event);
                      }} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="MBBS, FCDS, XYZ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Specialty</FormLabel>
                {/* @ts-ignore */}
                <Select defaultValue={specialty} onChange={setSpecialty} options={selectOption} />
              </FormItem>


              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doctor Fee</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="commission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commission</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Say Something about Doctor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <div className="flex justify-between items-center">
                <Button type="submit">Add Doctor</Button>

              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default AddDoctor