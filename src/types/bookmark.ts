export type SaveBookmarkBody = {
    user_id: string
    recipe_id: number
    rating: number
}

export type DeleteBookmarkBody = {
    user_id: string
    recipe_id: number
}