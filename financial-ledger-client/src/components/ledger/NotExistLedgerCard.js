import {Card} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrownOpen } from "@fortawesome/free-solid-svg-icons";

function NotExistLedgerCard() {
    return (
        <div className="col-12 p-1 col-sm-4 p-sm-2 col-md-4 p-md-3 col-lg-2 p-lg-4 mt-3">
                <Card border="dark" style={{ width: '18rem' }}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faFrownOpen} /> 날짜가 없네요..
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <span className="font-size-0-9">가계부 날짜를 추가해보세요!<br/>위에서 날짜를 선택하고 추가를 눌러보세요!</span>
                        </Card.Title>
                    </Card.Body>
                </Card>
            </div>
    )
}

export default NotExistLedgerCard