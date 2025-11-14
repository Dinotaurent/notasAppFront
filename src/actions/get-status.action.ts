import { defineAction } from "astro:actions";

const URL = import.meta.env.URL_BASE;


export const getStatus = defineAction({


    handler: async () => {
        try {
            const res = await fetch(`${URL}/status`)
            // console.log(res.ok)
            return res.ok

        } catch (err) {
            return false
        }
    }
})