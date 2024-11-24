import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import barber from "../../../../public/2barber.jpg";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex items-end h-32 bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt=""
            src="/2barber.jpg"
            className="absolute inset-0 object-cover w-full h-full opacity-80"
            width={800}
            height={800}
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>

              <Image width={60} height={60} src="/barber.png" alt="logo" />
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to G|Barbers 🪒
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative block -mt-16 lg:hidden">
              <a
                className="inline-flex items-center justify-center text-blue-600 bg-white rounded-full size-16 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>

                <Image width={70} height={70} src="/barber.png" alt="logo" />
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to G|barbers 🪒
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p>
            </div>
            <div className="mt-5 ">
              <SignIn />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
