import { List, ListItem } from '@mui/material'
import { FaRegComment } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const BlogGrid = () => {
  return (
    <div className="card border-primary mb-3" >
    <div className="card-body">
        {/* <h4 className="card-title">Primary card title</h4> */}
        {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
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
           <div className="category__item flex flex-column">
           <Link to={''}>
            Hacking
            </Link>
            <Link to={''}>
            Humour
            </Link>
            <Link to={''}>
            Lockpicking
            </Link>
           </div>
        </ListItem>
        <h3 className="text-uppercase text-sm font-bold">Tags</h3>
        <ListItem disablePadding className="flex flex-wrap mb-5 tags gap-2">
            <Link to={''}>
            <span className="badge bg-dark">CTF</span>
            </Link>
            <Link to={''}>
            <span className="badge bg-dark">burp</span>
            </Link>
            <Link to={''}>
            <span className="badge bg-dark">application</span>
            </Link>
            <Link to={''}>
            <span className="badge bg-dark">reversing</span>
            </Link>
            <Link to={''}>
            <span className="badge bg-dark">reversing</span>
            </Link>
            <Link to={''}>
            <span className="badge bg-dark">reversing</span>
            </Link>
            <Link to={''}>
            <span className="badge bg-dark">reversing</span>
            </Link>
        </ListItem>
        </List>
    </div>
    </div>
  )
}

export default BlogGrid