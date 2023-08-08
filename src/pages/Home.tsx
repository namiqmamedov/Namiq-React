import { Container, Grid } from "@mui/material"
import BlogGrid from "../components/UI/BlogGrid/BlogGrid"
import BlogList from "../components/UI/Blog/BlogList"
import useBlogs from "../hooks/useBlogs"
import Loading from "../common/Loading"

const Home = () => {
  const {blogs,blogsLoaded} = useBlogs()

   if(!blogsLoaded) return <Loading/>

  return (
        <div className='card__item'>
            <Container>
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