package service

const (
	financialLedgerTable = "t_financial_ledger"
)
	

type financialLedgerDataByUser struct {
	FinancialLedgerIdx uint64 `json:"financialLedgerIdx"`
	FinancialLedgerDate string `json:"financialLedgerDate"`	
}

type financialLedgerData struct {
	FinancialLedgerIdx uint64 `json:"financialLedgerIdx"`
	FinancialLedgerDate string `json:"financialLedgerDate"`
	FinancialLedgerDetailIdx uint64 `json:"financialLedgerDetailIdx"`	
	Price uint64 `json:"price"`
	LedgerType string `json:"ledgerType"`	
}

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