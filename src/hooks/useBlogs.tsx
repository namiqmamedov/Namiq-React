import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore"
import { blogSelectors, fetchBlogsAsync } from "../store/slice/blogSlice"

const useBlogs = () => {
    const blogs = useAppSelector(blogSelectors.selectAll);
    const {blogsLoaded,metaData} = useAppSelector(state => state.blog)
    const dispatch = useAppDispatch();
    
  
    useEffect(() => {
      if(!blogsLoaded) dispatch(fetchBlogsAsync());
    }, [blogsLoaded,dispatch]) 

  return (
    {blogs,blogsLoaded,metaData}
  )
}

export default useBlogs