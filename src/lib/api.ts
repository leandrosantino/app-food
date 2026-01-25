import { treaty } from "@elysiajs/eden";
import { app } from "@/app/api/[[...routes]]/route";

export const api = treaty(app).api;
