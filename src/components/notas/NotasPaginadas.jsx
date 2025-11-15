import { actions } from "astro:actions";
import { createSignal } from "solid-js";


export default function NotasPaginadas(props) {
    const [notas, setNotas] = createSignal(props.notas)
    const [page, setPage] = createSignal(props.page)
    const [totalPages, setTotalPages] = createSignal(props.totalPages)

    const loadPage = async (newPage) => {
        const { data, error } = await actions.getNotas({
            page: newPage,
            limit: props.limit
        })

        if (!error && data) {
            setNotas(data.data);
            setPage(data.page);
            setTotalPages(data.pages);

            // sincroniza la URL
            window.history.pushState({}, "", `/notas/${newPage}`);
        }

    }
    return (

        <div class="flex flex-col h-full min-h-screen text-gray-200">

            {/* LISTADO (Wrapper) */}
            {/* 'flex-grow' hace que esta sección ocupe todo el espacio vertical disponible,
        empujando la paginación hacia la parte inferior. */}
            <div class="grow p-4 md:p-6">

                {/* La cuadrícula responsiva */}
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {/* Usamos <For> en lugar de .map() para un rendimiento optimizado en SolidJS */}
                    <For each={notas()}>
                        {(nota) => (
                            <div class="
                        bg-[#241B1B] 
                        border border-[#95E329] 
                        rounded-lg 
                        shadow-lg 
                        p-5 
                        flex flex-col
                        transition-all duration-300 ease-in-out
                        hover:shadow-xl hover:shadow-lime-500/20
                        hover:-translate-y-1
                    ">
                                <a class="font-bold text-lg text-[#95E329] mb-2" href={`/notas/${nota._id}`}>{nota.titulo}</a>

                                {/* 'flex-grow' aquí asegura que si las tarjetas tienen
                            diferentes alturas de texto, todas se alinearán bien. */}
                                <p class="text-gray-300 text-sm grow">{nota.contenido}</p>

                                {/* Espacio para futuras acciones, como un botón de "Editar" */}
                                {/* <div class="mt-4 pt-4 border-t border-gray-700"> ... </div> */}
                            </div>
                        )}
                    </For>
                </div>
            </div>

            {/* PAGINACIÓN */}
            {/* 'flex-shrink-0' previene que esta sección se encoja.
        La hemos separado visualmente con un borde superior. */}
            <div class="
        shrink-0 
        flex justify-center items-center 
        gap-4 
        py-6 px-4 
        border-t border-gray-700 
                                    
    ">

                {/* Botón "Anterior" con estilos mejorados */}
                <button
                    class="
                px-4 py-2 
                rounded-md 
                font-semibold text-sm 
                transition-colors duration-200 
                bg-gray-700 text-gray-200
                hover:bg-gray-600
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-lime-500
                disabled:opacity-40 disabled:cursor-not-allowed
            "
                    disabled={page() <= 1}
                    onClick={() => loadPage(page() - 1)}
                >
                    ← Anterior
                </button>

                <span class="font-semibold text-gray-300 text-sm">
                    Página {page()} / {totalPages()}
                </span>

                {/* Botón "Siguiente" con el color de acento */}
                <button
                    class="
                px-4 py-2 
                rounded-md 
                font-semibold text-sm 
                transition-colors duration-200 
                bg-[#95E329] text-[#241B1B] 
                hover:bg-lime-400
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-lime-500
                disabled:opacity-40 disabled:cursor-not-allowed
            "
                    disabled={page() >= totalPages()}
                    onClick={() => loadPage(page() + 1)}
                >
                    Siguiente →
                </button>
            </div>
        </div>



    );
}