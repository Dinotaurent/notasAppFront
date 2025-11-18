import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

const URL = import.meta.env.URL_BASE

export const updateNota = defineAction({

    input: z.object({
        name: z.string(),
    }),
    handler: async (input) => {
        return ""
    }
})
