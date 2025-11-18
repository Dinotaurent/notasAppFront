import { getStatus } from "@actions/get-status.action";
import { getNotas } from "@actions/notas/get-notas.action";
import { getNotaById } from '@actions/notas/get-nota-by-id.action';
import { deleteNotaById } from "@actions/notas/delete-nota-by-id.action";
import { createNota } from "@actions/notas/create-nota.action";
import { updateNota } from "@actions/notas/update-nota.action";

export const server = {
    getStatus,
    getNotas,
    getNotaById,
    deleteNotaById,
    createNota,
    updateNota,
};