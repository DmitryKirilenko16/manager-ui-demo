import React from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const GenericToastContainerFC: React.FC = () => (
    <ToastContainer style={{width: '100%'}} />
)

export const GenericToastContainer = GenericToastContainerFC
