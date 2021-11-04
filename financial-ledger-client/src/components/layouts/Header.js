import {Navbar} from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <Navbar bg="dark" variant="dark" className="justify-content-center">
                <Link to="/">
                    <img src="/img/wd.png" style={{height:30}} />
                    <span className="font-color">Financial-ledger</span>
                </Link>
            </Navbar>
        </>
    )
}

export default Header;