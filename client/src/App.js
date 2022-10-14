import logo from './logo.svg';
import './App.css';
import { Navbar, Container } from 'react-bootstrap';


function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ToolBox</Navbar.Brand>          
        </Container>
      </Navbar>
    </>

  );
}

export default App;
