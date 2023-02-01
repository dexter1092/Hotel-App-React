import React from 'react';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import { ToastContainer, toast } from 'react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
// import Single from "./pages/single/Single";
// import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import User from "./pages/users/User";
import AddUser from "./pages/users/add-user/AddUser";

function App() {
     const { darkMode } = useContext(DarkModeContext);
     const { currentUser } = useContext(AuthContext);
     const RequireAuth = ({ children }) => {
          if (currentUser === 'null') {
               return < Navigate to="/login" />
          } else {
               return children;
          }
     };

     return (
          <div className={darkMode ? "app dark" : "app"}>
               <ToastContainer />
               <BrowserRouter>
                    <Routes>
                         <Route path="login" element={< Login />} />
                         <Route index path="/" element={
                              <RequireAuth>
                                   < Home />
                              </RequireAuth>}
                         />
                         <Route index path="/hotels" element={
                              <RequireAuth>
                                   <List />
                              </RequireAuth>
                         }
                         />
                         <Route index path="/users" element={
                              <RequireAuth>
                                   <User />
                              </RequireAuth>
                         }
                         />
                         <Route
                              path="add-user"
                              element={
                                   <RequireAuth>
                                        <AddUser title="Add New User" />
                                   </RequireAuth>}
                         />


                         {/* <Route path=":userId" element={<Single />} /> */}


                         {/* <Route path="products" />
                         <Route index element={<List />} />
                         <Route path=":productId" element={<Single />} />
                          */}

                    </Routes>
               </BrowserRouter>
          </div >
     );
}

export default App;
