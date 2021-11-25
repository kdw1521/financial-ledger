import {Table} from "react-bootstrap"
import {useState} from "react"

import LedgerDetailModal from "components/ledger/LedgerDetailModal";

function LedgerDetailTables({datas}) {

    const [modalShow, setModalShow] = useState(false)
    const [detailIdx, setDetailIdx] = useState(0)
    const [details, setDetails] = useState('')
    const [price, setPrice] = useState(0)
    const [payment, setPayment] = useState('')

    const onClick = (ledgerDetailIdx, details, price, payment) => {
        setDetails(details)
        setDetailIdx(ledgerDetailIdx)
        setPrice(price)
        setPayment(payment)
        setModalShow(true)
    }

    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>결제수단</th>
                        <th>금액</th>
                        <th>사용처</th>
                        <th>내용</th>
                    </tr>
                </thead>
                <tbody>
                    {datas?.map( (val, idx) => {
                        return (
                            <tr 
                                key={val.financialLedgerDetailIdx} 
                                onClick={() => onClick(
                                    val.financialLedgerDetailIdx, 
                                    val.details, 
                                    val.price, 
                                    val.payment)} 
                                className="mouse-pointer"
                            >
                                <td>{val.payment}</td>
                                <td>{val.price}</td>
                                <td>왜 썼는지</td>
                                <td>{val.details}</td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </Table>

            <LedgerDetailModal 
                show={modalShow}
                onHide={() => setModalShow(false)}
                detailidx={detailIdx}
                details={details}
                price={price}
                payment={payment}
            />
        </>
    )
}

export default LedgerDetailTables