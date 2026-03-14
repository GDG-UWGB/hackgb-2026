// This is the entry point of the React application. It sets up the main App component and routing.

import { BrowserRouter } from 'react-router-dom';
import AnimatedRoutes from './components/layout/AnimatedRoutes';
// import Navbar from './components/layout/Navbar2';
// import Footer from './components/layout/Footer2';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar/> */}

        <AnimatedRoutes />

        {/* <Footer/> */}
      </BrowserRouter>

    </>
  )
}

export default App
