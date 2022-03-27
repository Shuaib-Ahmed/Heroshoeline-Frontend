import React, { createContext, useEffect, useState } from "react";

import { BaseUrl } from "../Static/Data/data";
import { errorMessage } from "../Static/Function/tostify";
import axios from "axios";

const initialValue = {
  productData: [],
  page: 1,
  totalPages: 1,
  isLoading: false,
  filters: {},
  changeFilters: () => {},
  setNextPage: () => {},
  setPrevPage: () => {},
};

export const ProductContext = createContext(initialValue);

const ProductContextProvider = ({ children }) => {
  const [filters, setFilters] = useState({type: "All", color: "All"});
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 10;

  const changeFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const setNextPage = () => {
    setPage((precState) => precState + 1);
  };

  const setPrevPage = () => {
    setPage((precState) => precState - 1);
  };

  useEffect(async () => {
    try {
      setIsLoading(true);
      const skip = (page - 1) * limit;
      const { color, type } = filters;

      let url = `${BaseUrl}/groupItems/query/?limit=${limit}&skip=${skip}`;

      if (color !== "All") {
        url = url + `&color=${color}`;
      }

      if (type !== "All") {
        url = url + `&type=${type}`;
      }

      const { data } = await axios.get(url);

      const { error } = data;

      if (!error) {
        const { responseData, totalItems } = data;

        const cardData = responseData.map((item) => {
          return {
            ...item.card_data,
            total_rating: item.total_rating,
            average_rating: item.average_rating,
          };
        });

        setTotalPages(Math.ceil(totalItems / limit));
        setProductData(cardData);
        setIsLoading(false);
      } else {
        errorMessage("Somthing Went Wrong Please Try Agian");
      }
    } catch (error) {
      errorMessage("Somthing Went Wrong Please Try Agian");
    }
  }, [filters, page]);

  return (
    <ProductContext.Provider
      value={{
        productData,
        page,
        totalPages,
        isLoading,
        filters,
        changeFilters,
        setNextPage,
        setPrevPage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
