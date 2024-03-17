import { atom } from "recoil";

export const userIdState = atom<string | null>({
    key: "user-id",
    default: null
})