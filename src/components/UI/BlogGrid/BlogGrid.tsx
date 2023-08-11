import { List, ListItem } from '@mui/material'
import { FaRegComment } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import CategoryList from '../CategoryList/CategoryList'
import useBlogs from '../../../hooks/useBlogs'
import { useAppDispatch, useAppSelector } from '../../../store/configureStore'
import { setBlogParams } from '../../../store/slice/blogSlice'
import TagList from '../TagList/TagList'

const BlogGrid = () => {

    const {category,tags} = useBlogs()
    const {blogParams} = useAppSelector(state => state.blog)
    const dispatch = useAppDispatch();

  return (
    <div className="card border-primary mb-3" >
    <div className="card-body">
        <h3 className="text-uppercase text-sm font-bold">Recent Posts</h3>
        <List>
        <ListItem disablePadding className="flex flex-wrap mb-5">
            <Link to={''}>
            Advisory | Roxy-WI Unauthenticated Remote Code Executions CVE-2022-31137
            </Link>
            <Link to={''}>
            Advisory | Roxy-WI Unauthenticated Remote Code Executions CVE-2022-31137
            </Link>
            <Link to={''}>
            Advisory | Roxy-WI Unauthenticated Remote Code Executions CVE-2022-31137
            </Link>
            <Link to={''}>
            Advisory | Roxy-WI Unauthenticated Remote Code Executions CVE-2022-31137
            </Link>
        </ListItem>
        <h3 className="text-uppercase text-sm font-bold">Latest Comments</h3>
        <ListItem disablePadding className="flex flex-wrap mb-5">
            <Link className="flex gap-2" to={''}>
                <FaRegComment className="mt-1"/>
                <div>
                Ege Balci 
                   <span className=" text-gray-400"> on </span>
                Art of Anti Detection 3 – Shellcode Alchemy
                </div>
            </Link>
            <Link className="flex gap-2" to={''}>
                <FaRegComment className="mt-1"/>
                <div>
                Chase Run Taylor
                   <span className=" text-gray-400"> on </span>
                Art of Anti Detection 3 – Shellcode Alchemy
                </div>
            </Link>
            <Link className="flex gap-2" to={''}>
                <FaRegComment className="mt-1"/>
                <div>
                0x00 
                   <span className=" text-gray-400"> on </span>
                Art of Anti Detection 3 – Shellcode Alchemy
                </div>
            </Link>
            <Link className="flex gap-2" to={''}>
                <FaRegComment className="mt-1"/>
                <div>
                namiq 
                   <span className=" text-gray-400"> on </span>
                Art of Anti Detection 3 – Shellcode Alchemy
                </div>
            </Link>
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