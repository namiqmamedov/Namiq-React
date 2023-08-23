import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {BiLogoBlogger} from 'react-icons/bi'
import {BiCategory} from 'react-icons/bi'
import {AiFillTags} from 'react-icons/ai'
import {TfiCommentsSmiley} from 'react-icons/tfi'
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';

export const mainListItems = (
  <React.Fragment>
    <Link to={'/admin/dashboard'}>
      <ListItemButton>
        <ListItemIcon>
          <BiLogoBlogger />
        </ListItemIcon>
        <ListItemText primary="Blog" />
      </ListItemButton>
    </Link>
    <Divider sx={{ my: 1 }} />
    <Link to={'/admin/category'}>
    <ListItemButton>
      <ListItemIcon>
        <BiCategory />
      </ListItemIcon>
      <ListItemText primary="Category" />
    </ListItemButton>
    </Link>
    <Divider sx={{ my: 1 }} />
    <Link to={'/admin/tag'}>
    <ListItemButton>
      <ListItemIcon>
        <AiFillTags />
      </ListItemIcon>
      <ListItemText primary="Tag" />
    </ListItemButton>
    </Link>
    <Divider sx={{ my: 1 }} />
    <Link to={''}>
    <ListItemButton>
      <ListItemIcon>
        <TfiCommentsSmiley />
      </ListItemIcon>
      <ListItemText primary="Comment" />
    </ListItemButton>
    </Link>
    <Divider sx={{ my: 1 }} />
  </React.Fragment>
);

