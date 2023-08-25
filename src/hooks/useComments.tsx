import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/configureStore";
import { commentSelectors, fetchCommentAsync } from "../store/slice/commentSlice";


const useCategory = () => {
    const comment = useAppSelector(commentSelectors.selectAll);
    const {commentLoaded,metaData} = useAppSelector(state => state.comment)
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if(!commentLoaded) dispatch(fetchCommentAsync());
    }, [commentLoaded,dispatch]) 

  return (
    {comment,commentLoaded,metaData}
  )
}

export default useCategory

