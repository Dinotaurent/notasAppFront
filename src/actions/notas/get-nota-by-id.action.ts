import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

const URL = import.meta.env.URL_BASE

export const getNotaById = defineAction({

    input: z.string(),
    handler: async (notaId) => {

        try {
            const res = await fetch(`${URL}/notas/${notaId}`)
            return await res.json()
        } catch (err) {
            console.log(err)
            return { ok: false }
        }
    }

})