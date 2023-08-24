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
import useTag from '../../../hooks/useTag';
import { Tag } from '../../../models/tag';
import TagForm from '../../components/TagForm/TagForm';
import { removeTag, setPageNumber } from '../../../store/slice/tagSlice';
import Swal from 'sweetalert2';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to={'/admin/tag'} color="inherit">
        Namiq
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function TagPage() {
  const {tag,metaData} = useTag();
  const [editMode,setEditMode] = useState(false)

  const dispatch = useAppDispatch();
  const [selectedTag, setSelectedTag] = useState<Tag | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);


  function handleSelectTag(tag: Tag) {
    setSelectedTag(tag);
    setEditMode(true);
  }

  function handleDeleteTag(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Admin.deleteTag(id)
      .then(() => dispatch(removeTag(id)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  function cancelEdit() {
    if (selectedTag) setSelectedTag(undefined);
    setEditMode(false);
  }

  if (editMode) {
    return (
        <TagForm
            tag={selectedTag}
            cancelEdit={cancelEdit}
        />
    );
}

  return (
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid className='!flex-col' container spacing={3}>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Tag</Typography>
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
              {tag.map((item,index) => {

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
                  handleDeleteTag(item.id)
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
                      <Button onClick={() => handleSelectTag(item)} startIcon={<Edit />} />
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