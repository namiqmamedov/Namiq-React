import { Container, Grid } from "@mui/material"
import BlogGrid from "../components/UI/BlogGrid/BlogGrid"
import BlogList from "../components/UI/Blog/BlogList"
import useBlogs from "../hooks/useBlogs"
import Loading from "../common/Loading"
import { useSelector } from "react-redux"
import { RootState } from "../store/configureStore"
import { useEffect } from "react"

const Home = () => {
  const {blogs,filtersLoaded} = useBlogs()
  
  const searchResults = useSelector((state: RootState) => state.blog.searchResults);
  const searchResultsCount = useSelector((state: RootState) => state.blog.searchResultsCount);

  useEffect(() => {
    console.log('Search results:', searchResults);
    // Any additional logic here
  }, [searchResults]);
  

  if(!filtersLoaded) return <Loading/>

  return (
        <div className='card__item'>
            <Container>
            <div>
            <p>Search Results Count: {searchResultsCount}</p>
                    <ul>
                        {searchResults.map((result) => (
                        <li key={result.id}>{result.name}</li>
                        ))}
                    </ul>
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