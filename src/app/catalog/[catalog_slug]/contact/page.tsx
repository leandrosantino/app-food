import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import {
  getAddressByCatalog,
  getCatalogBySlug,
  getOpeningHoursByCatalog,
} from "@/services/catalog/catalog-controller";
import { ca } from "zod/v4/locales";
import { phoneNumberFromatter } from "@/formatters/phoneNumberFromatter";

type Props = {
  params: Promise<{ catalog_slug: string }>;
};

export default async function Contact({ params }: Props) {
  const { catalog_slug } = await params;

  const catalog = await getCatalogBySlug(catalog_slug);
  if (!catalog) return;

  const address = await getAddressByCatalog(catalog.id);
  const openingHours = await getOpeningHoursByCatalog(catalog?.id);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 animate-fade-in">
          Entre em Contato
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Tem alguma dúvida ou pedido especial? Adoraríamos ouvir você!
        </p>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="p-8 shadow-soft animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6">Envie uma mensagem</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Nome
                </label>
                <Input id="name" type="text" required placeholder="Seu nome" />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2"
                >
                  Telefone
                </label>
                <Input id="phone" type="tel" placeholder="(11) 99999-9999" />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  required
                  placeholder="Conte-nos o que está pensando..."
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Enviar Mensagem
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div
            className="space-y-6 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Card className="p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Endereço</h3>
                  <p className="text-muted-foreground">
                    {address?.street}, {address?.number}
                    <br />
                    {address?.city} - {address?.state}, CEP: {address?.zip_code}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Telefone & WhatsApp</h3>
                  <p className="text-muted-foreground">
                    {phoneNumberFromatter(catalog?.phone_number)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">{catalog?.email}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Horário de Funcionamento
                  </h3>
                  <div className="text-muted-foreground space-y-1">
                    {openingHours.map((item) => (
                      <p key={item.id}>
                        {item.day_of_week}:{" "}
                        {item.status === "aberto" ? (
                          `${item.open_time}h - ${item.close_time}h`
                        ) : (
                          <span className="text-red-500">{item.status}</span>
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Google Maps Embed */}
            {/*<Card className="overflow-hidden shadow-soft">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976167992536!2d-46.65543368502205!3d-23.561414684682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização PICA PAL"
              />
            </Card>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
