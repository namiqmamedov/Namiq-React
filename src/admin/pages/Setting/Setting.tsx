import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { TableRow, TableCell, Button, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import { useState } from 'react';
import { Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useSettings from '../../../hooks/useSettings';
import { Setting } from '../../../models/setting';
import SettingForm from '../../components/SettingForm/SettingForm';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to={'/admin/setting'} color="inherit">
        Namiq
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SettingPage() {
  const {setting,metaData} = useSettings();
  const [editMode,setEditMode] = useState(false)

  const [selectedSetting, setSelectedSetting] = useState<Setting | undefined>(undefined);

  function handleSelectSetting(setting: Setting) {
    setSelectedSetting(setting);
    setEditMode(true);
  }

  function cancelEdit() {
    if (selectedSetting) setSelectedSetting(undefined);
    setEditMode(false);
  }

  if (editMode) {
    return (
        <SettingForm
            setting={selectedSetting}
            cancelEdit={cancelEdit}
        />
    );
}

  return (
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, maxWidth: '94% !important' }}>
            <Grid className='!flex-col' container spacing={3}>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Setting</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Key</TableCell>
                            <TableCell align="left">Value</TableCell>
                            <TableCell align="center">Settings</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
              {setting.map((item,index) => {

            const currentPage = metaData!!.currentPage;
            const pageSize = metaData!!.pageSize;

            const startNumber = (currentPage - 1) * pageSize + index + 1;

            return (
                  <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {startNumber}
                    </TableCell>
                    <TableCell align="left">
                    {item?.key}
                    </TableCell>
                    <TableCell align="left">
                    {item?.value}
                    </TableCell>

                    <TableCell align="center">
                      <Button onClick={() => handleSelectSetting(item)} startIcon={<Edit />} />
                    </TableCell>
                  </TableRow>
                );
              })}
                </TableBody>
                </Table>
            </TableContainer>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
  );
}