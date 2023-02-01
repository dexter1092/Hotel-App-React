import React from 'react';
import "./adduser.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

const AddUser = () => {
       
     const initialValues = { 
          name:"", 
          email_id:"",
          user_type : "",
          password : "",
          confirm_password: ""
     }
     const navigate                     = useNavigate();
     const [file, setFile]              = useState("");
     const [formValues, setFormValues]  = useState(initialValues);
     const [formErrors, setFormErrors]  = useState({});
     const [isSubmit, setIsSubmit]      = useState(false);

     const handleChange = async ( event ) => {
          const{name, value} = event.target;
          setFormValues({...formValues, [name]:value});
      }

     const submitData = async (formValues) => {
          const data = {
               user_type_id: formValues.user_type,
               name: formValues.name,
               email_id: formValues.email_id,
               password: formValues.password
          };

          let result = await fetch("http://localhost:3000/api/v1/users/add-user", {
               method: 'POST',
               headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
               },
               body: JSON.stringify(data)
          });
          result = await result.json();
          if (true === result.status) {
               toast.success('User Added Successfully!!!');
               navigate("/users");
          } else {
               navigate("/add-user");
               toast.error(result.status.message);
          }
     } 

     useEffect(() => {
          if (Object.keys(formErrors).length === 0 && isSubmit) {
               submitData(formValues);
               
          }
     },[formErrors]);

     const handleSubmit = (event) => {
          event.preventDefault();
          setFormErrors(validate(formValues));
          setIsSubmit(true);
     }

     const validate = (values) => {
          const errors = {};
          const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;
          if (!values.name) {
               errors.name = "Name is required";
          }
          if (!values.email_id) {
               errors.email_id = "Email is required";
          }else if (!regex.test(values.email_id)) {
               errors.email_id = "Enter valid Email";
          }
          if (!values.user_type) {
               errors.user_type = "Select user type";
          }
          if (!values.password) {
               errors.password = "Password is required";
          }
          if (!values.confirm_password) {
               errors.confirm_password = "Confirm password is required";
          }
          if (values.password !== values.confirm_password) {
               errors.confirm_password = "Confirm password does not match with password";
          }
          return errors;
     }

     return (
     <div className="new">
          <Sidebar />
          <div className="newContainer">
          <Navbar />
          <div className="top">
          <h1>Add User</h1>
          </div>
          <div className="bottom">
          <div className="left">
               <img
               src={
                    file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
               }
               alt=""
               />
          </div>
          <div className="right">
               <form onSubmit={handleSubmit}>
               <div className="formInput">
                    <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                    />
               </div>

               <div className="formInput">
                    <label>Name</label>
                    <input type='text' placeholder='Name' onChange={handleChange} value={formValues.name} name='name' />
                    <p className='validation'>{formErrors.name}</p>                    
               </div>
               <div className="formInput">
                    <label>Type</label>
                    <select className="select" placeholder='select' value={formValues.userType} onChange={handleChange} name="user_type">
                         <option value='1'>Admin</option>		
                         <option value='2'>Manager</option>		
                    </select>
                    <p className='validation' >{formErrors.user_type}</p>
               </div>
               <div className="formInput" >
                    <label>Email</label>
                    <input type='email' placeholder='Email Id' value={formValues.emaiId} onChange={handleChange} name='email_id' />
                    <p className='validation'>{formErrors.email}</p>                    
               </div>
               <div className="formInput">
                    <label>Password</label>
                    <input type='password' placeholder='Password' value={formValues.password} onChange={handleChange} name='password' />
                    <p className='validation'>{formErrors.password}</p>
               </div>
               <div className="formInput">
                    <label>Confirm Password</label>
                    <input type='password' placeholder='Confirm Password' value={formValues.confirmPassword} onChange={handleChange} name='confirm_password' />
                    <p className='validation'>{formErrors.confirm_password}</p>
               </div>
               <button>Send</button>
               </form>
          </div>
          </div>
          </div>
     </div>
     );
};

export default AddUser;