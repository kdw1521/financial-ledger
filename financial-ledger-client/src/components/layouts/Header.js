import {Navbar, Nav, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {name} from 'shared/util/localStorage'

function Header() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Nav>
                    <Link to="/">
                        <img src="/img/wd.png" style={{height:30}} />
                        <span className="font-color">Financial-ledger</span>
                    </Link>
                </Nav>
                <Nav>
                    {name && <span style={{color:'white'}} className="d-flex">{name}</span>}    
                </Nav>                
            </Container>
            </Navbar>
        </>
    )
}

export default Header;