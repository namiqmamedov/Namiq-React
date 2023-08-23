import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore"
import { fetchTagAsync, tagSelectors } from "../store/slice/tagSlice";

const useCategory = () => {
    const tag = useAppSelector(tagSelectors.selectAll);
    const {tagLoaded,metaData} = useAppSelector(state => state.tag)
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if(!tagLoaded) dispatch(fetchTagAsync());
    }, [tagLoaded,dispatch]) 

  return (
    {tag,tagLoaded,metaData}
  )
}

export default useCategory

