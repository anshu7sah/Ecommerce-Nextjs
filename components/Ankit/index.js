import React from "react";
import Header from "./Header";
import FrontPage from "./FrontPage";
import PCategory from "./PCategory";
import Drape from "./Drape";
import Explore from "./Explore";
import TinyTrend from "./TinyTrend";
import Footer from "./Footer";

function Ankit() {
  return (
    <div className="HomePage">
      <Header />
      <FrontPage />
      <PCategory />
      <Drape />
      {/* place for flash card */}
      <Explore />
      <TinyTrend />
      <Footer />
    </div>
  );
}

export default Ankit;
