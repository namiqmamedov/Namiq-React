import { Container, Grid } from "@mui/material"
import BlogGrid from "../components/UI/BlogGrid/BlogGrid"
import BlogList from "../components/UI/Blog/BlogList"
import useBlogs from "../hooks/useBlogs"
import Loading from "../common/Loading"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../store/configureStore"
import { Fragment, useEffect } from "react"
import { useLocation} from "react-router-dom"
import { fetchBlogsAsync, setBlogParams } from "../store/slice/blogSlice"

const Home = () => {
  const {blogs,filtersLoaded} = useBlogs()
  
  const hasSubmitted = useAppSelector(state => state.blog.hasSubmitted); 
  const searchResultsCount = useAppSelector(state => state.blog.searchResultsCount);  
  const totalResults = useAppSelector(state => state.blog.totalResults);
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { blogsLoaded } = useAppSelector(state => state.blog);

  const searchQuery = searchParams.get("q");
  const page = parseInt(searchParams.get('page') || '1', 10);
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");

  const trimmedSearchQuery = searchQuery?.trim();

  useEffect(() => {
    if (searchQuery?.trim()) {
      document.title = `Search results for “${searchQuery}” | Namiq`;
    }
  }, [searchQuery?.trim()]);

  useEffect(() => {
    if (searchQuery?.trim()) {

      dispatch(setBlogParams({ searchTerm: searchQuery, pageNumber: page}));
      dispatch(fetchBlogsAsync() as any);
      
    }
  }, [searchQuery, page, dispatch]);

  useEffect(() => {
    if (category) {
      dispatch(setBlogParams({category: category}));
      dispatch(fetchBlogsAsync() as any);
    }
  }, [category, dispatch]);
  
  useEffect(() => {
    if (tag) {
      dispatch(setBlogParams({tags: tag}));
      dispatch(fetchBlogsAsync() as any);
    }
  }, [tag, dispatch]);

  if(!filtersLoaded) return <Loading/>

  return (
        <div className='card__item'>
            <Container>
              <Grid container spacing={2} className="!mt-6">
                 <Grid className="card__index w-full" item lg={8} sm={12} md={8}>
                          {hasSubmitted && searchResultsCount === 0 && blogs?.length === 0 ? (
                           <Fragment>
                              <p className="font-bold text-[32px]">Not found</p>
                              <p>Sorry, but nothing matched your search terms. Please try again with some different keywords.</p>
                            </Fragment>
                          ) : (
                            <Fragment>
                              {blogs?.length > 0 &&
                                <Fragment>
                                  {blogsLoaded && searchQuery && (
                                    <p className="text-[22px]">
                                      <small>{totalResults} Results for </small> “{trimmedSearchQuery}”
                                    </p>
                                  )}
                                  {tag && (
                                      <p className="text-[28px]">
                                        <small>Tag: </small> {tag.replace(/-/g, " ")}
                                      </p>
                                  )}
                                  {category && (
                                      <p className="text-[28px]">
                                        <small>Category: </small> {category.replace(/-/g, " ")}
                                      </p>
                                  )}
                                  <BlogList blogs={blogs} />
                                </Fragment> 
                              }
                            </Fragment>
                          )}
                 </Grid>
                 <Grid className="widget__wrapper" item lg={4} sm={12} md={4}>
                     <BlogGrid/>
                 </Grid>
              </Grid>
            </Container>
        </div>
  )
}

export default Home