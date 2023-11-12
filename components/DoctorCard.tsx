import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card"
import { AspectRatio } from "./ui/aspect-ratio"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

type PageProps = {
  thumb: string,
  name: string,
  fee: number,
  id: string,
  title: string
}

const DoctorCard = ({ id, thumb, title, fee, name }: PageProps) => {

  return (
    <>
      <Card className="border-0 flex flex-col justify-between shadow-lg">
        <div>
          <CardHeader className="px-16 bg-slate-100">
            <AspectRatio ratio={4 / 4} className="bg-muted">
              <Image
                src={thumb}
                alt="thumbnail"
                fill
                className="object-cover "
              />
            </AspectRatio>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2">
              <h1 className="text-2xl text-emon-accent font-black font-sofia">
                {name}
              </h1>
              <p className="text-md font-semibold">{title}</p>
              <h1 className="text-xl text-emon-accent font-black">
                {fee} BDT
              </h1>
            </div>
          </CardContent>
        </div>
        <CardFooter>

          <div className="flex justify-between w-full">
            <Link href={`/appointment/${id}`}>
              <Button>Get Appointment</Button>
            </Link>

            <Link href={`/details/${id}`}>
              <Button variant={"link"}>Details</Button>
            </Link>
          </div>

        </CardFooter>
      </Card>
    </>
  )
}

export default DoctorCard