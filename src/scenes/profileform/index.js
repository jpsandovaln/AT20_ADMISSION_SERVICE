import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
//import * as yup from "yup";
//import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react"
import {useMutation, useQuery} from '@apollo/client'
import { CREATE_USER, UPLOAD_IMAGE } from "../../graphql/user";
import Header from '../../components/header';
import { GET_ROLES } from "../../graphql/role";

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    rol: ''
};



export default function Form () {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { data: rolesData, loading: rolesLoading, error: rolesError } = useQuery(GET_ROLES );

  const [user, setUser] = useState({
    globalID: "",
    firstName: "", 
    lastName: "",
    userName: "",
    firstPassword: "",
    password: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    age: 0,
    roleId: "",
    photo: "",
  });

  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      alert('User created successfully!');
      setUser({ firstName: '', lastName:'', email: '', phone:'', role: '', photo:'' });
    },
  });

  const [singleUpload] = useMutation(UPLOAD_IMAGE);
  const [newImage, setnewImage] = useState(null);

const [userPhoto, setUserPhoto] = useState(null);

const handlePhotoChange = (e) => {
  setUserPhoto(e.target.files[0]);
  setnewImage(e.target.files[0]);
};

const handlePhotoUpload = async () => {
 const { data } = await singleUpload({
    variables: {
      file: newImage,
    },
  });
  return data.singleUpload;
};

  if (loading) return <p>Loading...</p>
  if (error) return `Submission error! ${error.message}`;


  const handleSubmit = async (e) => {
    e.preventDefault();
    const photoName = await handlePhotoUpload();
    console.log(photoName);
    createUser({
      variables: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: "",
        phone: user.phone,
        roleId: user.role,
        photo: photoName,
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    
  };

  return (
    
    <Box m="20px">
    <Header title="CREATE USER" subtitle="NEW USER" />
      <Formik
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onChange={handleChange}
                name="firstName"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onChange={handleChange}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onChange={handleChange}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}  
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone"
                onChange={handleChange}
                name="phone"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <Box sx={{ gridColumn: "span 2" }}>
              <Select
                    fullWidth
                    variant="filled"
                    label="Role"
                    name="role"
                    onChange={handleChange}
                    value={user.role}
                    error={!!touched.role && !!errors.role}
                    >
                  {rolesData && rolesData.roles.map((role) => (
                  <MenuItem key={role._id} value={role._id}>{role.name}</MenuItem>
                    ))}
                  </Select>
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create New User"}
              </Button>
            </Box>
            <Box>
            <input
              type="file"
              name="photo"
              value={user.photo}
              onChange={handlePhotoChange}
              />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
export { initialValues, Form};
