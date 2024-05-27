import React from 'react'
import "./app.scss"
import About from './pages/About'
import Contacts from './pages/Contacts'
import Owner from './pages/Owner'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProtectedRoute from "./utils/ProtectedRoute"
import { AuthProvider } from './context/AuthContext'
import {Dashboard, Home, Login, Register} from "./pages"
import PropertyForm from './pages/PropertyForm';
import PropertyDummy from './pages/PropertyDummy';
import PropertyList from './pages/PropertyList';
import PropertyList1 from './pages/PropertyList1';
import NotFound from './pages/NotFound';
import MyProp from './pages/MyProp';

const App = () => {
  return (
    <div className='App'>
        <div className='container'>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route 
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" exact element={<Home />} />
                        <Route path="/about" exact element={<About />} />
                        <Route path="/owner" exact element={<Owner/>} />
                        {/* <Route path="/tenant" exact element={<Ten/>} /> */}
                        <Route path="/add-property" exact element={<PropertyForm/>} />
                        <Route path="/properties" exact element={<PropertyList/>} />
                        <Route path="/my" exact element={<MyProp/>} />
                        <Route path="/propertieslist" exact element={<PropertyList1/>} />
                        <Route path="/propertylist" exact element={<PropertyDummy/>} />
                        <Route path="/contacts" exact element={<Contacts />} />
                        <Route path="*" element={<NotFound />} />

                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    </div>
  )
}

export default App