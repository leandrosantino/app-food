import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

type MenuProps = {
  params: Promise<{ catalog_slug: string }>;
};
export default async function Home({ params }: MenuProps) {
  const { catalog_slug } = await params;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="grid grid-cols-2 h-full">
            <div
              className="bg-cover bg-center animate-fade-in"
              style={{
                backgroundImage: `url(https://xpmrmuypbgnnknxjsjpe.supabase.co/storage/v1/object/public/product_images/hero-acai.jpg)`,
              }}
            />
            <div
              className="bg-cover bg-center animate-fade-in"
              style={{
                backgroundImage: `url(https://xpmrmuypbgnnknxjsjpe.supabase.co/storage/v1/object/public/product_images/hero-burger.jpg)`,
                animationDelay: "0.2s",
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Sabor que bate forte,
            </span>
            <br />
            <span className="text-foreground">energia que contagia!</span>
          </h1>
          <p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up"
            style={{
              animationDelay: "0.2s",
            }}
          >
            Açaí artesanal, lanches deliciosos e bebidas energizantes feitos com
            muito carinho
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{
              animationDelay: "0.4s",
            }}
          >
            <Link href={`/catalog/${catalog_slug}/menu`}>
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-glow hover:scale-105 transition-transform"
              >
                Fazer Pedido
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 hover:scale-105 transition-transform"
              >
                Pedir pelo WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Por que escolher o NEXUS?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Ingredientes Frescos",
                description:
                  "Usamos apenas os ingredientes mais frescos e de alta qualidade",
                icon: "🥑",
              },
              {
                title: "Entrega Rápida",
                description: "Preparo e entrega ágil através do WhatsApp",
                icon: "⚡",
              },
              {
                title: "Sabores Incríveis",
                description: "Receitas únicas que vão fazer você voltar sempre",
                icon: "😋",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-background p-8 rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                style={{
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Mais Pedidos</h2>
          <p className="text-center text-muted-foreground mb-12">
            Os favoritos dos nossos clientes que você não pode perder
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Açaí Clássico",
                price: "R$ 12,99",
                image: "hero-acai.jpg",
                rating: 5,
              },
              {
                name: "Hambúrguer com Bacon",
                price: "R$ 13,99",
                image: "hero-burger.jpg",
                rating: 5,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-2 group animate-fade-in"
                style={{
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                <div className="relative overflow-hidden h-64">
                  <Image
                    src={
                      "https://xpmrmuypbgnnknxjsjpe.supabase.co/storage/v1/object/public/product_images/" +
                      item.image
                    }
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <span className="text-2xl font-bold text-primary">
                      {item.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-accent">
                    {Array.from({
                      length: item.rating,
                    }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href={`/catalog/${catalog_slug}/menu`}>
              <Button size="lg" variant="outline" className="px-8">
                Ver Cardápio Completo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para sentir a energia?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Faça seu pedido agora e receba seu açaí ou lanche favorito
            rapidinho!
          </p>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 hover:scale-105 transition-transform shadow-glow"
            >
              Pedir pelo WhatsApp
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
