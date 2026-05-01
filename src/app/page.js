import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className=" container mx-auto ">
        <button className=" btn btn-ghost"></button>
        <Image
          src={
            "https://images.unsplash.com/photo-1773332585815-f106a5d6ed6c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          width={500}
          height={500}
          alt="img"
        />
      </main>
    </div>
  );
}
