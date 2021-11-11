package service

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo"

	"github.com/kdw1521/financial-ledger/common/jwt"
	"github.com/kdw1521/financial-ledger/common/mysql"
)


func PostLedgerDate(c echo.Context) error {

	idx := jwt.GetIdx(c)

	bodys := make(map[string]string)
	c.Bind(&bodys)

	reqLedgerDate := bodys["ledgerDate"]

	mysql := mysql.ConMysql()
	mysql.LogMode(true)
	defer mysql.Close()

	financialLedgerIdx := financialLedgerDate{}

	mysql.Table(financialLedgerTable).Where(
		map[string]interface{}{"user_idx": idx, "financial_ledger_date": reqLedgerDate}).Find(&financialLedgerIdx)

	if financialLedgerIdx.FinancialLedgerIdx != 0 {
		return c.String(http.StatusOK, "해당 날짜는 이미 존재합니다.")
	}

	ledgerData := insertFinancialLedgerData{
		FinancialLedgerDate: reqLedgerDate,
		UserIdx: idx,
	}

	if err := mysql.Table(financialLedgerTable).Create(&ledgerData).Error; err != nil {
		fmt.Println("financial ledger date insert err >>",err)
	}

	return c.String(http.StatusOK, reqLedgerDate)
}


func DeleteLedgerDate(c echo.Context) error {

	reqLedgerIdx := c.QueryParam("ledgerIdx")

	mysql := mysql.ConMysql()
	mysql.LogMode(true)
	defer mysql.Close()

	ledgerData := deleteFinancialLedgerData {
		FinancialLedgerIdx : reqLedgerIdx,
	}

	if err := mysql.Table(financialLedgerTable).Where("financial_ledger_idx=?", reqLedgerIdx).Delete(&ledgerData).Error; err != nil {
		fmt.Println("financial ledger idx delete err >>", err)
	}

	return c.String(http.StatusOK, "success")
}