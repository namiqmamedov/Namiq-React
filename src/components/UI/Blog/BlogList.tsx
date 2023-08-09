import { Fragment } from "react";
import main01 from "../../../assets/images/main01.png";
import { FaRegComment } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { Blog } from "../../../models/blog";
import BlogCardSkeleton from "../BlogCardSkeleton/BlogCardSkeleton";
import AppPagination from "../AppPagination/AppPagination";
import useBlogs from "../../../hooks/useBlogs";
import { setPageNumber } from "../../../store/slice/blogSlice";

interface Props {
  blogs?: Blog[];
}

const BlogList = ({blogs}: Props) => {
   const {blogsLoaded} = useAppSelector(state => state.blog)
   const {metaData} = useBlogs()
   const dispatch = useAppDispatch();
 
  return (
    <Fragment>
      {blogs?.map(blog => (
        <Fragment key={blog.id}>
          {!blogsLoaded ? (
            <BlogCardSkeleton/>
          ) : (
            <div className="card border-primary mb-12">
            <div className="card-header">
              {blog.name}
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
      {metaData && 
      <AppPagination
        metaData={metaData}
        onPageChange={(page: number) =>
        dispatch(setPageNumber({pageNumber: page}))}
      />}
    </Fragment>
  );
};

export default BlogList;
