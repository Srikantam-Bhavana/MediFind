import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterAndLogin from './RegisterAndLogin'
import Home from './Home'
import ForgotPassword from './ForgotPassword'
import Disclaimer from './Disclaimer'
import ReceiptAnalyzer from './ReceiptAnalyzer'
import SearchMedicines from './SearchMedicines'
import Feedback from './Feedback'

const Pages = () => {
  return (
    <BrowserRouter>
        <div>
            <Routes>
                <Route path = "/" element = {<RegisterAndLogin/>}/>
                <Route path = "/home" element = {<Home/>}/>
                <Route path = "/reset" element = {<ForgotPassword/>}/>
                <Route path = "/disclaimer" element = {<Disclaimer/>}/>
                <Route path = "/uploadPrescription" element={<ReceiptAnalyzer/>}/>
                <Route path = "/searchMedicine" element={<SearchMedicines/>}/>
                <Route path = "/Feedback" element={<Feedback/>}/>
                <Route path = "/History" element={<Home/>}/>
            </Routes>
        </div>
    </BrowserRouter> 
  )
}

export default Pages