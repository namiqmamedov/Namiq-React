import { Container, Grid } from "@mui/material"
import BlogGrid from "../components/UI/BlogGrid/BlogGrid"
import { BiSolidUser } from "react-icons/bi"
import { BsCalendar2DateFill } from "react-icons/bs"
import { FaRegComment } from "react-icons/fa"
import main01 from "../assets/images/main01.png";
import {FaFolderOpen} from 'react-icons/fa'
import { useAppSelector } from "../store/configureStore"
import { blogSelectors } from "../store/slice/blogSlice"
import { useParams } from "react-router-dom"
import ReactHtmlParser from "react-html-parser";

const BlogDetail = () => {
  const {id} = useParams<{id: string}>();
  const blog = useAppSelector(state => blogSelectors.selectById(state, id!))

  return (
    <Container>
    <Grid container spacing={2} className="!mt-6" >
        <Grid item lg={8} sm={12} md={8}>
        <div className="card border-primary mb-12">
        <div className="card-image">
          <img
            src={main01}
            alt="Image"
            className="w-full"
            style={{ marginTop: "-2px" }}
          />
        </div>
        <div className="card-body">
        {/* <div className="text-[22px] mb-2">{blog!!.name}</div> */}
          <div className="post__content flex items-center gap-3">
            <div className="date-wrapper flex items-center gap-1">
              <BsCalendar2DateFill />
              <span>July 26, 2022</span>
            </div>
            <div className="author-wrapper flex items-center gap-1">
              <BiSolidUser />
              <span>admin</span>
            </div>
            <div className="comment-wrapper flex items-center gap-1">
              <FaFolderOpen />
              <span>Tools</span>
            </div>
          </div>
          <p className="card-text mt-4">
            Some quick example text to build on the card title and make up the
            bulk of the card's content. Some quick example text to build on the
            card title and make up the bulk of the card's content. Some quick
            example text to build on the card title and make up the bulk of the
            card's content. Some quick example text to build on the card title
            and make up the bulk of the card's content. Some quick example text
            to build on the card title and make up the bulk of the card's
            content. Some quick example text to build on the card title and make
            up the bulk of the card's content.

          </p>
          {blog?.description.text && ReactHtmlParser(blog?.description.text)}

        </div>
      </div>
        </Grid>
        <Grid item lg={4} sm={12} md={4}>
            <BlogGrid/>
        </Grid>
    </Grid>
</Container>
  )
}

export default BlogDetail