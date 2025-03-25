import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
         <HorizontalCardProduct category={"eyeglass"} heading={"Top Eyeglass"} />
        <HorizontalCardProduct category={"sunglass"}heading={"Popular Sunglasses"}/>
        <VerticalCardProduct category={"sunglass"}heading={"Sunglasses"} />
        <VerticalCardProduct category={"eyeglass"}heading={"Eyeglass"} />
        <VerticalCardProduct category={"screenglass"}heading={"Screenglass"} />
      </div>
   
  );
};

export default Home;
