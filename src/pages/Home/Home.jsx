import React from "react";
import Announcement from "../../components/Announcement/Announcement";
import Categories from "../../components/Categories/Categories";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Products from "../../components/Products/Products";
import Slider from "../../components/Slider/Slider";

const Home = () => {



    return (
        <>
            <Announcement />
            <Navbar />
            <Slider />
            <Categories />
            <Products />
            <Footer />
        </>
    );
};

export default Home;
