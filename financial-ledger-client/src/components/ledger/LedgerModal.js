import { useState } from "react";
import {Modal, Button} from 'react-bootstrap'
import {toStringByFormatting} from "shared/util/dateFormat"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlushed } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { LEDGER_URL } from "shared/action/url";
import {headers} from "shared/util/headers"

function LedgerModal({checkLedgerDate, selectLedgerDate}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async () => {
        if(checkLedgerDate.length) {
            setShow(true);
        } else {
            const ledgerDate = toStringByFormatting(selectLedgerDate)
            try {
                const result = await axios.post(
                    LEDGER_URL, 
                    {ledgerDate},
                    {headers: headers}
                )
                if(result.data === "해당 날짜는 이미 존재합니다.") {
                    setShow(true)
                } else {
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
    }

    return (
        <>
            <Button variant="outline-dark" onClick={handleShow} style={{height:"2rem", width: "4rem"}}>
                추가
            </Button>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    <span className="font-color">이런!</span>
                </Modal.Header>
                <Modal.Body>
                    해당 날짜는 이미 존재 하네요<FontAwesomeIcon icon={faFlushed} />
                    <br/>
                    다른 날짜를 추가해 보세요!
                    </Modal.Body>
                <Modal.Footer />
            </Modal>
        </>
    )
}

export default LedgerModal