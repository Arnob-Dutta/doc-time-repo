
import { docList, docType } from "@/lib/constent"
import DoctorCard from "./DoctorCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getDoctors } from "@/lib/actions/doctor.action"


const Appointment = async () => {

  const res = await getDoctors()


  return (
    <section className="py-32">
      <div className="container px-20">
        <h1 className="font-sofia text-4xl text-emon-accent font-black mb-10">
          Get Appointment
        </h1>

        <Tabs defaultValue={docType[0]} className="w-full">
          <TabsList className="bg-transparent mb-10 gap-4">
            {docType.map((doc) => (
              <TabsTrigger value={doc} className="h-10 border-2 border-emon-accent rounded-full hover:bg-emon-accent hover:text-white px-4" key={doc}>{doc}</TabsTrigger>
            ))}
          </TabsList>
          {docType.map((doc_type) => (
            <TabsContent value={doc_type} className="w-full" key={doc_type}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {res.map(dlist => (doc_type === dlist.
                  specialty && <DoctorCard key={dlist._id} fee={dlist.fee} id={dlist._id} name={dlist.name} thumb={dlist.thumbnail} title={dlist.title} />))}
              </div>
            </TabsContent>
          ))}


        </Tabs>


        {/* <div className="flex gap-4 flex-wrap mb-10">
          {docType.map((doc) => (
            <Button className={`h-10 ${selectDocType === doc ? "bg-emon-accent text-emon-light" : "bg-transparent text-emon-accent"} border-2 border-emon-accent rounded-full hover:bg-emon-accent hover:text-white`} key={doc}>{doc}</Button>
          ))}
        </div> */}

      </div>
    </section>
  )
}

export default Appointment