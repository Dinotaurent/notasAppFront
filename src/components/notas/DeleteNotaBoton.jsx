import { actions } from "astro:actions";
import { createSignal } from "solid-js";
import { navigate } from "astro:transitions/client";

export default function DeleteNoteButton(props) {
    const { noteId, onDeleted } = props;
    const [loading, setLoading] = createSignal(false);

    let confirmDialog;
    let successDialog;
    let errorDialog;

    async function handleDelete() {
        confirmDialog.showModal();
    }

    async function confirmDeletion() {
        confirmDialog.close();
        setLoading(true);

        try {
            const { error } = await actions.deleteNotaById(noteId);

            if (error) {
                errorDialog.showModal();
                return;
            }

            successDialog.showModal();

            setTimeout(() => {
                successDialog.close();

                if (onDeleted) onDeleted(noteId);

                navigate("/notas/pagina/1");
            }, 1200);

        } catch (err) {
            console.error(err);
            errorDialog.showModal();
        } finally {
            setLoading(false);
        }
    }

    function cancelDeletion() {
        confirmDialog.close();
    }

    return (
        <>
            <button
                class="btn-delete bg-linear-to-r from-red-400 via-red-500 to-red-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 text-black"
                disabled={loading()}
                onClick={handleDelete}
            >
                <span class="text-1xl">{loading() ? "..." : "☠🪦 Eliminar"}</span>

            </button>

            {/* CONFIRMAR */}
            <dialog ref={confirmDialog} class="dialog-box">
                <div class="text-center p-4">
                    <h3 class="text-lg font-bold mb-2">¿Eliminar esta nota?</h3>
                    <p class="text-sm mb-4 text-gray-700">Esta acción no se puede deshacer.</p>

                    <div class="flex justify-center gap-3">
                        <button
                            class="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={cancelDeletion}
                        >
                            Cancelar
                        </button>
                        <button
                            class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            onClick={confirmDeletion}
                        >
                            Sí, eliminar
                        </button>
                    </div>
                </div>
            </dialog>

            {/* ÉXITO */}
            <dialog ref={successDialog} class="dialog-box">
                <div class="p-4 text-center">
                    <h3 class="text-lg font-semibold mb-2">Eliminado</h3>
                    <p class="text-gray-700">La nota fue eliminada correctamente.</p>
                </div>
            </dialog>

            {/* ERROR */}
            <dialog ref={errorDialog} class="dialog-box">
                <div class="p-4 text-center">
                    <h3 class="text-lg font-semibold mb-2">Error</h3>
                    <p class="text-gray-700">No se pudo eliminar la nota.</p>
                </div>
            </dialog>
        </>
    );
}
