import './App.css';
import AllRoutes from './Components/AllRoutes';
import Navbar from './Components/Navbar/Navbar';
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import {
  Flex,
} from '@chakra-ui/react'
import LeftsideBar from './Components/LeftSideBar/LeftsideBar';

function App() {
  return (
    <Router>
      <Navbar />
      <Flex>
        <LeftsideBar />
        <AllRoutes />
      </Flex>
    </Router>
  );
}

export default App;
