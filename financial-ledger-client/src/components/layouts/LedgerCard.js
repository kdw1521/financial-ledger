import {Card} from 'react-bootstrap'

function LedgerCard({datas}) {

    return (
            <div className="col-12 p-1 col-sm-4 p-sm-2 col-md-4 p-md-3 col-lg-2 p-lg-4" >
                <Card border="dark" style={{ width: '9rem' }}>
                    <Card.Header />
                    <Card.Body>
                        <Card.Title>{datas.financialLedgerDate}</Card.Title>
                    </Card.Body>
                </Card>
            </div>
    )
}

export default LedgerCard;