import "./assets/css/globals.css";
import RoutesFile from "./routes/Routes";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';


function App() {
  return (
    <div className="App">
      <NotificationContainer/>
      <RoutesFile />
    </div>
  );
}

export default App;
