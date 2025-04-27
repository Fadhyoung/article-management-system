import Footer from "@/components/Footer";

export default function Layout({ children } : {children: React.ReactNode}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
        <div className="w-5/6 m-auto">
          {children}
        </div>        
        {/* Footer */}
      <Footer />
    </div>
  );
}