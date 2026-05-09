import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ParallaxBackground } from "@/components/layout/ParallaxBackground";
import { NeonParticles } from "@/components/layout/NeonParticles";
import { ChatBot } from "@/components/chat/ChatBot";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ParallaxBackground />
      <NeonParticles />
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
      <CartDrawer />
      <ChatBot />
    </>
  );
}
