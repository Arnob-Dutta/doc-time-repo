"use client"

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar"
import { timeCycle } from "@/lib/constent";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { createAppointment } from "@/lib/actions/appointment.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import HashLoader from "react-spinners/HashLoader";

type PageProps = {
  name: string
  fee: number
  commission: number
  userEmail: string | null | undefined
}

const AppointmentFrom = ({ commission, fee, name, userEmail }: PageProps) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [time, setTime] = useState<string>("")
  const stDate = date?.toString()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    const res = await createAppointment({ commission, date: stDate, doctorName: name, userEmail, fee, time })

    if (res) {
      router.push("/user")
      setIsLoading(false)
    } else {
      toast.error("Field to create appointment")
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
      <div className="flex gap-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md bg-emon-light text-emon-dark"
        />
        <div className="bg-emon-light rounded-sm grid grid-cols-3 gap-2 items-center p-6">
          {timeCycle.map(times => (
            <Button key={times} className={cn("bg-emon-light text-emon-dark border-none shadow-none hover:text-white", {
              "bg-emon-accent text-emon-light": time === times
            })} onClick={() => setTime(times)}>{times}</Button>
          ))}
        </div>
      </div>
      <div className="py-5 text-right">
        <Button className="bg-emon-light text-emon-dark hover:text-emon-light" disabled={time === ""} onClick={handleSubmit}>Pay and Get Appointment</Button>
      </div>
    </>
  )

}

export default AppointmentFrom
