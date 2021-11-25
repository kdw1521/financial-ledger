package service

import (
	"time"
)

const (
	financialLedgerTable = "t_financial_ledger"
	financialLedgerDetailTable = "t_financial_ledger_detail"
)
	

type financialLedgerDataByUser struct {
	FinancialLedgerIdx uint64 `json:"financialLedgerIdx"`
	FinancialLedgerDate string `json:"financialLedgerDate"`	
}

// type financialLedgerData struct {
// 	FinancialLedgerIdx uint64 `json:"financialLedgerIdx"`
// 	FinancialLedgerDate string `json:"financialLedgerDate"`
// 	FinancialLedgerDetailIdx uint64 `json:"financialLedgerDetailIdx"`	
// 	Price uint64 `json:"price"`
// 	LedgerType string `json:"ledgerType"`	
// }

type financialLedgerDate struct {
	FinancialLedgerIdx uint64 `json:"financialLedgerIdx"`
}

type insertFinancialLedgerData struct {
	FinancialLedgerDate string `json:"financialLedgerDate"`
	UserIdx interface{} `json:"userIdx"`
}

type deleteFinancialLedgerData struct {
	FinancialLedgerIdx interface{} `json:"financialLedgerIdx"`
}

// type results struct {
// 	Plus []financialLedgerData `json:"plus"`
// 	Minus []financialLedgerData `json:"minus"`
// }

type allFinancialLedgerDetailResults struct {
	Plus []getFinancialLedgerDetailData `json:"plus"`
	Minus []getFinancialLedgerDetailData `json:"minus"`
}

type getFinancialLedgerDetailData struct {
	FinancialLedgerDetailIdx uint64 `json:"financialLedgerDetailIdx"`
	Payment string `json:"payment"`
	Purpose string `json:"purpose"`
	Price uint64 `json:"price"`
	Details string `json:"details"`
	LedgerType string `json:"ledgerType"`
}

type updateFinancialLedgerDetailData struct {
	Payment interface{} `json:"payment"`
	Purpose interface{} `json:"purpose"`
	Price interface{} `json:"price"`
	Details interface{} `json:"details"`
	UpdateDt time.Time `json:"updateDt"`
}

type saveFinancialLedgerDetailData struct {
	FinancialLedgerIdx interface{} `json:"financialLedgerIdx"`
	Purpose interface{} `json:"purpose"`
	Payment interface{} `json:"payment"`
	Price interface{} `json:"price"`
	Details interface{} `json:"details"`
	LedgerType interface{} `json:"ledgerType"`
}

type deleteFinancialLedgerDetailData struct {
	FinancialLedgerDetailIdx interface{} `json:"financialLedgerDetailIdx"`
}