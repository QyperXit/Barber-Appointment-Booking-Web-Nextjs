import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const BarberGallery = ({}) => {
  return (
    <div className="mx-auto mt-20 mb-10 md:max-w-4xl">
      <div className="grid grid-cols-1 gap-2 mx-auto place-items-center sm:grid-cols-4 ">
        <div className="space-y-2">
          <img
            className="object-cover w-full border-4 sm:size-40 lg:size-60"
            src="https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <img
            className="object-cover w-full border-4 sm:size-40 lg:size-60"
            src="/1barber.webp"
          />
          <img
            className="object-cover w-full border-4 sm:size-40 lg:size-60"
            src="https://images.unsplash.com/photo-1557349800-5b9b168f3f53?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGJhcmJlciUyMGNsaXBzfGVufDB8fDB8fHww"
            alt="Image Description"
          />
        </div>
        <div className="space-y-2">
          <img
            className="object-cover w-full border-4 sm:size-40 lg:size-60"
            src="https://images.unsplash.com/photo-1514336937476-a5b961020a5c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image Description"
          />
          <img
            className="object-cover w-full border-4 sm:size-40 lg:size-60"
            src="/3barber.webp"
            alt="Image Description"
          />
          <img
            className="object-cover w-full border-4 sm:size-40 lg:size-60"
            src="/2barber.jpg"
            alt="Image Description"
          />
        </div>
        <div className="space-y-2">
          <img
            className="object-cover w-full border-4 sm:size-40 lg:size-60"
            src="https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <img
            className="object-cover w-full border-4 sm:size-40 lg:size-60"
            src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image Description"
          />
          <img
            className="object-cover w-full border-4 sm:size-40 lg:size-60"
            src="https://images.unsplash.com/photo-1523532931495-f51ebf4bc3a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGJhcmJlciUyMGhhaXIlMjBjdXR8ZW58MHx8MHx8fDA%3D"
            alt="Image Description"
          />
        </div>
        <div className="space-y-2">
          <img
            className="object-cover w-full border-4 sm:size-40 lg:size-60"
            src="https://images.unsplash.com/photo-1657105052497-f996284ffff8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGJhcmJlciUyMGNsaXBzfGVufDB8fDB8fHww"
            alt="Image Description"
          />
          <img
            className="object-cover w-full border-4 sm:size-40 lg:size-60"
            src="https://images.unsplash.com/photo-1536520002442-39764a41e987?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFyYmVyJTIwY2xpcHN8ZW58MHx8MHx8fDA%3D"
            alt="Image Description"
          />
          <img
            className="object-cover w-full border-4 sm:size-40 lg:size-60"
            src="https://plus.unsplash.com/premium_photo-1661382022096-d652c06cf1be?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image Description"
          />
        </div>
      </div>
    </div>
  );
};

export default BarberGallery;
