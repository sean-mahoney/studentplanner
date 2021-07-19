import React, { Component } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ContentSection from "../components/ContentSection";
import ContentBarSection from "../components/ContentBarSection";

export class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <HeroSection />
        <ContentSection />
        <ContentBarSection />
      </div>
    );
  }
}

export default Home;
