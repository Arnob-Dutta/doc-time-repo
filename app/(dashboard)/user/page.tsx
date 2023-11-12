import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getAppointmentByUser } from "@/lib/actions/appointment.action"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"


const Dashboard = async () => {

  const session = await getServerSession()

  if (session?.user?.email === 'admin@mail.com') {
    redirect("/admin")
  }

  const res = await getAppointmentByUser({ email: session?.user?.email })


  return (
    <>
      <Navbar dashboard />
      <div className="bg-slate-200">
        <div className="container px-20 min-h-[80vh]">
          <div className="flex flex-col gap-4 justify-center h-[80vh]">
            <h1 className="text-4xl text-emon-accent font-sofia font-bold">Your Appointment</h1>

            <div className="grid grid-cols-3 gap-4">
              {res.length >= 1 ?
                (
                  res.map(ap => (
                    <Link key={ap._id} href={`/user/appointment/${ap._id}`}>
                      <Card>
                        <CardHeader>
                          <h1 className="text-xl font-bold font-sofia">{ap.doctorName}</h1>
                        </CardHeader>
                        <CardContent>

                          <h5>Your Ticket</h5>
                          <h1 className="text-4xl font-bold text-emon-accent">{ap.ticket}</h1>
                          <h2 className="text-xl">{ap.date.slice(0, 15)} - {ap.time}</h2>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )
                : <Card >
                  <CardHeader>
                    Opps!!
                  </CardHeader>
                  <CardContent>
                    You don't have any Appointment Yet.
                  </CardContent>
                </Card>}

            </div>

            <Link href={"/appointment"}><Button className="w-64 h-12">Get Appointment Now</Button></Link>

          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard