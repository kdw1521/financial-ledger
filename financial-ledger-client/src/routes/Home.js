import { useEffect, useState } from "react";
import {ledger} from 'shared/action/ledger'
import LedgerCard from 'components/layouts/LedgerCard'
import {Container, Row} from 'react-bootstrap'

function Home() {
    const [ledgerData, setLedgerData] = useState([])
    const [ledgerDate, setLedgerDate] = useState([])

    useEffect(() => {
        ledger().then((res)=>{
            setLedgerData(res.data);
        });
    }, []);

    useEffect( () => {
        const preLederDate = ledgerData.map((val) => {
            return val.financialLedgerDate.substring(0,7)
        })
        setLedgerDate(preLederDate.filter((val, idx) => {
            return preLederDate.indexOf(val) === idx
        }))
    }, [ledgerData])

    const ledgerCard = ledgerDate.map( (v, i) => {
        return (
            <Row key={i}>
                <h3>{v}</h3>
                <hr/>
                {ledgerData.map( (val, idx) => {
                    return (
                        val.financialLedgerDate.includes(v) && <LedgerCard datas={val} key={idx} />
                    )
                })}
            </Row>
        )
    })
    
    return (
        <>
            <h1>달력 놓고 추가 하는것 추가 예정</h1>
            <Container>
                {ledgerCard}
            </Container>
        </>
    )
}

export default Home