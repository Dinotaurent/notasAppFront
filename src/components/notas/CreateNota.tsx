import { createSignal, onMount } from "solid-js";
import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";

export default function CrearNotaForm() {
    const [titulo, setTitulo] = createSignal("");
    const [contenido, setContenido] = createSignal("");

    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal<string | null>(null);
    const [success, setSuccess] = createSignal(false);

    let dialogRef: HTMLDialogElement | undefined;

    async function retornar() {
        navigate("/notas/pagina/1");
    }

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const { error } = await actions.createNota({
                titulo: titulo(),
                contenido: contenido(),
            });

            if (error) {
                setError("Error creando nota. Verifica el backend.");
            } else {
                setSuccess(true);
                setTitulo("");
                setContenido("");
                dialogRef?.showModal();
            }
        } catch (err: any) {
            setError(err?.message ?? "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* ---------- FORMULARIO ---------- */}
            <form
                onSubmit={handleSubmit}
                class="w-full max-w-xl p-8 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl shadow-lime-500/10"
            >
                <h2 class="mb-8 text-3xl font-extrabold text-[#95E329] text-center">
                    ✍️ Registrar Nueva Nota
                </h2>

                {/* Campo Título */}
                <div class="mb-6">
                    <label for="titulo" class="block mb-2 text-sm font-medium text-gray-300">
                        Título
                    </label>
                    <input
                        type="text"
                        id="titulo"
                        required
                        placeholder="Título de la nota (ej. Ideas de Proyecto)"
                        class="w-full px-4 py-3 bg-gray-800 text-gray-100 rounded-lg border border-gray-700 placeholder-gray-500 focus:outline-none focus:border-[#95E329] focus:ring-1 focus:ring-[#95E329] transition duration-200"
                        value={titulo()}
                        onInput={(e) => setTitulo(e.currentTarget.value)}
                    />
                </div>

                {/* Campo Contenido */}
                <div class="mb-8">
                    <label
                        for="contenido"
                        class="block mb-2 text-sm font-medium text-gray-300"
                    >
                        Contenido
                    </label>
                    <textarea
                        id="contenido"
                        required
                        rows="6"
                        placeholder="Escribe el contenido de tu nota aquí..."
                        class="w-full px-4 py-3 bg-gray-800 text-gray-100 rounded-lg border border-gray-700 placeholder-gray-500 focus:outline-none focus:border-[#95E329] focus:ring-1 focus:ring-[#95E329] transition duration-200"
                        value={contenido()}
                        onInput={(e) => setContenido(e.currentTarget.value)}
                    ></textarea>
                </div>

                {/* Botones */}
                <div class="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => (window.location.href = "/notas/pagina/1")}
                        class="px-6 py-2 text-sm font-semibold rounded-md transition-colors duration-200 bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={loading()}
                        class="px-6 py-2 text-sm font-semibold rounded-md transition-colors duration-200 bg-[#95E329] text-[#1A1A1A] hover:bg-lime-400 focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading() ? "Guardando..." : "Guardar Nota"}
                    </button>
                </div>

                {/* Error */}
                {error() && (
                    <p class="mt-6 text-red-400 text-center">{error()}</p>
                )}
            </form>

            {/* ---------- DIALOG DE ÉXITO ---------- */}
            <dialog
                ref={dialogRef}
                class="backdrop:bg-black/70 p-0 rounded-xl overflow-hidden"
            >
                <div class="bg-gray-900 p-8 text-center border border-gray-700 rounded-xl shadow-2xl shadow-lime-500/20 w-[350px]">
                    <h3 class="text-2xl font-bold text-[#95E329] mb-4">
                        Nota creada 🎉
                    </h3>
                    <p class="text-gray-300 mb-6">
                        Tu nota fue registrada correctamente.
                    </p>
                    <div class="flex justify-center gap-3">
                        <button
                            class="mt-2 px-6 py-2 font-semibold  bg-gray-300 rounded hover:bg-gray-400"
                            onClick={retornar}
                        >
                            Volver
                        </button>
                        <button
                            onClick={() => dialogRef?.close()}
                            class="mt-2 px-6 py-2 font-semibold bg-[#95E329] text-black rounded-lg hover:bg-lime-400 transition"
                        >
                            Crear nueva
                        </button>

                    </div>
                </div>
            </dialog>
        </>
    );
}
