import React, { createContext, useState, useEffect } from "react";

import axios from "axios";
import { BaseUrl } from "../Static/Data/data";
import { errorMessage } from "../Static/Function/tostify";

const initialValue = {
  data: [],
  totalPages: 1,
  limit: 10,
  page: 1,
  articleNumber: "",
  isLoading: false,
  reRender: () => {},
  setNextPage: () => {},
  setPrevPage: () => {},
  setPageLimit: (limit) => {},
  setNumber: (article_number) => {},
};

export const ManageItemContext = createContext({ ...initialValue });

const ManageItemContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [articleNumber, setArticleNumber] = useState("");
  const [render, setRender] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    try {
      setIsLoading(true);

      const skip = (page - 1) * limit;

      let url = `${BaseUrl}/items/query/?limit=${limit}&skip=${skip}`;

      if (articleNumber !== "") {
        url = `${url}&article_number=${articleNumber}`;
      }

      const { data } = await axios.get(url);

      const { error, responseData, total } = data;

      if (!error) {
        setData(responseData);
        const totalPage = Math.ceil(total / limit);
        setTotalPages(totalPage);
      }

      setIsLoading(false);
    } catch (error) {
      errorMessage("Somthing Went Wrong");
      console.log(error);
    }
  }, [page, limit, articleNumber, render]);

  const setNextPage = () => {
    setPage((prevState) => prevState + 1);
  };

  const setPrevPage = () => {
    setPage((prevState) => prevState - 1);
  };

  const setPageLimit = (limit) => {
    setLimit(limit);
    setPage(1);
  };

  const setNumber = (article_number) => {
    setArticleNumber(article_number);
    setPage(1);
  };

  const reRender = () => {
    setRender((prevState) => !prevState);
  };

  return (
    <ManageItemContext.Provider
      value={{
        data,
        page,
        limit,
        articleNumber,
        totalPages,
        isLoading,
        reRender,
        setNextPage,
        setPrevPage,
        setPageLimit,
        setNumber,
      }}
    >
      {children}
    </ManageItemContext.Provider>
  );
};

export default ManageItemContextProvider;
