import React, { useEffect, useState } from 'react'
import HeroImage from "../assets/HomeAssets/HeroImage.png"
import MidImage from "../assets/HomeAssets/MidImage.png"
import { ChevronRightIcon, HeartIcon } from "lucide-react"
import RecipeCard from '../components/RecipeCard'
import { useSelector, useDispatch } from "react-redux"
import { getAllRecipes, getTrendingRecipes } from '../redux/recipeSlice'
import TrendingSection from '../components/homeComponents/TrendingSection'
import { Link } from 'react-router-dom'
import TestimonialSection from '../components/homeComponents/TestimonialSection'
import Footer from '../components/Footer'

const Home = () => {

  const trendingRecipesData = useSelector(state => state.recipe.trendingRecipes)
  const allRecipesData = useSelector(state => state.recipe.allRecipes)
  const dispatch = useDispatch()

  const heroRecipeData = {
    title: "Title of recipe",
    image: HeroImage,
    // image: "https://www.recipetineats.com/tachyon/2022/11/Honey-Soy-Wings_6.jpg?resize=900%2C1260&zoom=1",
  }

  useEffect(() => {
    dispatch(getAllRecipes())
    dispatch(getTrendingRecipes())
  }, [])


  return (
    <>
      <main>
        {/* Hero section*/}
        <section className={`h-screen w-full bg-no-repeat bg-cover bg-center text-white flex flex-col justify-end items-start p-2 sm:p-8 gap-10`} style={{ backgroundImage: `url(${heroRecipeData.image})` }}>
          <h1 className='text-6xl sm:text-7xl font-bold textShadow bg-black/10'>Quick recipes to <br /> get started with</h1>
          <Link to={`/recipes/recipe/${heroRecipeData.title}`} className='primaryBtn'>MAKE IT! <ChevronRightIcon /> </Link>
        </section>

        {/* Trending section */}
        {trendingRecipesData && <TrendingSection data={trendingRecipesData} />}

        {/* Mid section */}
        <section className='m-2 my-20 sm:mx-20 min-h-[50vh] flex flex-col md:flex-row'>
          <div className="imgPart relative md:w-2/4">
            <div className="imageMid min-h-[50vh] w-full bg-no-repeat bg-cover bg-center blur-sm" style={{ backgroundImage: `url(${MidImage})` }}></div>
            <div className='textMid absolute inset-0 flex justify-center items-center'>
              <h1 className='text-xl sm:text-3xl text-center sm:h-2/4 sw-2/4 p-6 bg-primaryBlue text-white'>
                10 most popular new <br /> recipes of 2024 <br /> (so far)
              </h1>
            </div>
          </div>
          <div className="textPart md:w-2/4 font-semibold bg-blue-100">
            <div className='h-full mx-4 flex flex-col justify-center'>
              <h1 className='text-3xl text-primaryBlue'>10 most popular new recipes of 2024 (so far)</h1>
              <div className="subPart mt-3 flex items-center">
                <p className='bg-white p-1 px-2'>QUICK AND EASY</p>
                <p className='mx-4'>Sep 3, 2024</p>
                <p className='flex'><HeartIcon fill='red' color='red' /> 237</p>
              </div>
              <Link to={`/category`} className='primaryBtn w-48 my-6'>Get The Recipe <ChevronRightIcon /> </Link>
            </div>
          </div>
        </section>

        {/* Cards section */}
        <section className='m-2 my-10 sm:mx-20'>
          <h1 className='text-primaryBlue text-2xl sm:text-4xl uppercase font-bold'>Find something tasty to make tonight</h1>
          <div className='my-4 grid grid-cols-1 md:grid-cols-4 gap-5'>
            {allRecipesData && allRecipesData.map((val) =>
              <RecipeCard key={val._id} id={val._id} image={val.image} title={val.title} />
            )}
          </div>
          <div className='my-10 flex flex-col md:flex-row justify-center items-center'>
            <h1 className='text-primaryBlue text-xl sm:text-2xl font-bold mr-4'>Explore more on Recipe Page</h1>
            <Link to={`/recipes`} className='primaryBtn'>Checkout <ChevronRightIcon /></Link>
          </div>
        </section>

        {/* Testimonial section */}
        <TestimonialSection />

        {/* Footer section */}
        <Footer />

      </main>
    </>
  )
}
export default Home