import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { prisma } from "@lucia-auth/adapter-prisma";
import { prisma as client } from "./prisma"

export const auth = lucia({
	env: dev ? "DEV" : "PROD",
	middleware: sveltekit(),
	adapter: prisma(client, {
		user: 'user',
		key: 'key',
		session: 'authSession'
	}),
	getUserAttributes: (data) => {
			return {
				id: data.id,
			}
	},
	
});

export type Auth = typeof auth;