"use client";
import { Category } from "@/services/category/category-schema";
import { Product } from "@/services/product/product-schema";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type ProductsContextType = {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  categories: Category[];
  products: Product[];
};

type ProductsProviderProps = {
  children: ReactNode;
  products: Product[];
  categories: Category[];
};

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export function ProductsProvider({
  children,
  products,
  categories,
}: ProductsProviderProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("0");
  const [searchTerm, setSearchTerm] = useState("");

  const [productsState, setProductsState] = useState<Product[]>([]);

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "0" ||
        product.category_id.toString() === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    setProductsState(filteredProducts);
  }, [selectedCategory, searchTerm, products]);

  return (
    <ProductsContext.Provider
      value={{
        searchTerm,
        selectedCategory,
        setSelectedCategory,
        setSearchTerm,
        categories,
        products: productsState,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error("");
  return context;
}
