import {Modal, Button, FloatingLabel, Form} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSurprise, faGrin } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

import { LEDGER_DETAIL_URL } from "shared/action/url";
import { headers } from "shared/util/headers";

function LedgerDetailModal(props) {

    const [kind, setKind] = useState(props.kind)
    const [ledgerType, setLedgerType] = useState(props.ledgertype)
    const [ledgerIdx, setLedgerIdx] = useState(props.ledgeridx)
    const [detailIdx, setDetailIdx] = useState(props.detailidx)
    const [price, setPrice] = useState(props.price)
    const [details, setDetails] = useState(props.details)

    useEffect( () => {
        setLedgerType(props.ledgertype)
        setKind(props.kind)
        setDetailIdx(props.detailidx)
        setPrice(props.price)
        setDetails(props.details)
        setLedgerIdx(props.ledgeridx)
    }, [
        props.ledgeridx,
        props.ledgertype,
        props.kind, 
        props.detailidx, 
        props.details, 
        props.price
    ])

    const onChange = (e) => {
        const {
            target: {name, value},
        } = e;

        if(name === "price") {
            setPrice(value)
        } else if(name ==="details") {
            setDetails(value)
        }
    }

    const onClickLedgerDetailData = async () => {
        if(kind === "add") {
            try {
                const result = await axios.post(LEDGER_DETAIL_URL,{
                        "price" : Number(price),
                        details,
                        ledgerType,
                        ledgerIdx
                    },
                    {headers: headers}
                )
                if(result.data === "success") {
                    window.location.reload()
                }
            } catch (err) {
                if(err.response.status === 401) {
                    alert("토큰 만료로 로그아웃 됩니다. 재로그인 해주세요!") 
                    localStorage.clear()
                    window.location.reload()
                }
            }
        } else {
            try {
                const result = await axios.put(LEDGER_DETAIL_URL, 
                    {
                        detailIdx,
                        "price" :Number(price),
                        details
                    },
                    {headers: headers}
                )
                if(result.data === "success") {
                    window.location.reload()
                }
            } catch (err) {
                if(err.response.status === 401) {
                    alert("토큰 만료로 로그아웃 됩니다. 재로그인 해주세요!") 
                    localStorage.clear()
                    window.location.reload()
                }
            }
        }
    }

    const onClickDeleteDetailData = async () => {
        try {
            const result = await axios.delete(`${LEDGER_DETAIL_URL}?ledgerDetailIdx=${detailIdx}`,{headers: headers})
            if(result.data === "success") {
                window.location.reload()
            }
        } catch (err) {
            if(err.response.status === 401) {
                alert("토큰 만료로 로그아웃 됩니다. 재로그인 해주세요!") 
                localStorage.clear()
                window.location.reload()
            } 
        }
    }


    return (
        <Modal
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.kind === "add" ? 
                        <><span>add price and details??</span><FontAwesomeIcon icon={faGrin} className="ml-04"/> </>: 
                        <><span>change price or details??</span><FontAwesomeIcon icon={faSurprise} className="ml-04"/> </>
                    }
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FloatingLabel
                        controlId="floatingInput"
                        label="price"
                        className="mb-3"
                >
                    <Form.Control type="number" value={price || ""} name="price" onChange={onChange} />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="details"
                    className="mb-3"
                >
                    <Form.Control type="text" value={details || ""} name="details" onChange={onChange} />
                </FloatingLabel>
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="outline-dark" onClick={onClickLedgerDetailData}>
                {props.kind === "add" ? "Add" : "Change"}
            </Button>
            {props.kind !== "add" &&
                <Button variant="outline-danger" onClick={onClickDeleteDetailData}>Delete</Button>}
          </Modal.Footer>
        </Modal>
      );
}

export default LedgerDetailModal