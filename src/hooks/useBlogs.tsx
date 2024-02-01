import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore"
import { blogSelectors, fetchBlogsAsync, fetchFilters } from "../store/slice/blogSlice"

const useBlogs = () => {
    const blogs = useAppSelector(blogSelectors.selectAll);
    const {blogsLoaded,filtersLoaded,metaData,category,tags} = useAppSelector(state => state.blog)
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if(!blogsLoaded) dispatch(fetchBlogsAsync());
    }, [blogsLoaded,dispatch]) 

    useEffect(() => {
      if(!filtersLoaded) dispatch(fetchFilters());
    }, [filtersLoaded,dispatch]) 

  return (
    {blogs,blogsLoaded,filtersLoaded,metaData,category,tags}
  )
}

export default useBlogs

