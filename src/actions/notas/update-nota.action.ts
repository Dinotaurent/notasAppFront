import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

const URL = import.meta.env.URL_BASE

export const updateNota = defineAction({
    input: z.object({
        id: z.string(),
        titulo: z.string().min(1),
        contenido: z.string().min(1),
    }),
    handler: async ({ id, titulo, contenido }) => {
        try {
            const res = await fetch(`${URL}/notas/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ titulo, contenido }),
            });

            if (!res.ok) {
                return { ok: false };
            }

            const data = await res.json();

            return { ok: true, nota: data };

        } catch (err) {
            console.log(err);
            return { ok: false, error: err };
        }
    },
})
