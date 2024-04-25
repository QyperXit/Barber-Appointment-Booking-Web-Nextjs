import React from "react";

import { MapIcon, PhoneCallIcon } from "lucide-react";

const Contact = () => {
  return (
    <section className="flex flex-col items-center mt-12 text-white gap-y-8">
      <h1 className="text-5xl font-bold ">GET IN TOUCH</h1>

      <div className="flex justify-center gap-8 ">
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
    </section>
  );
};

export default Contact;
