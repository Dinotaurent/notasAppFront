import { getStatus } from "@actions/get-status.action";
import { getNotas } from "@actions/notas/get-notas.action";
import { getNotaById } from '@actions/notas/get-nota-by-id.action';
import { deleteNotaById } from "./notas/delete-nota-by-id.action";


export const server = {
    getStatus,
    getNotas,
    getNotaById,
    deleteNotaById,
};