import { treaty } from "@elysiajs/eden";
import { app } from "@/app/api/[[...routes]]/route";

export const eden = treaty<typeof app>(window.location.host).api;
