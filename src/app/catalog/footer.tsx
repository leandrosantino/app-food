import { phoneNumberFromatter } from "@/formatters/phoneNumberFromatter";
import { getCatalogBySlug } from "@/services/catalog/catalog-controller";
import { Address, Catalog } from "@/services/catalog/catalog-schema";
import { Instagram, MessageCircle } from "lucide-react";
import Link from "next/link";

type Props = {
  catalog: Catalog;
  address: Address | null;
};

export default function Footer({ catalog, address }: Props) {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {catalog.name}
            </h3>
            <p className="text-muted-foreground text-sm">{catalog.slogan}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href={`/catalog/${catalog.slug}/home`}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Início
              </Link>
              <Link
                href={`/catalog/${catalog.slug}/menu`}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Produtos
              </Link>
              <Link
                href={`/catalog/${catalog.slug}/about`}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Sobre Nós
              </Link>
              <Link
                href={`/catalog/${catalog.slug}/reviews`}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Depoimentos
              </Link>
              <Link
                href={`/catalog/${catalog.slug}/contact`}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Contato
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>WhatsApp: {phoneNumberFromatter(catalog.phone_number)}</p>
              <p>Email: {catalog.email}</p>
              <p className="text-muted-foreground">
                {address?.street}, {address?.number}
              </p>
              <p>
                {address?.city} - {address?.state}, CEP: {address?.zip_code}
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Siga-nos</h4>
            <div className="flex space-x-4">
              <a
                href={catalog.instagran_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href={`https://wa.me/${catalog.phone_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {catalog.name.toUpperCase()}.
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
