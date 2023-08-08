import { Container, Grid, Link, List, ListItem } from "@mui/material"
import main01 from '../assets/images/main01.png'
import {FaRegComment} from 'react-icons/fa'

const Home = () => {
  return (
        <div className='card__item'>
            <Container>
                    <Grid container spacing={2} className="!mt-12" >
                        <Grid item xs={8}>
                         <div className="card border-primary">
                            <div className="card-header">Advisory | GLPI Service Management Software Multiple Vulnerabilities and Remote Code Execution</div>
                            <div className="card-image">
                                <img src={main01} alt="Image" className="w-full" style={{marginTop: '-2px'}} />
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">Primary card title</h4>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                        </Grid>
                        <Grid item xs={4}>
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
                                        <FaRegComment/>
                                        <div>
                                        Ege Balci 
                                           <span className=" text-gray-400"> on </span>
                                        Art of Anti Detection 3 – Shellcode Alchemy
                                        </div>
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