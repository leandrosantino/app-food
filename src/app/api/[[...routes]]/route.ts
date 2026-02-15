import { catalogController } from "@/services/catalog/catalog-controller";
import { categoryController } from "@/services/category/category-controller";
import { productController } from "@/services/product/product-controller";
import { treaty } from "@elysiajs/eden";
import { Elysia } from "elysia";

export const app = new Elysia({ prefix: "/api" })
  .use(productController)
  .use(categoryController)
  .use(catalogController);
export const api = treaty(app).api;

export const GET = app.fetch;
export const POST = app.fetch;
export const PUT = app.fetch;
export const DELETE = app.fetch;
