import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';

import UserApp from './UserComponents/App'
import AdminApp from './AdminComponents/App'

import CommonRouts from "./Components/Router"

import { HashRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <NotificationContainer/>

    <HashRouter>
    <CommonRouts/>
    <AdminApp/>
    <UserApp/>
    </HashRouter>
  </div>
  ) 
}
export default App;
