import { useEffect, useState } from "react";
import {Container, Row, Button, Badge} from 'react-bootstrap'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown, faAngleDoubleUp, faGrinSquint } from "@fortawesome/free-solid-svg-icons";
import {ko} from "date-fns/esm/locale"

import {ledger} from 'shared/action/ledger'
import {toStringByFormatting} from "shared/util/dateFormat"
import LedgerCard from 'components/ledger/LedgerCard'
import NotExistLedgerCard from "components/ledger/NotExistLedgerCard";
import LedgerModal from "components/ledger/LedgerModal";


function Home() {
    const [ledgerData, setLedgerData] = useState([])
    const [ledgerDate, setLedgerDate] = useState([])
    const [selectLedgerDate, setSelectLedgerDate] = useState(new Date())
    const [checkLedgerDates, setCheckLedgerDates] = useState({})
    const [angleState, setAngleState] = useState({})


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

    useEffect( () => {
        setCheckLedgerDates(ledgerData.filter( (v) => {
            return v.financialLedgerDate === toStringByFormatting(selectLedgerDate)
        }))
    }, [selectLedgerDate, ledgerData])

    useEffect( () => {
        const buttonDataObj ={}
        ledgerDate.forEach( v => {
            buttonDataObj[v] = false
        })
        setAngleState(buttonDataObj)
    }, [ledgerDate])


    const onAngleDown = (e) => {
        const {
            currentTarget: {value},
        } = e;

       if(!angleState[value]) {
           setAngleState({...angleState, [value]: true})
       } else {
           setAngleState({...angleState, [value]: false})
       }
    }
    


    const ledgerCard = ledgerDate.map( (v, i) => {
        return (
            <Row key={i} className="mt-5 ml-1">
                <Button onClick={onAngleDown} value={v} variant="outline-dark" style={{maxWidth:"11rem"}} >
                        <span>{v} </span>
                            {
                                angleState[v] ? <FontAwesomeIcon icon={faAngleDoubleUp} /> : <FontAwesomeIcon icon={faAngleDoubleDown} />
                            }
                </Button>
                <div className="padding-0">
                    <hr style={{maxWidth: "11rem"}} />
                </div>
                {angleState[v] && ledgerData.map( (val, idx) => {
                    return (
                        val.financialLedgerDate.includes(v) && <LedgerCard datas={val} key={idx} />
                    )
                })}
            </Row>
        )
    })
    

    return (
        <>
            <Container>
                <div className="mt-5 ml-1">
                    <Badge pill bg="dark" className="mb-2">
                        add financial ledger date<FontAwesomeIcon icon={faGrinSquint} className="ml-04" />
                    </Badge>
                    <div style={{display:"flex", maxWidth: "16rem"}}>
                        <DatePicker 
                            placeholderText="날짜를 선택해주세요"
                            selected={selectLedgerDate}
                            onChange={date => setSelectLedgerDate(date)}
                            locale={ko}
                            dateFormat="yyyy-MM-dd"
                            required
                        />
                        <LedgerModal 
                            checkLedgerDate={checkLedgerDates}
                            selectLedgerDate={selectLedgerDate}
                        />
                    </div>
                </div>
                <hr/>
                {ledgerData.length 
                    ? ledgerCard
                    : <NotExistLedgerCard />
                }
                
            </Container>
        </>
    )
}

export default Home