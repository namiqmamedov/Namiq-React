import { Fragment } from "react";
import main01 from "../../../assets/images/main01.png";
import { FaRegComment } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { useAppSelector } from "../../../store/configureStore";
import { Blog } from "../../../models/blog";
import BlogCardSkeleton from "../BlogCardSkeleton/BlogCardSkeleton";

interface Props {
  blogs?: Blog[];
}

const BlogList = ({blogs}: Props) => {
   const {blogsLoaded} = useAppSelector(state => state.blog)
  return (
    <Fragment>
      {blogs?.map(blog => (
        <Fragment>
          {!blogsLoaded ? (
            <BlogCardSkeleton/>
          ): (
            <div className="card border-primary mb-12">
            <div className="card-header">
              {/* Advisory | GLPI Service Management Software Multiple Vulnerabilities
              and Remote Code Execution */}
              {/* <p>{blog?.name}</p> */}
              <h1>{blog.name}</h1>
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
                  <FaRegComment />
                  <span>1 Comments</span>
                </div>
              </div>
              <p className="card-text mt-4 text-ellipsis overflow-hidden">
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
              <div className="view-btn w-full text-end mt-3 mb-4">
                <button type="button" className="btn btn-primary">
                  Read More
                </button>
              </div>
            </div>
          </div>
          )} 
        </Fragment>
      ))}
      <ul className="pagination pagination-sm flex justify-center mt-4">
        <li className="page-item disabled">
          <a className="page-link" href="#">
            &laquo;
          </a>
        </li>
        <li className="page-item active">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            4
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            5
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            &raquo;
          </a>
        </li>
      </ul>
    </Fragment>
  );
};

export default BlogList;
