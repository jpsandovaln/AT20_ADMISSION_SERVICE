import React from 'react'
import ReactDOM from 'react-dom/client'
import {UserForm, ImageUser} from './UserForm'
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root')); // tenemos una aplicacion react inicializada

root.render(<div>
     <ImageUser/>
     <UserForm/>
</div>) //espera elementos hijos , elemntos html
