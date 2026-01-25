import { CartSummary } from "./components/cart-summary";
import { Product } from "@/services/product/product-schema";
import { ProductList } from "./components/product-list";
import { ProductFilters } from "./components/product-filters";
import { ProductsProvider } from "./contexts/products-context";
import { api } from "@/lib/api";
import z from "zod";
import { Category } from "@/services/category/category-schema";

type MenuProps = {
  params: Promise<{ catalog_id: "1" }>;
};

export default async function Menu({ params }: MenuProps) {
  const { catalog_id } = await params;

  let categories: Category[] = [];
  const categoryRequest = await api.category.get({
    query: {
      catalog_id: catalog_id,
    },
  });

  if (!categoryRequest.error) {
    categories = [{ id: 0, name: "Todos" }].concat(categoryRequest.data);
  }

  // const categories = [
  //   { id: "todos", name: "Todos" },
  //   { id: "acai", name: "Açaí" },
  //   { id: "lanches", name: "Lanches" },
  //   { id: "salgados", name: "Salgados" },
  //   { id: "bebidas", name: "Bebidas" },
  //   { id: "combos", name: "Combos" },
  // ];

  let products: Product[] = [];
  const { data, error } = await api.product.get({
    query: {
      catalog_id,
      category: "todos",
      text: "",
    },
  });

  if (!error) {
    products = data;
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 animate-fade-in">
          Nosso Cardápio
        </h1>
        <ProductsProvider {...{ products, categories }}>
          <ProductFilters />
          <div className="grid lg:grid-cols-3 gap-8">
            <ProductList />
            <CartSummary />
          </div>
        </ProductsProvider>
      </div>
    </div>
  );
}
