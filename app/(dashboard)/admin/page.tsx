import { options } from "@/app/api/auth/[...nextauth]/options"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { Stethoscope, User2 } from "lucide-react"
import DoctorTable from "@/components/DoctorTable"
import { getDoctors } from "@/lib/actions/doctor.action"
import { getUsers } from "@/lib/actions/user.action"
import { getCommissionFromAppointment } from "@/lib/actions/appointment.action"


const AdminDashboard = async () => {

  const session = await getServerSession(options)

  if (session?.user?.role !== "admin") {
    redirect("/user")
  }

  const data = await getDoctors()
  const users = await getUsers()
  const commission = await getCommissionFromAppointment()


  return (
    <>
      <Navbar dashboard />
      <div className="bg-slate-200">
        <div className="container px-20 min-h-[80vh]">
          <div className="flex flex-col gap-4 justify-center min-h-[80vh]">
            <h1 className="text-4xl text-emon-accent font-sofia font-bold mt-10">Dashboard</h1>

            <div className="grid grid-cols-4 items-center gap-4">
              <div className="shadow-md space-y-3 rounded-lg px-10 py-5 bg-white">
                <h1 className="text-4xl font-sofia font-black text-emon-accent flex items-center gap-4">
                  <Stethoscope strokeWidth={3} size={25} />
                  {data.length}
                </h1>

                <h1 className="font-semibold text-emon-dark">
                  Total Doctor
                </h1>
              </div>
              <div className="shadow-md space-y-3 rounded-lg px-10 py-5 bg-white">
                <h1 className="text-4xl font-sofia font-black text-emon-accent flex items-center gap-4">
                  <User2 strokeWidth={3} size={25} />
                  {users.length}
                </h1>
                <h1 className="font-semibold text-emon-dark">Total User</h1>
              </div>
              <div className="shadow-md space-y-3 rounded-lg px-10 py-5 bg-white">
                <h1 className="text-4xl font-sofia font-black text-emon-accent">{commission[0].amount} <span className="text-sm">BDT</span></h1>
                <h1 className="font-semibold text-emon-dark">Total Earning</h1>
              </div>
            </div>

            <h1 className="text-4xl text-emon-accent font-sofia font-bold mt-10">Doctor list</h1>


            <div className="relative bg-white rounded-3xl shadow-xl mb-20 mt-5">
              <DoctorTable data={data} />
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default AdminDashboard