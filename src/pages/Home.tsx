import { Container, Grid, Link, List, ListItem } from "@mui/material"
import main01 from '../assets/images/main01.png'
import {FaRegComment} from 'react-icons/fa'
import {BsCalendar2DateFill} from 'react-icons/bs'
import {BiSolidUser} from 'react-icons/bi'


const Home = () => {
  return (
        <div className='card__item'>
            <Container>
                    <Grid container spacing={2} className="!mt-6" >
                        <Grid item lg={8} sm={12} md={8}>
                            <div className="card border-primary mb-12">
                                <div className="card-header">Advisory | GLPI Service Management Software Multiple Vulnerabilities and Remote Code Execution</div>
                                <div className="card-image">
                                    <img src={main01} alt="Image" className="w-full" style={{marginTop: '-2px'}} />
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title">Primary card title</h4>
                                    <div className="post__content flex items-center gap-3">
                                        <div className="date-wrapper flex items-center gap-1">
                                        <BsCalendar2DateFill/>
                                            <span>July 26, 2022</span>
                                        </div>
                                        <div className="author-wrapper flex items-center gap-1">
                                            <BiSolidUser/>
                                            <span>admin</span>
                                        </div>
                                        <div className="comment-wrapper flex items-center gap-1">
                                        <FaRegComment/>
                                        <span>1 Comments</span>
                                        </div>
                                    </div>
                                    <p className="card-text mt-4 text-ellipsis overflow-hidden">
                                        Some quick example text to build on the card title and make up the bulk of the card's content.
                                        Some quick example text to build on the card title and make up the bulk of the card's content.
                                        Some quick example text to build on the card title and make up the bulk of the card's content.
                                        Some quick example text to build on the card title and make up the bulk of the card's content.
                                        Some quick example text to build on the card title and make up the bulk of the card's content.
                                        Some quick example text to build on the card title and make up the bulk of the card's content.
                                    </p>
                                    <div className="view-btn w-full text-end mt-3 mb-4">
                                        <button type="button" className="btn btn-primary">Read More</button>
                                    </div>
                                </div>
                            </div>
                            <ul className="pagination pagination-sm flex justify-center mt-4">
                                <li className="page-item disabled">
                                <a className="page-link" href="#">&laquo;</a>
                                </li>
                                <li className="page-item active">
                                <a className="page-link" href="#">1</a>
                                </li>
                                <li className="page-item">
                                <a className="page-link" href="#">2</a>
                                </li>
                                <li className="page-item">
                                <a className="page-link" href="#">3</a>
                                </li>
                                <li className="page-item">
                                <a className="page-link" href="#">4</a>
                                </li>
                                <li className="page-item">
                                <a className="page-link" href="#">5</a>
                                </li>
                                <li className="page-item">
                                <a className="page-link" href="#">&raquo;</a>
                                </li>
                            </ul>
                        </Grid>
                        <Grid item lg={4} sm={12} md={4}>
                        <div className="card border-primary mb-3" >
                            <div className="card-body">
                                {/* <h4 className="card-title">Primary card title</h4> */}
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                <h3 className="text-uppercase text-sm font-bold">Recent Posts</h3>
                                <List>
                                <ListItem disablePadding className="flex flex-wrap mb-5">
                                    <Link>
                                    Advisory | Roxy-WI Unauthenticated Remote Code Executions CVE-2022-31137
                                    </Link>
                                    <Link>
                                    Advisory | Roxy-WI Unauthenticated Remote Code Executions CVE-2022-31137
                                    </Link>
                                    <Link>
                                    Advisory | Roxy-WI Unauthenticated Remote Code Executions CVE-2022-31137
                                    </Link>
                                    <Link>
                                    Advisory | Roxy-WI Unauthenticated Remote Code Executions CVE-2022-31137
                                    </Link>
                                </ListItem>
                                <h3 className="text-uppercase text-sm font-bold">Latest Comments</h3>
                                <ListItem disablePadding className="flex flex-wrap mb-5">
                                    <Link className="flex gap-2">
                                        <FaRegComment className="mt-1"/>
                                        <div>
                                        Ege Balci 
                                           <span className=" text-gray-400"> on </span>
                                        Art of Anti Detection 3 – Shellcode Alchemy
                                        </div>
                                    </Link>
                                    <Link className="flex gap-2">
                                        <FaRegComment className="mt-1"/>
                                        <div>
                                        Chase Run Taylor
                                           <span className=" text-gray-400"> on </span>
                                        Art of Anti Detection 3 – Shellcode Alchemy
                                        </div>
                                    </Link>
                                    <Link className="flex gap-2">
                                        <FaRegComment className="mt-1"/>
                                        <div>
                                        0x00 
                                           <span className=" text-gray-400"> on </span>
                                        Art of Anti Detection 3 – Shellcode Alchemy
                                        </div>
                                    </Link>
                                    <Link className="flex gap-2">
                                        <FaRegComment className="mt-1"/>
                                        <div>
                                        namiq 
                                           <span className=" text-gray-400"> on </span>
                                        Art of Anti Detection 3 – Shellcode Alchemy
                                        </div>
                                    </Link>
                                </ListItem>
                                <h3 className="text-uppercase text-sm font-bold">Categories</h3>
                                <ListItem disablePadding className="flex flex-wrap mb-5">
                                    <Link>
                                    Hacking
                                    </Link>
                                    <Link>
                                    Humour
                                    </Link>
                                    <Link>
                                    Lockpicking
                                    </Link>
                                    <Link>
                                    Advisory | Roxy-WI Unauthenticated Remote Code Executions CVE-2022-31137
                                    </Link>
                                </ListItem>
                                </List>
                            </div>
                        </div>
                        </Grid>
                    </Grid>
            </Container>
        </div>
  )
}

export default Home