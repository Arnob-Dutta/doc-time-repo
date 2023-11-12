import Appointment from "@/components/Appointment";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AboutUs from "@/components/section/AboutUs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <Navbar />

      <section className="bg-slate-200 min-h-[90vh]">
        <div className="container px-20">
          <div className="flex gap-20 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl font-sofia font-black text-emon-accent">Get an Appointment with a Highly skill Doctor online.</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, voluptas exercitationem. Quaerat, asperiores earum. Totam esse enim tempora fuga fugit?</p>
              <div>
                <Link href={"/appointment"}><Button className="h-10">Get Started</Button></Link>
              </div>
            </div>

            <AspectRatio ratio={16 / 9} className="relative p-4">
              <Image src={"/img/doc.svg"} alt="hero pic" fill />
            </AspectRatio>
          </div>
        </div>
      </section>

      <Appointment />

      <AboutUs />

      <Footer />
    </>
  )
}
