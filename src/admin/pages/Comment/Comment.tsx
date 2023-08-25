import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { TableRow, TableCell, Button, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import AppPagination from '../../../components/UI/AppPagination/AppPagination';
import { useAppDispatch } from '../../../store/configureStore';
import { Fragment, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import agent from '../../../api/agent';
import { Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useComments from '../../../hooks/useComments';
import { Comment } from '../../../models/comment';
import { removeComment, setComment, setPageNumber } from '../../../store/slice/commentSlice';
import CommentForm from '../../components/CommentForm/CommentForm';
import {BsFillCheckCircleFill} from 'react-icons/bs'
import {BsInfoCircle} from 'react-icons/bs'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to={'/admin/comment'} color="inherit">
        Namiq
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function CommentPage() {
  const {comment,metaData} = useComments();
  const [editMode,setEditMode] = useState(false)

  const dispatch = useAppDispatch();
  const [selectedComment, setSelectedComment] = useState<Comment | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);
  const [targetAction, setTargetAction] = useState<string>('')


  function handleSelectComment(comment: Comment) {
    setSelectedComment(comment);
    setEditMode(true);
  }

  function handleDeleteComment(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Admin.deleteComment(id)
      .then(() => dispatch(removeComment(id)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  function handleAcceptComment(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Admin.acceptComment(id) 
      .then(() => dispatch(setComment(id)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  function cancelEdit() {
    if (selectedComment) setSelectedComment(undefined);
    setEditMode(false);
  }

  if (editMode) {
    return (
        <CommentForm
            comment={selectedComment}
            cancelEdit={cancelEdit}
        />
    );
}

  return (
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid className='!flex-col' container spacing={3}>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Comment</Typography>
                <Button onClick={() => setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Create</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Comment</TableCell>
                            <TableCell align="center">Settings</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
              {comment.map((item,index) => {

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
                  handleDeleteComment(item.id)
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
                    <TableCell align="left">
                      {item?.text}
                    </TableCell>

                    <TableCell align="center">
                    {item.isAccepted ? (
                          <Fragment>
                            <Button onClick={() => handleSelectComment(item)} startIcon={<BsInfoCircle />} />
                            <LoadingButton
                              style={{minWidth: '48px'}}
                              loading={loading && target === item.id}
                              onClick={() => handleClick()}
                              startIcon={<Delete />} color='error' />
                          </Fragment>
                        ) : (
                          <Fragment>
                            <LoadingButton
                              style={{minWidth: '48px'}}
                              loading={loading && target === item.id && targetAction === 'success'}
                              onClick={() => {
                                setTargetAction('success'); 
                                handleAcceptComment(item.id);
                              }}
                              startIcon={<BsFillCheckCircleFill />} color='success' />

                            <Button onClick={() => handleSelectComment(item)} startIcon={<BsInfoCircle />} />
                            <LoadingButton
                              style={{minWidth: '48px'}}
                              loading={loading && target === item.id && targetAction === 'delete'}
                              onClick={() => {
                                setTargetAction('delete');
                                handleClick();
                              }}
                              startIcon={<Delete />} color='error' />
                          </Fragment>
                        )}
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