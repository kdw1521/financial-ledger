import {Navbar, Nav, Container } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import {name} from 'shared/util/localStorage'


function Header() {

    const history = useHistory();

    const onLogoutClick = () => {
        localStorage.clear()
        history.push("/")
        window.location.reload()
        
    }

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
                        {(name !== null) && 
                            <>
                                <span style={{color:'white'}} className="d-flex mr-05">
                                    {name !== "" ? name : "name not exist"}
                                </span>
                                <FontAwesomeIcon icon={faSignOutAlt} className="font-color mouse-pointer" onClick={onLogoutClick}/>
                            </>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;