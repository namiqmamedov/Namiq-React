import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { TableRow, TableCell, Button, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import AppPagination from '../../../components/UI/AppPagination/AppPagination';
import { removeBlog, setPageNumber } from '../../../store/slice/blogSlice';
import { useAppDispatch } from '../../../store/configureStore';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import agent from '../../../api/agent';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useCategory from '../../../hooks/useCategory';
import { Category } from '../../../models/category';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to={'https://mui.com'} color="inherit">
        Namiq
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default function CategoryPage() {
  const {category,metaData} = useCategory();
  const [editMode,setEditMode] = useState(false)
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);


  function handleSelectCategory(category: Category) {
    setSelectedCategory(category);
    setEditMode(true);
  }

  function handleDeleteCategory(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Admin.deleteBlog(id)
      .then(() => dispatch(removeBlog(id)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  function cancelEdit() {
    if (selectedCategory) setSelectedCategory(undefined);
    setEditMode(false);
  }


//   if (editMode) {

//     return (
//         <BlogForm
//             blog={selectedCategory}
//             cancelEdit={cancelEdit}
//         />
//     );
// }

  return (
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid className='!flex-col' container spacing={3}>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Category</Typography>
                <Button onClick={() => setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Create</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Settings</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
              {category.map((categoryy,index) => {

            const currentPage = metaData!!.currentPage;
            const pageSize = metaData!!.pageSize;

            const startNumber = (currentPage - 1) * pageSize + index + 1;

            return (
                  <TableRow
                    key={categoryy.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {startNumber}
                    </TableCell>
                    <TableCell align="left">
                    {categoryy?.name}
                    </TableCell>

                    <TableCell align="center">
                      <Button onClick={() => handleSelectCategory(categoryy)} startIcon={<Edit />} />
                      <LoadingButton
                        loading={loading && target === categoryy.id}
                        onClick={() => handleSelectCategory(categoryy)}
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
  );
}