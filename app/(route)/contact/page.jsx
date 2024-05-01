import React from "react";

import { MapIcon, PhoneCallIcon } from "lucide-react";

const Contact = () => {
  return (
    <section className="flex flex-col items-center mt-12 text-white gap-y-8">
      <h1 className="text-5xl font-bold ">GET IN TOUCH</h1>

      <div className="flex flex-col items-center justify-center gap-20 m-12 md:flex-row ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d559.8514543602671!2d-1.85289099856035!3d52.45258012468219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bbc005471653%3A0xa6301f641b71c3d6!2s%22G%22%20Barbers!5e0!3m2!1sen!2suk!4v1714605833394!5m2!1sen!2suk"
          // width="600"
          height="450"
          className="border-[8px] border-white object-contain md:w-[500px] sm:w-[300px] lg:w-[600px] "
          // style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="flex justify-center md:flex-col gap-14">
          <div>
            <MapIcon className="mx-auto scale-150 " />
            <h1 className="mt-3 text-2xl font-bold text-center ">Address</h1>
            <h2 className="mt-3 ">G|Barbers</h2>
            <p>401 Warwick Road</p>
            <p>Tesley</p>
            <p>Birmingham B11 2JR</p>
          </div>
          <div>
            <PhoneCallIcon className="mx-auto scale-150" />
            <h1 className="mt-3 text-2xl font-bold text-center">Phone</h1>
            <h2 className="mt-3 ">G|Barbers</h2>
            <p>+44 752 772 967</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
