import {Table} from "react-bootstrap"
import {useState} from "react"

import LedgerDetailModal from "components/ledger/LedgerDetailModal";

function LedgerDetailTables({datas}) {

    const [modalShow, setModalShow] = useState(false)
    const [detailIdx, setDetailIdx] = useState(0)
    const [details, setDetails] = useState('')
    const [price, setPrice] = useState(0)

    const onClick = (ledgerDetailIdx, details, price) => {
        setDetails(details)
        setDetailIdx(ledgerDetailIdx)
        setPrice(price)
        setModalShow(true)
    }

    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>price</th>
                        <th>details</th>
                    </tr>
                </thead>
                <tbody>
                    {datas?.map( (val, idx) => {
                        return (
                            <tr 
                                key={val.financialLedgerDetailIdx} 
                                onClick={() => onClick(val.financialLedgerDetailIdx, val.details, val.price)} 
                                className="mouse-pointer"
                            >
                                <td>{val.price}</td>
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
            />
        </>
    )
}

export default LedgerDetailTables