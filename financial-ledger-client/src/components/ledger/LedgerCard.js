import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom';
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
             if(result.data === "success") {
                 window.location.reload()
             }
        } catch (err) {
            console.log(err.message)
            if(err.response.status === 401) {
                alert("토큰 만기로 로그아웃 됩니다. 재로그인 해주세요!") 
                localStorage.clear()
                window.location.reload()
             }
        }
    }


    return (
            <div className="col-12 p-1 col-sm-4 p-sm-2 col-md-4 p-md-3 col-lg-2 p-lg-4" >
                <Card border="dark" style={{ width: '10rem', textAlign: "center" }}>
                    <Card.Header>
                        <span 
                            id={datas.financialLedgerIdx} 
                            onClick={onDeleteClick} 
                            className="mouse-pointer font-color mr-6"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </Card.Header>
                    <Link to={{
                        pathname: "/detail",
                        state: {
                            financialLedgerIdx: datas.financialLedgerIdx,
                            financialLedgerDate: datas.financialLedgerDate
                        }
                    }} style={{color: "black"}}>
                        <Card.Body className="mouse-pointer">
                            <Card.Title>{datas.financialLedgerDate}</Card.Title>
                        </Card.Body>
                    </Link>
                </Card>
            </div>
    )
}

export default LedgerCard;