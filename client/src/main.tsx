<<<<<<< HEAD
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import DataProvider from "./store/DataProvider.tsx";
=======
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import DataProvider from './store/DataProvider.tsx';
>>>>>>> c87f93f8c0a6b31302b48d576a74ddf1cd19a910

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <DataProvider>
    <App />
  </DataProvider>
  // </React.StrictMode>
);
