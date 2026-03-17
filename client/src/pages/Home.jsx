import React from 'react'
import Biography from '../components/Biography';
import Departments from '../components/Departments';
import MessageForm from '../components/MessageForm';
import Hero from '../components/Hero';
const Home = () => {
  return (
    <>
    <Hero title={"Welcome to ZeeCare Medical Institute | Your Trusted Healthcare Provider"} imageUrl={"https://res.cloudinary.com/doazyk6kl/image/upload/v1739267620/project%20work/HMS%20photos/hero.png"}/>
    <Biography imageUrl={"https://res.cloudinary.com/doazyk6kl/image/upload/v1739267621/project%20work/HMS%20photos/about.png"} />
    <Departments/>
    <MessageForm/>
    </>
  )
}

export default Home;
