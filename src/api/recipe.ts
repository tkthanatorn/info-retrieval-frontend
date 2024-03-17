import { fetchPrivate } from "."
import { DefaultResponse, Recipe } from "../types"

export const getRecipesAPI = async (page: number) => {
    return fetchPrivate.get<DefaultResponse<Recipe[]>>("/recipe", { params: { page } })
}

export const searchRecipeByNameAPI = async (query: string) =>
    fetchPrivate.get<DefaultResponse<Recipe[]>>("/recipe/by-name", { params: { query } })

export const searchRecipeByInstructionAPI = async (query: string) =>
    fetchPrivate.get<DefaultResponse<Recipe[]>>("/recipe/by-instruction", { params: { query } })

export const searchRecipeByIngredientAPI = async (query: string) =>
    fetchPrivate.get<DefaultResponse<Recipe[]>>("/recipe/by-ingredient", { params: { query } })