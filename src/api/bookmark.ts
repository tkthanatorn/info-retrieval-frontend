import { fetchPrivate } from ".";
import { DefaultResponse, DeleteBookmarkBody, Recipe, SaveBookmarkBody } from "../types";

export const saveBookmarkAPI = async (body: SaveBookmarkBody) => fetchPrivate.post<DefaultResponse>("/bookmark", body)
export const deleteBookmarkAPI = async (body: DeleteBookmarkBody) => fetchPrivate.patch<DefaultResponse>("/bookmark", body)
export const getBookmarkAPI = async (userId: string) => fetchPrivate.get<DefaultResponse<Recipe[]>>("/bookmark/" + userId)