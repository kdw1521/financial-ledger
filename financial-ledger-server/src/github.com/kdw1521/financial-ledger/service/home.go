package service

import (
	"net/http"
	"github.com/kdw1521/financial-ledger/common/jwt"
	"github.com/kdw1521/financial-ledger/common/mysql"
	"github.com/labstack/echo"
)

// type financialLedgers struct {
// 	FinancialLedgerIdx uint64 `json:"financialLedgerIdx"`
// 	UserIdx uint64 `json:"userIdx"`
// 	FinancialLedgerDate string `json:"financialLedgerDate"`
// 	RegDt time.Time `json:"regDt"`
// 	UpdateDt time.Time `json:"updateDt"`
// }

// type financialLedgerDetails struct {
// 	FinancialLedgerDetailIdx uint64 `json:"financialLedgerDetailIdx"`
// 	FinancialLedgerIdx uint64 `json:"financialLedgerIdx"`
// 	Price uint64 `json:"price"`
// 	LedgerType string `json:"ledgerType"`
// 	RedDt time.Time `json:"regDt"`
// 	UpdateDt time.Time `json:"updateDt"`
// }





func GetAllFinancialLedgerDatas(c echo.Context) error {
	idx := jwt.GetIdx(c)

	mysql := mysql.ConMysql()
	mysql.LogMode(true)
	defer mysql.Close()

	financialLedgerDatas := []financialLedgerData{}
	plusDatas := []financialLedgerData{}
	minusDatas := []financialLedgerData{}

	mysql.Table(financialLedgerTable+" as tfl").Select(`
									tfl.financial_ledger_idx,
									tfl.financial_ledger_date,
									tfld.financial_ledger_detail_idx,
									tfld.price,
									tfld.ledger_type
								`).Joins(
									`left join t_financial_ledger_detail as tfld 
									on tfl.financial_ledger_idx = tfld.financial_ledger_idx
								`).Where("tfl.user_idx=?", idx).Scan(&financialLedgerDatas)
	
	for _, v := range financialLedgerDatas {
		if v.LedgerType == "plus" {
			plusDatas = append(plusDatas, v)
		} else {
			minusDatas = append(minusDatas, v)
		}
	}

	result := &results {
		Plus: plusDatas,
		Minus : minusDatas,
	}

	return c.JSON(http.StatusOK, result)
}

func GetFinancialLedgerDatasByUser(c echo.Context) error {
	idx := jwt.GetIdx(c)

	mysql := mysql.ConMysql()
	mysql.LogMode(true)
	defer mysql.Close()

	financialLedgerDatas := []financialLedgerDataByUser{}

	mysql.Table(financialLedgerTable).Where("user_idx=?", idx).Order("financial_ledger_date desc").Find(&financialLedgerDatas)

	return c.JSON(http.StatusOK, financialLedgerDatas)
}