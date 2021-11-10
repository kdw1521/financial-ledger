import {Card} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrownOpen } from "@fortawesome/free-solid-svg-icons";

function NotExistLedgerCard() {
    return (
        <div className="col-12 p-1 col-sm-4 p-sm-2 col-md-4 p-md-3 col-lg-2 p-lg-4 mt-3">
                <Card border="dark" style={{ width: '17rem' }}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faFrownOpen} /> no data..
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <span>    plz.. <br/>add financial ledger date</span>
                        </Card.Title>
                    </Card.Body>
                </Card>
            </div>
    )
}

export default NotExistLedgerCard