import React, { Component } from "react";
import HeroSection from "../components/HeroSection";
import ContentSection from "../components/ContentSection";
import ContentBarSection from "../components/ContentBarSection";

export class Home extends Component {
  render() {
    return (
      <div>
        <HeroSection />
        <ContentSection />
        <ContentBarSection />
      </div>
    );
  }
}

export default Home;
