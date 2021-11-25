import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {Container, Row, Col, Badge, OverlayTrigger, Tooltip} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFlushed, faGrin } from "@fortawesome/free-solid-svg-icons";

import { LEDGER_DETAIL_URL } from "shared/action/url";
import { headers } from "shared/util/headers";
import LedgerDetailTables from "components/ledger/LedgerDatailTables";
import LedgerDetailModal from "components/ledger/LedgerDetailModal";


function LedgerDetail({location}) {
   
    const financialLedgerIdx = location.state.financialLedgerIdx, financialLedgerDate = location.state.financialLedgerDate;

    const [ledgerDetailDatas, setLedgerDetailDatas] = useState([]);
    const [ledgerType, setLedgType] = useState("")
    const [plusData, setPlusData] = useState([]);
    const [minusData, setMinusData] = useState([]);
    const [allPlus, setAllPlus] = useState(0)
    const [allMinus, setAllMinus] = useState(0)

    const [modalShow, setModalShow] = useState(false)
    
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

    useEffect( () => {
        let allPlus = 0;
        let allMinus = 0;
       plusData?.forEach( v => allPlus += v.price)
       minusData?.forEach( v => allMinus += v.price)
       setAllPlus(allPlus)
       setAllMinus(allMinus)
    }, [plusData, minusData])



    return (
        <>
            <Container className="mt-4">
                <Row>
                    <OverlayTrigger
                        key="bottom"
                        placement="bottom"
                        overlay={
                            <Tooltip id="tooltip-bottom">
                                <span className="font-size-0-8">차액 : {(allPlus-allMinus) > 0 && "+"}{(allPlus - allMinus).toLocaleString('ko-KR')}</span>
                            </Tooltip>
                        }
                        >
                        <span className="mt-5 max-width-13 font-size-1-9">{financialLedgerDate}</span>
                    </OverlayTrigger>
                    <hr/>
                </Row>

                <Row>
                    <Col>
                       <OverlayTrigger
                            key="bottom"
                            placement="bottom"
                            overlay={
                                <Tooltip id="tooltip-bottom">
                                    <span className="font-size-0-8">전체 수입 : {allPlus.toLocaleString('ko-KR')}</span>
                                </Tooltip>
                            }
                            >
                            <Badge bg="dark" >수입 내역</Badge>
                        </OverlayTrigger>
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
                        {plusData?.length 
                            ?
                                <LedgerDetailTables datas={plusData} /> 
                            :
                                 <>
                                    내역이 없어요..<FontAwesomeIcon icon={faFlushed} className="ml-04" />
                                    <br/>
                                    추가해 주세요!<FontAwesomeIcon icon={faGrin} className="ml-04"/>
                                </>
                        }
                    </Col>
                    <Col>
                    <OverlayTrigger
                            key="bottom"
                            placement="bottom"
                            overlay={
                                <Tooltip id="tooltip-bottom">
                                    <span className="font-size-0-8">전체 지출 : {allMinus.toLocaleString('ko-KR')}</span>
                                </Tooltip>
                            }
                            >
                            <Badge bg="dark" >지출 내역</Badge>
                        </OverlayTrigger>
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
                        {minusData?.length 
                            ?
                                <LedgerDetailTables datas={minusData} /> 
                            : 
                                <>
                                    내역이 없어요..<FontAwesomeIcon icon={faFlushed} className="ml-04"/>
                                    <br/>
                                    추가해 주세요!<FontAwesomeIcon icon={faGrin} className="ml-04"/>
                                </>
                        }
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