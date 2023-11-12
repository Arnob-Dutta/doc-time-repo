import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { getSingleDoctors } from "@/lib/actions/doctor.action"
import Image from "next/image"
import Link from "next/link"

const DocDetails = async ({ params }: { params: { uid: string } }) => {

  const doctor_id = params.uid

  const res = await getSingleDoctors({ uid: doctor_id })

  return (
    <>
      <Navbar />
      <div className="bg-slate-200 min-h-[80vh]">
        <div className="container px-20 py-10">
          <div className="bg-emon-light rounded-lg shadow-lg p-4">
            <div className="flex py-10 flex-col justify-center items-center">

              <div>
                <Image src={res.thumbnail} alt="doc" height={100} width={150} />
              </div>

              <div className="space-y-6 text-center">
                <h1 className="text-4xl font-sofia font-black text-emon-accent mt-10">{res.name}</h1>

                <h2 className="text-lg font-semibold">{res.title}</h2>

                <p className="text-emon-accent">{res.desc}</p>

                <div className="mt-10">
                  <Link href={`/appointment/${doctor_id}`}><Button>Get Appointment ( {res.fee} BDT ) </Button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DocDetails