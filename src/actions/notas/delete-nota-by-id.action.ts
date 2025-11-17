import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';


const URL = import.meta.env.URL_BASE

export const deleteNotaById = defineAction({

    input: z.string(),
    handler: async (notaId) => {

        try {
            console.log("Se ejecuta el server action")
            const res = await fetch(`${URL}/notas/${notaId}`, { method: "DELETE" })


            if (!res.ok) {
                const text = await res.text().catch(() => String(res.status));
                throw new Error(`Backend DELETE failed: ${res.status} ${text}`);
            }
            return { ok: res.ok }


        } catch (err: any) {
            console.error("Error deleteNota:", err);
            return { ok: false, error: String(err?.message ?? err) };
        }
    }

});