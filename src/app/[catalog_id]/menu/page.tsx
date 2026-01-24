"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus, Search, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { priceFormatter } from "@/formatters/priceFormatter";
import { useGetProducts } from "@/services/product/product-query";
import { Product } from "@/services/product/product-schema";
import { useParams } from "next/navigation";

const Menu = () => {
  const { catalog_id } = useParams<{ catalog_id: string }>();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    updateNote,
    clearCart,
    total,
  } = useCart();

  const categories = [
    { id: "todos", name: "Todos" },
    { id: "acai", name: "Açaí" },
    { id: "lanches", name: "Lanches" },
    { id: "salgados", name: "Salgados" },
    { id: "bebidas", name: "Bebidas" },
    { id: "combos", name: "Combos" },
  ];

  const { data: products, ...productQuery } = useGetProducts({
    category: selectedCategory,
    text: searchTerm,
    catalog_id,
  });

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
    });
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const handleWhatsAppOrder = () => {
    if (items.length === 0) {
      toast.error("Seu carrinho está vazio!");
      return;
    }

    let message = "*Pedido PICA PAL*\n\n";
    items.forEach((item) => {
      message += `*${item.quantity}x ${item.name}*\n`;
      message += `   Preço: ${priceFormatter(item.price)}\n`;
      if (item.note) {
        message += `   Observação: ${item.note}\n`;
      }
      message += `\n`;
    });
    message += `\n*Total: ${priceFormatter(total)}*`;

    const phoneNumber = "5581993766292";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");

    toast.success("Pedido enviado para o WhatsApp!");
    clearCart();
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 animate-fade-in">
          Nosso Cardápio
        </h1>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar açaí, hambúrguer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Products Grid */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {!productQuery.isLoading &&
                products?.map((product, idx) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover:shadow-glow transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          {priceFormatter(product.price)}
                        </span>
                        <Button
                          onClick={() => handleAddToCart(product)}
                          size="sm"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 shadow-glow">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingCart className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Seu Pedido</h2>
              </div>

              {items.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Seu carrinho está vazio
                </p>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="border-b border-border pb-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {priceFormatter(item.price)} cada
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <span className="ml-auto font-semibold">
                            {priceFormatter(item.price * item.quantity)}
                          </span>
                        </div>

                        <Textarea
                          placeholder="Observações (ex: sem leite condensado)"
                          value={item.note || ""}
                          onChange={(e) => updateNote(item.id, e.target.value)}
                          className="text-sm"
                          rows={2}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xl font-bold border-t border-border pt-4">
                      <span>Total:</span>
                      <span className="text-primary">
                        {priceFormatter(total)}
                      </span>
                    </div>

                    <Button
                      onClick={handleWhatsAppOrder}
                      className="w-full text-lg py-6"
                      size="lg"
                    >
                      Enviar Pedido pelo WhatsApp
                    </Button>

                    <Button
                      onClick={clearCart}
                      variant="outline"
                      className="w-full"
                    >
                      Limpar Carrinho
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
