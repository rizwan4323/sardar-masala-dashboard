import React from 'react';

import useAsync from '../../hooks/useAsync';
import CategoryServices from '../../services/CategoryServices';


const ParentCategory = () => {
  const { data } = useAsync(CategoryServices.getAllCategory);  
  return (
    <>
      {data?.map((parent,i) => (
     
        <option key={`${parent.id}` || i} value={parent.name}>
           {parent?.name}
        </option>
      ))}
    </>
  );
};

export default ParentCategory;
