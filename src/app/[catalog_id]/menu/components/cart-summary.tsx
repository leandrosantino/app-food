"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { priceFormatter } from "@/formatters/priceFormatter";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function CartSummary() {
  const { items, removeItem, updateQuantity, updateNote, clearCart, total } =
    useCart();

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
                <div key={item.id} className="border-b border-border pb-4">
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
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                <span className="text-primary">{priceFormatter(total)}</span>
              </div>

              <Button
                onClick={handleWhatsAppOrder}
                className="w-full text-lg py-6"
                size="lg"
              >
                Enviar Pedido pelo WhatsApp
              </Button>

              <Button onClick={clearCart} variant="outline" className="w-full">
                Limpar Carrinho
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
