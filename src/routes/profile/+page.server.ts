import type { PageServerLoad, Actions } from "./$types";
import { z } from "zod";

const schema = z.object({
	username: z.string(),
});

export const load: PageServerLoad = async () => {
	return { disable: true };
};
