import { CartProvider } from "@/contexts/CartContext";
import Providers from "./providers";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "./navbar";
import Footer from "./footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <CartProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </CartProvider>
    </Providers>
  );
}
