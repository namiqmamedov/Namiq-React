import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore"
import { categorySelectors, fetchCategoryAsync } from "../store/slice/categorySlice";

const useCategory = () => {
    const category = useAppSelector(categorySelectors.selectAll);
    const {categoryLoaded,metaData} = useAppSelector(state => state.category)
    const dispatch = useAppDispatch();

  
    useEffect(() => {
      if(!categoryLoaded) dispatch(fetchCategoryAsync());
    }, [categoryLoaded,dispatch]) 


  return (
    {category,categoryLoaded,metaData}
  )
}

export default useCategory

