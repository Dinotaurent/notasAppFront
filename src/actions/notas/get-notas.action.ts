import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

const URL = import.meta.env.URL_BASE

export const getNotas = defineAction({
    accept: "json",
    input: z.object({
        page: z.number().optional().default(1),
        limit: z.number().optional().default(10),
    }),
    handler: async ({ page, limit }) => {
        try {
            const res = await fetch(
                `${URL}/notas?page=${page}&limit=${limit}`,
                { cache: "no-store" }
            );

            if (!res.ok) {
                throw new Error(`Error al obtener notas: ${res.status}`);
            }

            // Esperamos que el backend ya devuelva { data, page, pages }
            return await res.json();
        } catch (error) {
            console.error("❌ Error en getNotas:", error);
            return { data: [], page: 1, pages: 1 };
        }
    },

})