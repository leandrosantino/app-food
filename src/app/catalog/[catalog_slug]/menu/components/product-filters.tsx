"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useProducts } from "../contexts/products-context";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ProductFilters() {
  const {
    selectedCategory,
    setSelectedCategory,
    categories,
    searchTerm,
    setSearchTerm,
  } = useProducts();

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const getPlaceholder = () =>
    categories
      .map((item) => item.name)
      .splice(1, 3)
      .join(", ");

  return (
    <div className="mb-8 space-y-4">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={`Buscar ${getPlaceholder()}...`}
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
              selectedCategory === category.id.toString()
                ? "default"
                : "outline"
            }
            onClick={() => setSelectedCategory(category.id.toString())}
            className="rounded-full"
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
