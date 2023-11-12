"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'

const TestPage = () => {
  const ticket = "OS8CW"
  const Invoice = "#Z3LPQ6XHMY7CULF"
  return (
    <div className='bg-white container px-20 pb-20'>
      <div className="py-10 flex gap-4 justify-end print:hidden">
        <Button onClick={() => window.print()}>Print</Button>
      </div>
      <div className="bg-emon-accent text-white text-xl p-10 rounded-xl" id='pdf'>
        <div className="flex gap-3 items-center mb-7">
          <Image src={"/logo.svg"} alt="logo" height={32} width={32} />
          <h1 className="text-2xl font-sofia font-black text-emon-light">Doc_Time</h1>
        </div>
        I'm <span className='font-black font-sofia'>Md Jahidul Islam</span> . I'm get an appointment with <span className='font-black font-sofia'>Dr Furkan Miya</span> in <span className='font-black font-sofia'>17/12/23</span> at 3:00 PM GM +6 <br /><br />
        My ticket is : <span className='font-black font-sofia'>{ticket}</span> <br /><br />
        Pay : <span className='font-black font-sofia'>1600 BDT</span> <br /><br />
        Invoice no : <span className='font-black font-sofia'>#{Invoice}</span> <br /><br />
        <h1>
          <span className='font-black font-sofia'>Terms & Condition :</span> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo et alias beatae rem perspiciatis corrupti laudantium sunt impedit, adipisci pariatur saepe voluptatem labore! Temporibus fugit error eos libero nobis quas.
        </h1>
      </div>

    </div>
  )
}

export default TestPage