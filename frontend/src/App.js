import { BrowserRouter,Routes,Route,} from "react-router-dom";
import { Complete, Home, Login, Planned, Registration, Today } from "./Page/page";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/complete" element={<Complete />} />
          <Route path="/today" element={<Today />} />
          <Route path="/planned" element={<Planned />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
