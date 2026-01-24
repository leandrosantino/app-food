import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const reviews = [
  {
    id: 1,
    name: "Maria Silva",
    rating: 5,
    comment:
      "O melhor açaí que já comi! Ingredientes frescos e sabor incrível. Super recomendo!",
    date: "há 2 dias",
  },
  {
    id: 2,
    name: "João Santos",
    rating: 5,
    comment:
      "Hambúrgueres perfeitos e entrega super rápida pelo WhatsApp. PICA PAL é meu lugar favorito agora!",
    date: "há 1 semana",
  },
  {
    id: 3,
    name: "Ana Costa",
    rating: 5,
    comment:
      "Adoro a variedade de opções! O açaí com morango é meu favorito. Sempre fresco e delicioso!",
    date: "há 2 semanas",
  },
  {
    id: 4,
    name: "Pedro Oliveira",
    rating: 5,
    comment:
      "Preços ótimos, qualidade incrível. O sanduíche de frango é sensacional!",
    date: "há 3 semanas",
  },
  {
    id: 5,
    name: "Carla Mendes",
    rating: 5,
    comment:
      "Meus filhos amam os açaís e eu amo que sejam saudáveis! Ganha-ganha!",
    date: "há 1 mês",
  },
  {
    id: 6,
    name: "Lucas Ferreira",
    rating: 5,
    comment:
      "Melhor lanchonete da cidade. A energia que o açaí deles dá é real!",
    date: "há 1 mês",
  },
];

const Reviews = () => {
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 animate-fade-in">
          Depoimentos dos Clientes
        </h1>

        {/* Rating Summary */}
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <div className="bg-card p-8 rounded-2xl shadow-soft animate-scale-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="h-8 w-8 fill-accent text-accent" />
              <span className="text-5xl font-bold">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.floor(averageRating)
                      ? "fill-accent text-accent"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-muted-foreground">
              Baseado em {totalReviews} avaliações
            </p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, idx) => (
            <Card
              key={review.id}
              className="p-6 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{review.name}</h3>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {review.comment}
              </p>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto mt-16 text-center bg-gradient-primary text-white p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Ama o PICA PAL?</h2>
          <p className="mb-6">
            Compartilhe sua experiência conosco nas redes sociais!
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              @picapal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
