/* eslint-disable react/react-in-jsx-scope */
import { Box, Button, TextField, Input } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/header';
import { useState } from 'react';
import { convertImage } from '../../apis/convertService';
import { createUser } from '../../apis/userService';
import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const initialValues = {
    userName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    rol: '',
    file: null,
};

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    userName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().required('invalid password').required('required'),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('required'),
});

export default function Form () {
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const [previewImage, setPreviewImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

        const handleClickShowPassword = () => {
          setShowPassword(!showPassword);
        };

        const handleMouseDownPassword = (event) => {
          event.preventDefault();
        };

    const generateImagePreview = async (file) => {
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);

        try {
          const convertedImageUrl = await convertImage(file);
          setPreviewImage(convertedImageUrl);
        } catch (error) {
          console.error(error);
        }
    };

      const handleFormSubmit = async (values) => {
        try {
          // Convertir la imagen
          const convertedImageUrl = await convertImage(values.image);
          // Agregar la URL de la imagen convertida a los valores enviados al servicio de usuario
          const user = { ...values, image: convertedImageUrl };
          const result = await createUser(user);
          console.log('Result:', result);
          // Aquí puedes mostrar un mensaje de éxito al usuario o redirigirlo a otra página
        } catch (error) {
          console.error('Error:', error);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      };

    return (
        <>
            <Box m="20px">
                <Header title="EDIT USER" subtitle="Edit User Profile" />
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.userName}
                                    name="userName"
                                    error={!!touched.userName && !!errors.userName}
                                    helperText={touched.userName && errors.userName}
                                    sx={{ gridColumn: 'span 2' }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={!!touched.lastName && !!errors.lastName}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: 'span 2' }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                    sx={{ gridColumn: 'span 4' }}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                          >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        </InputAdornment>
                                      ),
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Contact Number"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.phone}
                                    name="phone"
                                    error={!!touched.phone && !!errors.phone}
                                    helperText={touched.phone && errors.phone}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                            </Box>
                            <Box display="flex" justifyContent="right" mt="20px">
                                <Input type="file" id="image" accept=".jpg,.jpeg,.png,.gif"
                                    onChange={(event) => {
                                        setFieldValue('image', event.currentTarget.files[0]);
                                        generateImagePreview(event.target.files[0]);
                                      }}
                                    error={!!touched.image && !!errors.image}
                                    inputProps={{
                                        style: {
                                            display: 'none'
                                        }
                                    }}
                                />
                                <label htmlFor="image">
                                    <Button variant="contained" color="primary" component="span" >
                                        Upload Photo
                                    </Button>
                                </label>
                                {touched.image && errors.image && (
                                    <Box color="red">{errors.image}</Box>
                                )}
                            </Box>
                            {previewImage && (
                            <Box display="flex" justifyContent="center">
                                <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                            </Box>
                            )}
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Send
                                </Button>
                            </Box>


                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}
export { initialValues, Form };
