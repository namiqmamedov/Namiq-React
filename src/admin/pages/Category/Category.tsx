import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { TableRow, TableCell, Button, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import AppPagination from '../../../components/UI/AppPagination/AppPagination';
import { useAppDispatch } from '../../../store/configureStore';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import agent from '../../../api/agent';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useCategory from '../../../hooks/useCategory';
import { Category } from '../../../models/category';
import CategoryForm from '../../components/CategoryForm/CategoryForm';
import { removeCategory, setPageNumber } from '../../../store/slice/categorySlice';
import Swal from 'sweetalert2';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to={'/admin/category'} color="inherit">
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
    agent.Admin.deleteCategory(id)
      .then(() => dispatch(removeCategory(id)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  function cancelEdit() {
    if (selectedCategory) setSelectedCategory(undefined);
    setEditMode(false);
  }

  if (editMode) {
    return (
        <CategoryForm
            category={selectedCategory}
            cancelEdit={cancelEdit}
        />
    );
}

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
              {category.map((item,index) => {

            const currentPage = metaData!!.currentPage;
            const pageSize = metaData!!.pageSize;

            const startNumber = (currentPage - 1) * pageSize + index + 1;

            const handleClick = () => {
              Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  handleDeleteCategory(item.id)
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
              })
            }

            return (
                  <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {startNumber}
                    </TableCell>
                    <TableCell align="left">
                    {item?.name}
                    </TableCell>

                    <TableCell align="center">
                      <Button onClick={() => handleSelectCategory(item)} startIcon={<Edit />} />
                      <LoadingButton
                        loading={loading && target === item.id}
                        onClick={() => handleClick()}
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