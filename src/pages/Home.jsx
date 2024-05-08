import React from 'react'
import NavBar from '../components/NavBar'
import HeroSection from '../components/HeroSection'
import AboutUs from '../components/AboutUs'
import Facts from "../components/Facts"

const Home = () => {
  return (
    <div>
        <NavBar />
        <div className="relative">
            <HeroSection />
            <div className="mt-10"> {/* Add margin top to create space */}
                <AboutUs />
            </div>
            <Facts />
        </div>
    </div>
  )
}

export default Home