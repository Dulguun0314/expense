"use client";

import { createContext, useEffect, useState } from "react";
import { format, isToday, isYesterday, isThisYear } from "date-fns";
import axios from "axios";
export const CategoryContext = createContext(null);

export const CategoryProvider = ({ children }) => {
  const [newIconCategory, setNewIconCategory] = useState("");
  const [iconcategories, setIconCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [getCategoriesData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/iconcategories",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log(response.date, "response");

        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const formatDate = (date) => {
    if (isToday(date)) {
      return format(date, "HH:mm");
    }

    if (isYesterday(date)) {
      return format(date, "HH:mm");
    }

    if (isThisYear(date)) {
      return format(date, "HH:mm, MMM dd");
    }
    return format(date, "HH:mm, MMM dd yyyy");
  };

  // const todayCategories = categories.filter((category) => {
  //   return isToday(category.date);
  // });

  // const yesterdayCategories = categories.filter((category) =>
  //   isYesterday(category.date)
  // );

  // const otherCategories = categories.filter(
  //   (category) => !isToday(category.date) && !isYesterday(category.date)
  // );

  // const category = [
  //   { category: todayCategories, text: "Today" },
  //   { category: yesterdayCategories, text: "Yesterday" },
  //   { category: otherCategories, text: "Other" },
  // ];

  return (
    <CategoryContext.Provider
      value={{
        newIconCategory,
        setNewIconCategory,
        iconcategories,
        setCategories,
        categories,
        setIconCategories,
        getCategoriesData,
        formatDate,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
