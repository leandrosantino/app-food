import { CartProvider } from "@/contexts/CartContext";
import Providers from "../providers";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "../navbar";
import Footer from "../footer";
import { getCatalogBySlug } from "@/services/catalog/catalog-controller";

type Props = {
  params: Promise<{ catalog_slug: string }>;
  children: React.ReactNode;
};

export default async function RootLayout({ children, params }: Props) {
  const { catalog_slug } = await params;

  const catalog = await getCatalogBySlug(catalog_slug);

  if (!catalog) {
    return (
      <div className="min-h-screen">
        Erro inesperado na página, o catálog não existe!!
      </div>
    );
  }

  return (
    <Providers>
      <CartProvider>
        <Navbar {...{ catalog }} />
        <main className="flex-1">{children}</main>
        <Footer {...{ catalog }} />
        <WhatsAppButton />
      </CartProvider>
    </Providers>
  );
}
