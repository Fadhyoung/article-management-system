export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-fit p-10 flex items-center justify-center rounded-xl bg-white">
        {children}
      </div>
    </div>
  );
}
