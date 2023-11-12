import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import AppointmentFrom from '@/components/from/AppointmentFrom'
import { getSingleDoctors } from '@/lib/actions/doctor.action'
import { getServerSession } from 'next-auth'
import Image from 'next/image'

const AppointmentPage = async ({ params }: { params: { aid: string } }) => {

  const id = params.aid
  const res = await getSingleDoctors({ uid: id })
  const session = await getServerSession()
  const userEmail = session?.user?.email

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] bg-emon-light container px-20 py-10">
        <div className="grid md:grid-cols-2 bg-emon-accent rounded-lg gap-5 py-10 px-5 text-white">
          <div className='flex flex-col items-center justify-center gap-4'>
            <Image src={res.thumbnail} alt={res.name} width={200} height={250} objectFit='cover' />
            <h1 className='text-3xl font-sofia font-bold'>{res.name}</h1>
            <h1 className='text-xl font-sofia font-semibold'>{res.specialty}</h1>
            <h1 className='text-md text-center'>{res.title}</h1>
          </div>
          <div>
            <h1 className='text-3xl font-sofia font-bold mb-8'>Get Appointment</h1>

            <AppointmentFrom commission={res.commission} fee={res.fee} name={res.name} userEmail={userEmail} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AppointmentPage