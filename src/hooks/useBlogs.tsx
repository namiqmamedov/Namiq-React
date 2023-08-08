import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore"
import { blogSelectors, fetchBlogsAsync } from "../store/slice/blogSlice"

const useBlogs = () => {
    const blogs = useAppSelector(blogSelectors.selectAll);
    const {blogsLoaded} = useAppSelector(state => state.blog)
    const dispatch = useAppDispatch();
    
  
    useEffect(() => {
      if(!blogsLoaded) dispatch(fetchBlogsAsync());
    }, [blogsLoaded,dispatch]) // [] that meaning endless loop blocking

  return (
    {blogs,blogsLoaded}
  )
}

export default useBlogs