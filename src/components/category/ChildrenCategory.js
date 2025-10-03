
import React, { useEffect, useState } from "react";
import useAsync from "../../hooks/useAsync";
import CategoryServices from "../../services/CategoryServices";

const ChildrenCategory = ({ value }) => {
  const [categories, setCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);

  const { data } = useAsync(CategoryServices.getAllCategory);

  useEffect(() => {
    if (data) {
      const filteredCategories = value
        ? data.filter((parent) =>
            parent.name.toLowerCase().includes(value.toLowerCase())
          )
        : data;

      setCategories(filteredCategories);
    }
  }, [data, value]);

  useEffect(() => {
    if (categories) {
      const allChildren = categories.flatMap((parent) => {
        if (parent.children) {
          try {
            return JSON.parse(parent.children);
          } catch (error) {
            console.error("Failed to parse children:", error);
            return [];
          }
        }
        return [];
      });

      setChildCategories(allChildren);
    }
  }, [categories]);

  return (
    <>
      {childCategories.length > 0 ? (
        childCategories.map((child, i) => (
          <option key={i} value={child}>
            {child}
          </option>
        ))
      ) : (
         <option value=' '>
           No children available
          </option>
      )}
    </>
  );
};

export default ChildrenCategory;
