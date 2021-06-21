import React from 'react'
import Navbar from '../components/Navbar';
import MainNavbar from '../components/MainNavbar';
import HeroSection from '../components/HeroSection';
import ContentSection from '../components/ContentSection';
import ContentBarSection from '../components/ContentBarSection';
import Dashboard from './Dashboard';
import Footer from '../components/Footer';

function Home() {
    return (
        <>
            <Navbar />
            <MainNavbar />
            <HeroSection />
            <ContentSection />
            <ContentBarSection />
            <Dashboard />
            <Footer />
        </>
    )
}

export default Home
