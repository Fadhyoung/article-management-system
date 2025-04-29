import Footer from "@/components/Footer";

export default function Layout({ children } : {children: React.ReactNode}) {
  return (
    <div className="min-h-screen h-full flex flex-col justify-between bg-white">
        {children}
        {/* Footer */}
      <Footer />
    </div>
  );
}