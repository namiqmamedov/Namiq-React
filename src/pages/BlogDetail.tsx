import { Container, Grid } from "@mui/material"
import BlogGrid from "../components/UI/BlogGrid/BlogGrid"
import { BiSolidUser } from "react-icons/bi"
import { BsCalendar2DateFill } from "react-icons/bs"
import { FaRegComment } from "react-icons/fa"
import main01 from "../assets/images/main01.png";
import {FaFolderOpen} from 'react-icons/fa'

const BlogDetail = () => {
  return (
    <Container>
    <Grid container spacing={2} className="!mt-6" >
        <Grid item lg={8} sm={12} md={8}>
        <div className="card border-primary mb-12">
        <div className="card-header">
          Advisory | GLPI Service Management Software Multiple Vulnerabilities
          and Remote Code Execution
        </div>
        <div className="card-image">
          <img
            src={main01}
            alt="Image"
            className="w-full"
            style={{ marginTop: "-2px" }}
          />
        </div>
        <div className="card-body">
          <h4 className="card-title">Primary card title</h4>
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