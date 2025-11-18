import { createSignal } from "solid-js";
import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";

export default function EditarNotaForm(props: { nota: any; }) {
    const nota = props.nota;

    const [titulo, setTitulo] = createSignal(nota.titulo);
    const [contenido, setContenido] = createSignal(nota.contenido);

    const [loading, setLoading] = createSignal(false);
    let dialogRef: HTMLDialogElement;

    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await actions.updateNota({
                id: nota.id,
                titulo: titulo(),
                contenido: contenido(),
            });

            if (error) {
                alert("Error actualizando la nota");
                return;
            }

            // dialog de éxito
            dialogRef.showModal();

            // cerrar y navegar
            setTimeout(() => {
                dialogRef.close();
                navigate("/notas/pagina/1");
            }, 1200);

        } catch (err) {
            alert("Error inesperado: " + err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                class="w-full max-w-xl p-8 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl shadow-lime-500/10"
            >
                <h2 class="mb-8 text-3xl font-extrabold text-[#95E329] text-center">
                    ✏️ Editar Nota
                </h2>

                {/* Título */}
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-300">
                        Título
                    </label>
                    <input
                        type="text"
                        required
                        value={titulo()}
                        onInput={(e) => setTitulo(e.currentTarget.value)}
                        class="w-full px-4 py-3 bg-gray-800 text-gray-100 rounded-lg border border-gray-700 focus:outline-none focus:border-[#95E329] focus:ring-1 focus:ring-[#95E329]"
                    />
                </div>

                {/* Contenido */}
                <div class="mb-8">
                    <label class="block mb-2 text-sm font-medium text-gray-300">
                        Contenido
                    </label>
                    <textarea
                        rows="6"
                        required
                        value={contenido()}
                        onInput={(e) => setContenido(e.currentTarget.value)}
                        class="w-full px-4 py-3 bg-gray-800 text-gray-100 rounded-lg border border-gray-700 focus:outline-none focus:border-[#95E329] focus:ring-1 focus:ring-[#95E329]"
                    ></textarea>
                </div>

                {/* Botones */}
                <div class="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(`/notas/${nota.id}`)}
                        class="px-6 py-2 text-sm bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={loading()}
                        class="px-6 py-2 text-sm bg-[#95E329] text-[#1A1A1A] rounded hover:bg-lime-400 disabled:opacity-50"
                    >
                        {loading() ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </div>
            </form>

            {/* Dialog */}
            <dialog
                ref={(el) => (dialogRef = el)}
                class="rounded-xl p-6 bg-gray-800 text-white border border-gray-600"
            >
                <p class="text-lg mb-4">Nota actualizada correctamente 🎉</p>
            </dialog>
        </>
    );
}
