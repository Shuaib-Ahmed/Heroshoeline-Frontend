import React from "react";
import styles from "./css/home.module.css";

import { Navbar, ShowCase, Footer } from "../Components";
import ProductSection from "../Components/ProductSection";

import { BaseUrl } from "../Static/Data/data";
import { Link } from "react-router-dom";

const Home = () => {
  const type = ["Heel", "Flat", "Bellie"];
  const headerTitle = [
    "Casual Stylish Heels",
    "Fancy And Comfortable Flats",
    "Party Wear Bellies",
  ];
  const backgroundColor = ["#293241", "#f4d35e", "#335c67"];
  return (
    <>
      <Navbar />
      <ShowCase />
      <section className={styles.banner1}>
        <Link to="all_product">More Products</Link>
      </section>
      {type.map((sectionType, index) => {
        const url = `${BaseUrl}/groupItems/query/?limit=10&skip=0&type=${sectionType}`;
        return (
          <ProductSection
            key={index}
            url={url}
            type={sectionType}
            title={headerTitle[index]}
            color={backgroundColor[index]}
          />
        );
      })}
      <section className={styles.banner2}>
        <Link to="all_product">More Products</Link>
      </section>

      <Footer />
    </>
  );
};

export default Home;
