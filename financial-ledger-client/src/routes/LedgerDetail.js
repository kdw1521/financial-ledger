import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {Container, Row, Col, Badge } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { LEDGER_DETAIL_URL } from "shared/action/url";
import { headers } from "shared/util/headers";
import LedgerDetailTables from "components/ledger/LedgerDatailTables";
import LedgerDetailModal from "components/ledger/LedgerDetailModal";


function LedgerDetail({location}) {
   
    const financialLedgerIdx = location.state.financialLedgerIdx, financialLedgerDate = location.state.financialLedgerDate;

    const [ledgerDetailDatas, setLedgerDetailDatas] = useState([]);
    const [plusData, setPlusData] = useState([]);
    const [minusData, setMinusData] = useState([]);

    const [modalShow, setModalShow] = useState(false)
    const [ledgerType, setLedgType] = useState("")
    
    const getLedgerDetailDatas = useCallback( async () => {
        try {
            const datas = await axios.get(`${LEDGER_DETAIL_URL}?ledgerIdx=${financialLedgerIdx}`, {
                headers: headers
            });
            setLedgerDetailDatas(datas.data) 
        } catch (err) {
            if(err.response.status === 401) {
                alert("토큰 만기로 로그아웃 됩니다. 재로그인 해주세요!") 
                localStorage.clear()
                window.location.reload()
            }   
        }
    }, [financialLedgerIdx]);

    useEffect( () => {
        getLedgerDetailDatas()
    }, [getLedgerDetailDatas]);

    useEffect( () => {
        setPlusData(ledgerDetailDatas.plus)
        setMinusData(ledgerDetailDatas.minus)
    }, [ledgerDetailDatas]);

    return (
        <>
            <Container>
                <Row>
                    <h3 className="mt-5">{financialLedgerDate}</h3>
                    <hr/>
                </Row>
                <Row>
                    <Col>
                        <Badge bg="dark">Plus</Badge>
                        <Badge bg="dark" 
                            className="ml-04 mouse-pointer" 
                            onClick={ () => {
                                setLedgType("plus")
                                setModalShow(true)
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus}  />
                        </Badge>
                        <hr/>
                        <LedgerDetailTables datas={plusData} />
                    </Col>
                    <Col>
                        <Badge bg="dark">Minus</Badge>
                        <Badge bg="dark" 
                            className="ml-04 mouse-pointer" 
                            onClick={ () => {
                                setLedgType("minus")
                                setModalShow(true)
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus}  />
                        </Badge>
                        <hr/>
                        <LedgerDetailTables datas={minusData} />
                    </Col>
                </Row>
            </Container>

            <LedgerDetailModal 
                show={modalShow}
                onHide={() => setModalShow(false)}
                kind="add"
                ledgertype={ledgerType}
                ledgeridx={financialLedgerIdx}
            />
        </>
    )
}

export default LedgerDetail;