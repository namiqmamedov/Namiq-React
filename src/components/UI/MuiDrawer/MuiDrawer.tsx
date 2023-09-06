import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import BlogSearch from '../BlogSearch/BlogSearch';
import { Link } from 'react-router-dom';
import '../../../styles/header.css'
import { Fragment } from 'react';
import {  useSelector } from 'react-redux';
import { RootState } from '../../../store/configureStore';

export default function MuiDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const hasSubmitted = useSelector((state: RootState) => state.blog.hasSubmitted);

  React.useEffect(() => {
    if (hasSubmitted) {
      setIsDrawerOpen(false);
      // dispatch(setHasSubmitted(false)); 
    }
  }, [hasSubmitted]);

  const list = () => (
    <Box
      sx={{ width: '100%' }}
      role="presentation"
    >
        <List className='mt-3 mb-3'>
            <div className='ml-4 pt-4 text-[20px]'>
              <Link to={'/whoami'}>About</Link>
            </div>
              <div className="search__item-mb">
                <BlogSearch />
              </div>
        </List>
      <Divider />
    </Box>
  );

  return (
    <Fragment>
      <div className="nav-sr">
        <div className="nav-wrapper flex justify-between w-full items-center">
          <div className="home__link">
            <Link className='text-[19px]' to={''}>Home</Link>
          </div>
          <button onClick={toggleDrawer} className="navbar-toggler border-none outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
      <Drawer
        className='drawer-root'
        anchor="top"
        open={isDrawerOpen}
        onClose={toggleDrawer}
      >
        {list()}
      </Drawer>
    </Fragment>
  );
}
