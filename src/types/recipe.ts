export type Recipe = {
    id: number
    name: string
    description: string
    instructions: string[]
    ingredient_parts: string[]
    ingredient_quantities: string[]
    images: string[]
    cleaned_name: string
    cleaned_instruction: string
    cleaned_ingredient: string
    score: number | undefined
    rating: number | undefined
}