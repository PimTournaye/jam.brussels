import prisma from "@lucia-sveltekit/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import lucia from "lucia-sveltekit";
import { dev } from "$app/environment";


const client = new PrismaClient();
// TODO: fix the secret to use proper environment variable 
export const auth = lucia({
    adapter: prisma(client),
    secret: process.env.LUCIA_SECRET as string,
    env: dev ? "DEV" : "PROD",
});