import { options } from "@/app/api/auth/[...nextauth]/options"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import ViewAppointment from "@/components/ViewAppointment"
import { getSingleAppointment } from "@/lib/actions/appointment.action"
import { getServerSession } from "next-auth"



const PrintAppointment = async ({ params }: { params: { aid: string } }) => {

  const aid = params.aid
  const res = await getSingleAppointment({ aid })
  const session = await getServerSession(options)

  return (
    <>
      <div className="print:hidden">
        <Navbar />
      </div>
      <ViewAppointment date={res.date.slice(0, 15)} doctorName={res.doctorName} fee={res.fee} invoice={res.invoice} ticket={res.ticket} time={res.time} name={session?.user?.name} />
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  )
}

export default PrintAppointment