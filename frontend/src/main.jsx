import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import api from './features/api/api.js';
import './index.css'

createRoot(document.getElementById('root')).render(
<ApiProvider api={api}>
    <App />
</ApiProvider> 
)
