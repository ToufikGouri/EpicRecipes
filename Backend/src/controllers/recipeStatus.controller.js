import { Recipe } from "../models/recipe.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getTrendingRecipes = asyncHandler(async (req, res) => {

    const recipes = await Recipe.find({ isTrending: true })

    if (!recipes) {
        return res.status(500).json(new ApiError(500, "Failed to fetch trending recipes"))
    }

    return res.status(200)
        .json(new ApiResponse(200, recipes, "Trending recipes fetched successfully"))

})

const getTopRecipes = asyncHandler(async (req, res) => {

    const recipes = await Recipe.find({ isTopRecipe: true })

    if (!recipes) {
        return res.status(500).json(new ApiError(500, "Failed to fetch trending recipes"))
    }

    return res.status(200)
        .json(new ApiResponse(200, recipes, "Top recipes fetched successfully"))

})

const getAllCategories = asyncHandler(async (req, res) => {
    // Here is the example of handling error with the query which returns an Array
    try {
        const categories = await Recipe.distinct("category")

        return res.status(200)
            .json(new ApiResponse(200, categories, "All categories fetched successfully"))

    } catch (error) {
        // This method will always return an array, so using if(!categories)... is not best approach
        return res.status(500).json(new ApiError(500, "Failed to fetch all categories"))
    }

})

const getRecipeByCategory = asyncHandler(async (req, res) => {

    const { category, page = 1, limit = 10 } = req.query
    const skip = (page - 1) * limit

    if (!category) {
        return res.status(404).json(new ApiError(404, "Please provide category"))
    }

    const recipes = await Recipe.find({ category })
        .skip(parseInt(skip))
        .limit(parseInt(limit))

    if (!recipes) {
        return res.status(500).json(new ApiError(500, `Failed to fetch recipes by category: ${category}`))
    }

    return res.status(200)
        .json(new ApiResponse(200, recipes, `Recipes fetched successfully by category: ${category}`))

})


// update methods should be accessible by ADMIN ONLY
const updateTrendingRecipes = asyncHandler(async (req, res) => {

    const { recipeId, trendingVal } = req.body

    const recipe = await Recipe.findByIdAndUpdate(
        recipeId,
        {
            $set: {
                isTrending: trendingVal
            }
        }, { new: true }
    )

    if (!recipe) {
        return res.status(404).json(new ApiError(404, "Recipe not found"))
    }

    return res.status(200)
        .json(new ApiResponse(200, recipe, "Recipe trending status updated successfully"))

})
const updateTopRecipes = asyncHandler(async (req, res) => {

    const { recipeId, isTopVal } = req.body

    const recipe = await Recipe.findByIdAndUpdate(
        recipeId,
        {
            $set: {
                isTopRecipe: isTopVal
            }
        }, { new: true }
    )

    if (!recipe) {
        return res.status(404).json(new ApiError(404, "Recipe not found"))
    }

    return res.status(200)
        .json(new ApiResponse(200, recipe, "Recipe top status updated successfully"))

})

export {
    getTrendingRecipes,
    getTopRecipes,
    getAllCategories,
    getRecipeByCategory,
    updateTrendingRecipes,
    updateTopRecipes
}