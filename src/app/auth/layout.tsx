import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/4 p-10 flex flex-col gap-6 items-center justify-center rounded-xl bg-white">
        <Image src={"/images/img_icon.png"} alt="logo" width={150} height={150} />
        {children}
      </div>
    </div>
  );
}
