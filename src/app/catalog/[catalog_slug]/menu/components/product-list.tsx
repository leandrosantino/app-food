"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { priceFormatter } from "@/formatters/priceFormatter";
import { Product } from "@/services/product/product-schema";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useProducts } from "../contexts/products-context";

export function ProductList() {
  const { addItem } = useCart();
  const { products } = useProducts();

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
    });
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className="lg:col-span-2">
      <div className="grid md:grid-cols-2 gap-6">
        {products?.map((product, idx) => (
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
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  {priceFormatter(product.price)}
                </span>
                <Button onClick={() => handleAddToCart(product)} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
