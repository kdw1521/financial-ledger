import {Modal, Button, FloatingLabel, Form} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSurprise } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { LEDGER_DETAIL_URL } from "shared/action/url";
import { headers } from "shared/util/headers";

function LedgerDetailModal(props) {

    const [detailIdx, setDetailIdx] = useState(props.detailidx)
    const [price, setPrice] = useState(props.price)
    const [details, setDetails] = useState(props.details)

    useEffect( () => {
        setDetailIdx(props.detailidx)
        setPrice(props.price)
        setDetails(props.details)
    }, [props.detailidx, props.details, props.price])

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

    const onClickUpdateLedgerDetailData = async () => {
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


    return (
        <Modal
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    change price or details??<FontAwesomeIcon icon={faSurprise} className="ml-04"/>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FloatingLabel
                        controlId="floatingInput"
                        label="price"
                        className="mb-3"
                >
                    <Form.Control type="number" value={price} name="price" onChange={onChange} />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="details"
                    className="mb-3"
                >
                    <Form.Control type="text" value={details} name="details" onChange={onChange} />
                </FloatingLabel>
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="outline-dark" onClick={onClickUpdateLedgerDetailData}>Save</Button>
            <Button variant="outline-dark" onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default LedgerDetailModal