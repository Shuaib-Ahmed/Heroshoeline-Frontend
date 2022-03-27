import React, { useState, useEffect } from "react";

import axios from "axios";

const useFetchCardData = (url) => {
  const [data, setData] = useState([]);
  useEffect(async () => {
    try {
      const {
        data: { responseData },
      } = await axios.get(url);

      const cardData = responseData.map((item) => {
        return {
          ...item.card_data,
          total_rating: item.total_rating,
          average_rating: item.average_rating,
        };
      });

      setData(cardData);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return data;
};

export default useFetchCardData;
