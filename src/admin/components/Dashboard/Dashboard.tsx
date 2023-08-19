import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../ListItem/ListItem';
import useBlogs from '../../../hooks/useBlogs';
import { TableRow, TableCell, Button, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import AppPagination from '../../../components/UI/AppPagination/AppPagination';
import { removeBlog, setPageNumber } from '../../../store/slice/blogSlice';
import { useAppDispatch } from '../../../store/configureStore';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import {Blog}  from '../../../models/blog';
import agent from '../../../api/agent';
import BlogForm from '../BlogForm/BlogForm';
import { Delete, Edit } from '@mui/icons-material';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Namiq
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const {blogs,metaData} = useBlogs();
  const [editMode,setEditMode] = useState(false)
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(true);
  const [selectedBlog, setSelectedBlog] = useState<Blog | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);

  function handleSelectBlog(blog: Blog) {
    setSelectedBlog(blog);
    setEditMode(true);
  }

  function handleDeleteBlog(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Admin.deleteBlog(id)
      .then(() => dispatch(removeBlog(id)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  function cancelEdit() {
    if (selectedBlog) setSelectedBlog(undefined);
    setEditMode(false);
  }


  const toggleDrawer = () => {
    setOpen(!open);
  };

  if (editMode) return <BlogForm blog={selectedBlog} 
  categoryName={selectedBlog?.categoryName || ''} 
  tagName={selectedBlog?.tagName || ''}
  cancelEdit={cancelEdit} />

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid className='!flex-col' container spacing={3}>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Blog</Typography>
                <Button onClick={() => setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Create</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Tag</TableCell>
                            <TableCell align="center">Comment</TableCell>
                            <TableCell align="center">Settings</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
              {blogs.map((blog) => {
                return (
                  <TableRow
                    key={blog.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {blog.id}
                    </TableCell>
                    <TableCell align="left">
                      <Box display='flex' alignItems='center'>
                        <img src={blog.pictureUrl} alt={blog.name} style={{ height: 50, marginRight: 20 }} />
                        <span>{blog.name}</span>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{blog.categoryID}</TableCell>
                    <TableCell align="center">{blog.categoryID}</TableCell>
                    <TableCell align="center">{blog.categoryID}</TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleSelectBlog(blog)} startIcon={<Edit />} />
                      <LoadingButton
                        loading={loading && target === blog.id}
                        onClick={() => handleDeleteBlog(blog.id)}
                        startIcon={<Delete />} color='error' />
                    </TableCell>
                  </TableRow>
                );
              })}
                </TableBody>
                </Table>
            </TableContainer>
               {metaData &&  
                  <Box sx={{pt: 2}}>
                      <AppPagination 
                          metaData={metaData} 
                          onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))} />
                  </Box>
               }
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}