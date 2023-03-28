import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { createUser, getUsers, updateUserById } from '../../apis/userService.js';
import { useTheme } from '@mui/material';
import { tokens } from '../../alternative_theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/header.jsx';
import { Stack } from '@mui/system';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ id: '', name: '', email: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const userList = await getUsers();
            setUsers(userList);
        } catch (error) {
            // console.error('Error fetching users:', error);
            // loggerService.error({ error }, 'Error fetching users');
        }
    };

    const handleAddUser = async () => {
        try {
            const createdUser = await createUser(newUser);
            setUsers([...users, createdUser]);
            setNewUser({ id: '', name: '', email: '' });
        } catch (error) {
            // console.error('Error creating user:', error);
            // loggerService.error({ error }, 'Error creating users');
        }
    };

    const handleUpdateUser = async (id, updatedData) => {
        try {
            const updatedUser = await updateUserById(id, updatedData);
            const updatedUserIndex = users.findIndex((user) => user.id === id);
            const updatedUserList = [...users];
            updatedUserList[updatedUserIndex] = updatedUser;
            setUsers(updatedUserList);
        } catch (error) {
            // console.error('Error updating user:', error);
            // loggerService.error({ error }, 'Error updating users');
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            // const deletedUser = await deleteUserById(id);
            // console.log('Deleted user:', deletedUser);
            const updatedUserList = users.filter((user) => user.id !== id);
            setUsers(updatedUserList);
        } catch (error) {
            // console.error('Error deleting user:', error.response || error);
            // loggerService.error({ error }, 'Error deleting users');
        }
    };

    const isNonMobile = useMediaQuery('(min-width:600px)');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box sx={{ m: '50px' }}>
            <Header title='ADD USER' subtitle='User list' />

            <div style={{ width: '100%' }}>
                <Box
                    sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 1,
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                    }}
                >
                    <TextField fullWidth
                        id='filled-basic'
                        variant='filled'
                        label='ID'
                        value={newUser.id}
                        onChange={(e) => setNewUser({ ...newUser, id: parseInt(e.target.value) })}
                        sx={{ gridColumn: 'span 1' }}
                    />
                    <TextField fullWidth
                        id='filled-basic'
                        variant='filled'
                        label='Name'
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        sx={{ gridColumn: 'span 1' }}
                    />
                    <TextField fullWidth
                        id='filled-basic'
                        variant='filled'
                        label='Email'
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        sx={{ gridColumn: 'span 1' }}
                    />
                </Box>
                {/* <Box sx={{ '& > :not(style)': {my: 4, ml: 'auto',} }}> */}
                <Stack
                    direction='row'
                    spacing={2}
                    sx={{ '& > :not(style)': { my: 4, ml: 'auto' } }}
                >
                    <Button variant='contained'
                        style={{ background: colors.success[100] }}
                        size='medium'
                        onClick={handleAddUser}>Add user</Button>
                </Stack>
                {/* </Box> */}
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell >Name</TableCell>
                            <TableCell align=''>Email</TableCell>
                            <TableCell align=''>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component='th' scope='row'>
                                    {user.name}
                                </TableCell>
                                <TableCell align=''>{user.email}</TableCell>
                                <TableCell align=''>
                                    <Button variant='contained'
                                        style={{ background: colors.primary[100], marginRight: 4 }}
                                        size='medium'
                                        onClick={() => handleUpdateUser(user.id, { name: 'Updated Name' })}>Update</Button>
                                    <Button variant='contained'
                                        style={{ background: colors.danger[100], marginRight: 4 }}
                                        size='medium'
                                        onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    // <div>
    //     <h1>User List</h1>
    //     <ul>
    //         {users.map((user) => (
    //             <li key={user.id}>
    //                 {user.name} - {user.email}{' '}
    //                 <button onClick={() => handleUpdateUser(user.id, { name: 'Updated Name' })}>
    //                     Update
    //                 </button>{' '}
    //                 <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
    //             </li>
    //         ))}
    //     </ul>
    //     <h2>Add User</h2>
    //     <div>
    //         <input
    //             type='number'
    //             placeholder='ID'
    //             value={newUser.id}
    //             onChange={(e) => setNewUser({ ...newUser, id: parseInt(e.target.value) })}
    //         />
    //         <input
    //             type='text'
    //             placeholder='Name'
    //             value={newUser.name}
    //             onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
    //         />
    //         <input
    //             type='email'
    //             placeholder='Email'
    //             value={newUser.email}
    //             onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
    //         />
    //         <button onClick={handleAddUser}>Add User</button>
    //     </div>
    // </div>
    );
};

export default UserList;
