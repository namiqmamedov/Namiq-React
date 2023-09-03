import { List, ListItem } from '@mui/material'
import { FaRegComment } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import CategoryList from '../CategoryList/CategoryList'
import useBlogs from '../../../hooks/useBlogs'
import { useAppDispatch, useAppSelector } from '../../../store/configureStore'
import { setBlogParams } from '../../../store/slice/blogSlice'
import TagList from '../TagList/TagList'
import useComments from '../../../hooks/useComments'
import agent from '../../../api/agent'
import { useState, useEffect, Fragment } from 'react'
import { Blog } from '../../../models/blog'
import { Comment } from '../../../models/comment'

const BlogGrid = () => {

    const {category,tags} = useBlogs()
    const {comment} = useComments();
    const {blogParams} = useAppSelector(state => state.blog)
    const dispatch = useAppDispatch();
    const [commentsNoFilter, setCommentsNoFilter] = useState<Comment[]>([]); 
    const [blogsNoFilter, setBlogsNoFilter] = useState<Blog[]>([]); 

    useEffect(() => {
      const fetchBlogsNoFilter = async () => {
        try {
          const response = await agent.Blog.listNoFilter();
          setBlogsNoFilter(response);
        } catch (error) {
          console.error('Error fetching blogs without filters:', error);
        }
      };
      
      fetchBlogsNoFilter();
    }, []);
        


    useEffect(() => {
      const fetchCommentsNoFilter = async () => {
        try {
          const response = await agent.Comment.listNoFilter();
          setCommentsNoFilter(response);
        } catch (error) {
          console.error('Error fetching comments without filters:', error);
        }
      };
      
      fetchCommentsNoFilter();
    }, []);
        

  return (
    <div className="card border-primary mb-3" >
    <div className="card-body">
        <h3 className="text-uppercase text-sm font-bold">Recent Posts</h3>
        <List>
        <ListItem disablePadding className="flex flex-wrap mb-5">
        {blogsNoFilter.slice(-5).reverse().map((item, index) => (
              <Link key={index} className="w-full" to={`/blog/${item.id}`}>
                {item.name}
              </Link>
        ))}
           
        </ListItem>
        
        <h3 className="text-uppercase text-sm font-bold">Latest Comments</h3>
        <ListItem disablePadding className="flex flex-wrap mb-5">
           {commentsNoFilter.filter(comment => comment.isAccepted).slice(-5).reverse().map((item,index) => {
            const blog = blogsNoFilter.find((blog: Blog) => blog.id === item.blogID);
            const blogName = blog ? blog.name : 'Unknown Blog'; 
                return (
                  <Link key={index} to={`/blog/${item.blogID}`}>
                          <FaRegComment className="mt-1 d-inline-block mr-2"/>
                              {item.name}
                            <Fragment>
                                  <span className=" text-gray-400"> on </span>
                              {blogName}
                            </Fragment>
                      </Link>
                )
            })}
        </ListItem>

        <h3 className="text-uppercase text-sm font-bold">Categories</h3>
        <ListItem disablePadding className="flex flex-wrap mb-5 categories">
            <CategoryList
              items={category}
              checked={blogParams.category}
              onChange={(items: string[]) => dispatch(setBlogParams({category: items}))}
            />
        </ListItem>
        <h3 className="text-uppercase text-sm font-bold">Tags</h3>
        <ListItem disablePadding className="flex flex-wrap mb-5 tags gap-2">
            <TagList
                 items={tags}
                 checked={blogParams.tags}
                 onChange={(items: string[]) => dispatch(setBlogParams({tags: items}))}
            />
        </ListItem>
        </List>
    </div>
    </div>
  )
}

export default BlogGrid