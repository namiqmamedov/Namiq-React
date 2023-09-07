import { Container, Grid } from "@mui/material"
import BlogGrid from "../components/UI/BlogGrid/BlogGrid"
import { BiSolidUser } from "react-icons/bi"
import { BsCalendar2DateFill } from "react-icons/bs"
import {FaFolderOpen} from 'react-icons/fa'
import {AiFillEye} from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from "../store/configureStore"
import {  fetchBlogAsync } from "../store/slice/blogSlice"
import { useNavigate, useParams } from "react-router-dom"
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom"
import * as sha256 from 'crypto-js/sha256';
import { format } from 'date-fns';
import { Fragment, useEffect, useState } from "react";
import Loading from "../common/Loading";
import PostComment from "../components/UI/PostComment/PostComment";
import { formatBlogName, getTimeAgo } from "../util/util";
import useBlogs from "../hooks/useBlogs"

function generateUniqueKey(email: string): string {
  return sha256(email).toString();
}

const BlogDetail = () => {
  const dispatch = useAppDispatch(); 
  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();
  
  const {blogs} = useBlogs();

  const blog = blogs.find((blog: any) => {
    const blogName = formatBlogName(blog?.name);
    return blogName === name;
  });
  
  const {status: blogStatus} = useAppSelector(state => state.blog)
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

  useEffect(() => {
    if (blog) {
      document.title = `${blog.name} | Namiq`;
    }
  }, [blog]);

  const handleReplyClick = (commentId: any) => {
    setSelectedCommentId((prevCommentId) => {
      return prevCommentId === commentId ? null : commentId;
    });
  };

  useEffect(() => {
    if(!blog) dispatch(fetchBlogAsync((!blog && name!)))
    }, [name,dispatch,blog]) 
  
    
    const formattedCreatedAt = blog?.createdAt
    ? format(new Date(blog.createdAt), 'MMMM d, yyyy')
    : '';

  if(blogStatus.includes('pending')) return <Loading/>

  console.log(name);
  
  const formattedBlogName = formatBlogName(blog?.name || '')

  if (blog?.name && formattedBlogName !== name) {
    navigate('/not-found')
  }

  return (
    <Container>
    <Grid container spacing={2} className="!mt-6" >
        <Grid className="card__index" item lg={8} sm={12} md={8}>
        <div className="card border-primary mb-12">
        <div className="card-image">
          <img
            src={blog?.pictureUrl}
            alt="Image"
            className="w-full"
          />
        </div>
        <div className="card-body">
        <div className="text-[22px] mb-2">{blog?.name}</div>
          <div className="post__content flex flex-wrap items-center gap-3">
            <div className="date-wrapper flex items-center gap-1">
              <BsCalendar2DateFill />
              <span>{formattedCreatedAt}</span> 
            </div>

            <div className="author-wrapper flex items-center gap-1">
              <BiSolidUser />
              <span>admin</span>

            </div>
            <Link className="comment-wrapper flex items-center gap-1 m-0 p-0 text-black" to={`/?category=${blog?.category?.name}`}>
              <FaFolderOpen />
              <span>{blog?.category?.name}</span> 
            </Link>
            <div className="view-count flex gap-1 items-center">
            <AiFillEye/> {blog?.viewCount}
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

          {blog?.comment?.length!! > 0 && (
            <div>
                  {blog && blog?.comment?.filter(comment => comment.isAccepted).length > 0 && (
                      <div className="text-[24px]">
                          {blog?.comment?.filter(comment => comment.isAccepted).length} Comments
                      </div>
                  )}              
                  {blog?.comment?.filter(comment => comment.isAccepted && !comment.parentCommentID).map((comment, index) => (
                      <div key={index} className="comment-item flex flex-col align-center mt-3">
                        <div className="comment-base flex">
                          <img className="w-16 h-16 mr-3" src={`https://robohash.org/${generateUniqueKey(comment.email)}.png`} />
                          <div className="comment-body">
                            <span className="comment-author name text-[16px]">
                              {comment.name}
                            </span>
                            <Link className="block text-[14px] pb-1" to={''}>
                              {getTimeAgo(comment.createdAt)}
                            </Link>
                            <p className="pb-1 mb-0">
                              {comment.text}
                            </p>
                            <a className="underline" onClick={() => handleReplyClick(comment.id)}>Reply</a>
                            {selectedCommentId === comment.id && (
                              <PostComment selectedCommentId={selectedCommentId} />
                            )}
                          </div>
                        </div>
                        
                        {blog?.comment?.filter((reply => reply.isAccepted && reply.parentCommentID === comment.id)).map((reply) => (
                          <Fragment>
                            <div key={reply.id} className="comment-item flex align-center ml-6 mt-3">
                               <img className="w-16 h-16 mr-3" src={`https://robohash.org/${generateUniqueKey(reply.email)}.png`} />
                               <div className="comment-body">
                                 <span className="comment-author name text-[16px]">
                                   {reply.name}
                                 </span>
                                 <Link className="block text-[14px] pb-1" to={''}>
                                   {getTimeAgo(reply.createdAt)}
                                 </Link>
                                 <p className="pb-1 mb-0">
                                   {reply.text}
                                 </p>
                                 <a className="underline" onClick={() => handleReplyClick(reply.id)}>Reply</a>
                                 {selectedCommentId === reply.id && (
                                   <PostComment selectedCommentId={selectedCommentId} />
                                 )}                           
                               </div>
                            </div>
                            {blog?.comment?.filter((nestedReply => nestedReply.isAccepted && nestedReply.parentCommentID === reply.id)).map((nestedReply) => (
                               <div key={nestedReply.id} className="comment-item flex align-center ml-6 mt-3">
                                 <img className="w-16 h-16 mr-3" src={`https://robohash.org/${generateUniqueKey(nestedReply.email)}.png`} />
                                 <div className="comment-body">
                                   <span className="comment-author name text-[16px]">
                                     {nestedReply.name}
                                   </span>
                                   <Link className="block text-[14px] pb-1" to={''}>
                                     {getTimeAgo(nestedReply.createdAt)}
                                   </Link>
                                   <p className="pb-1 mb-0">
                                     {nestedReply.text}
                                   </p>
                                   <a className="underline" onClick={() => handleReplyClick(nestedReply.id)}>Reply</a>
                                   {selectedCommentId === nestedReply.id && (
                                     <PostComment selectedCommentId={selectedCommentId} />
                                   )}
                                 </div>
                               </div>
                            ))}
                          </Fragment>
                        ))}
                      </div>
                    ))}       
            </div>
          )}

            {selectedCommentId === null && (
              <Fragment>
                <div className="bold text-[26px] mt-5">Post a new comment</div>
                <PostComment selectedCommentId={selectedCommentId} />
              </Fragment>
            )}
         </div>


      </div>
        </Grid>
        <Grid className="widget__wrapper" item lg={4} sm={12} md={4}>
            <BlogGrid/>
        </Grid>
    </Grid>                             
</Container>
  )
}

export default BlogDetail