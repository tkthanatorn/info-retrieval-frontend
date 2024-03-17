export type DefaultResponse<R = any | null> = {
    msg: string | null,
    success: boolean,
    result: R
}