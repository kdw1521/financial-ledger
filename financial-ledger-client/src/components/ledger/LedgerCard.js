import {Card} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { LEDGER_URL } from 'shared/action/url';
import { headers } from 'shared/util/headers';

function LedgerCard({datas}) {

    const onDeleteClick = async () => {
        const financialLedgerIdx = document.getElementById(datas.financialLedgerIdx).id

        try {
            const result = await axios.delete(
                `${LEDGER_URL}?ledgerIdx=${financialLedgerIdx}`,
                {headers : headers}
             )
             console.log(result)
             if(result.data === "success") {
                 window.location.reload()
             }
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
            <div className="col-12 p-1 col-sm-4 p-sm-2 col-md-4 p-md-3 col-lg-2 p-lg-4" >
                <Card border="dark" style={{ width: '9rem' }}>
                    <Card.Header>
                        <span id={datas.financialLedgerIdx} onClick={onDeleteClick} className="mouse-pointer font-color">
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{datas.financialLedgerDate}</Card.Title>
                    </Card.Body>
                </Card>
            </div>
    )
}

export default LedgerCard;