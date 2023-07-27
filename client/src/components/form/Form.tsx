import { useState } from "react";
import { Formik } from "formik";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";
import './Form.scss';

interface InitialValuesLogin {
 [x: string]: unknown;
 email: string;
 password: string;
}

interface InitialValuesRegister {
 firstName: string;
 lastName: string;
 email: string;
 password: string;
 location: string;
 specialties: string[];
 picture: string;
}

const registerSchema = yup.object().shape({
 firstName: yup.string().required("required"),
 lastName: yup.string().required("required"),
 email: yup.string().email("invalid email").required("required"),
 password: yup.string().required("required"),
 location: yup.string().required("required"),
 specialties: yup.array().required("required"),
 picture: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
 email: yup.string().email("invalid email").required("required"),
 password: yup.string().required("required"),
})

const initialValuesRegister: InitialValuesRegister = {
 firstName: "",
 lastName: "",
 email: "",
 password: "",
 location: "",
 specialties: [],
 picture: ""
}

const initialValuesLogin: InitialValuesLogin = {
 email: "",
 password: "",
}

const Form = () => {
 const [pageType, setPageType] = useState("login");
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const isLogin = pageType === "login";
 const isRegister = pageType === "register";

 const handleFormSubmit = async (values, onSubmitProps) => { };

 return (
  <Formik
   onSubmit={handleFormSubmit}
   initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
   validationSchema={isLogin ? loginSchema : registerSchema}
  >
   {({
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm
   }) => (
    <form onSubmit={handleSubmit}>
     <Box className="form">
      {isRegister && (
       <>
        <TextField
         aria-label="First Name"
         onBlur={handleBlur}
         onChange={handleChange}
         value={values.firstName}
         name="firstName"
         error={Boolean(touched.firstName) && Boolean(errors.firstName)}
         helperText={touched.firstName && errors.firstName}
         sx={{ gridColumn: "span 2" }}
        />
        <TextField
         aria-label="Last Name"
         onBlur={handleBlur}
         onChange={handleChange}
         value={values.lastName}
         name="lastName"
         error={Boolean(touched.lastName) && Boolean(errors.lastName)}
         helperText={touched.lastName && errors.lastName}
         sx={{ gridColumn: "span 2" }}
        />
        <TextField
         aria-label="Location"
         onBlur={handleBlur}
         onChange={handleChange}
         value={values.location}
         name="location"
         error={Boolean(touched.location) && Boolean(errors.location)}
         helperText={touched.location && errors.location}
         sx={{ gridColumn: "span 2" }}
        />
       </>
      )}
     </Box>
    </form>
   )}
  </Formik >
 );
}

export default Form;