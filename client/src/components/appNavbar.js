import React,{useState,useContext} from 'react';
import {Context} from './DataProvider'
import {
    Collapse, //toggler for hamburer menu
    Navbar, //the bar
    NavbarToggler, 
    NavbarBrand, //logo
    Nav, //wraps around all links
    NavItem, //wraps nav link
    NavLink, //will have the href link
    Container
  } from 'reactstrap';

  

function AppNavbar(){
    const [IsOpen, setIsOpen] = useState(false);
    const {ItemsArray} = useContext(Context)
    function toggle(){
        setIsOpen(!IsOpen);
    }

  
  
return(
    <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
            <NavbarBrand href="/">ShoppingList</NavbarBrand>
            <NavbarToggler onClick ={toggle}/>
            <Nav className="ml-5" >
                    <h3 style={{color: 'white'}}> Number of Items = {ItemsArray.length}</h3>
            </Nav>
            <Collapse isOpen = {IsOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                    {/* later make it github */}
                        <NavLink href="https://github.com/Ahmed-Bektash/MERN_ShoppingListApp" target='_'> Project on GitHub</NavLink> 
                    </NavItem>
                   
                </Nav>
            </Collapse>
        </Container>
    </Navbar>
)
};
export default AppNavbar;

