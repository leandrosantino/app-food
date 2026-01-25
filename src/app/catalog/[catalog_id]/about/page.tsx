import { Heart, Users, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
          Sobre o NEXUS
        </h1>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in-up">
              <img
                src={
                  "https://xpmrmuypbgnnknxjsjpe.supabase.co/storage/v1/object/public/product_images/hero-acai.jpg"
                }
                alt="História do PICA PAL"
                className="rounded-2xl shadow-soft"
              />
            </div>
            <div
              className="space-y-4 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="text-3xl font-bold mb-4">Nossa História</h2>
              <p className="text-muted-foreground leading-relaxed">
                O NEXUS nasceu da paixão pelo açaí artesanal e pela comida
                saudável e saborosa. Acreditamos que comer bem não precisa ser
                complicado nem sem graça.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Cada tigela, lanche e bebida é preparado com carinho e os
                ingredientes mais frescos. Nossa missão é trazer energia e sabor
                para o seu dia, uma mordida de cada vez.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Desde nossos famosos açaís até os hambúrgueres suculentos, tudo
                é feito na hora com uma qualidade que você pode sentir no sabor.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Heart,
              title: "Feito com Amor",
              description:
                "Cada item é preparado com cuidado e paixão pela boa comida",
            },
            {
              icon: Users,
              title: "Comunidade em Primeiro Lugar",
              description:
                "Orgulho de servir nossa comunidade local com a melhor qualidade",
            },
            {
              icon: Award,
              title: "Ingredientes de Qualidade",
              description:
                "Somente os ingredientes mais frescos e de alta qualidade",
            },
          ].map((value, idx) => (
            <div
              key={idx}
              className="text-center p-8 bg-card rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <value.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Conheça Nossa Equipe</h2>
          <p className="text-muted-foreground mb-8">
            As pessoas apaixonadas por trás dos seus açaís e lanches favoritos
          </p>
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <p className="text-lg text-muted-foreground">
              Nossa equipe dedicada trabalha duro todos os dias para trazer o
              melhor açaí, lanches e salgados. Somos uma família que ama o que
              faz, e mal podemos esperar para servir você!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
