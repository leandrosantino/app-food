import { useQuery } from "@tanstack/react-query";
import { Product, ProductFilters } from "./product-schema";
import { eden } from "@/lib/eden";

export function useGetProducts(filters: ProductFilters) {
  return useQuery<Product[], QueryError>({
    queryKey: ["products", filters],
    queryFn: async () => {
      const { data, error } = await eden.product.get({
        query: filters,
      });
      if (error)
        throw {
          code: error.status,
          message: error.value.message,
        };
      return data;
    },
  });
}

export type QueryError = {
  message: string;
  code: string;
};
