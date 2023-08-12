import { Container, Grid } from "@mui/material"
import BlogGrid from "../components/UI/BlogGrid/BlogGrid"
import BlogList from "../components/UI/Blog/BlogList"
import useBlogs from "../hooks/useBlogs"
import Loading from "../common/Loading"
import { useSelector } from "react-redux"
import { RootState } from "../store/configureStore"

const Home = () => {
  const {blogs,filtersLoaded} = useBlogs()
  
  const searchResults = useSelector((state: RootState) => state.blog.searchResults);
  const searchResultsCount = useSelector((state: RootState) => state.blog.searchResultsCount);  
  const hasSubmitted = useSelector((state: RootState) => state.blog.hasSubmitted); // Get hasSubmitted from Redux state
  

  if(!filtersLoaded) return <Loading/>

  return (
        <div className='card__item'>
            <Container>
            <div className="mt-4">
            {searchResults.length > 0 && (
                <p className="text-[22px]">
                    <small>{searchResults.length} Results for </small> “{searchResults[0]?.name}”
                </p>
            )}
            {hasSubmitted && searchResultsCount > 0 ? <p>hello</p>: null }

              </div>
                    <Grid container spacing={2} className="!mt-6" >
                            <Grid item lg={8} sm={12} md={8}>
                            <BlogList blogs={blogs} />
                        </Grid>
                        <Grid item lg={4} sm={12} md={4}>
                            <BlogGrid/>
                        </Grid>
                    </Grid>
            </Container>
        </div>
  )
}

export default Home