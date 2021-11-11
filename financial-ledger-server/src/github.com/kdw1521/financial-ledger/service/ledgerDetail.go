package service

import (
	"fmt"
	"net/http"
	"time"

	"github.com/labstack/echo"

	"github.com/kdw1521/financial-ledger/common/mysql"
)



func GetLedgerDetail(c echo.Context) error {
	reqLedgerIdx := c.QueryParam("ledgerIdx")

	mysql := mysql.ConMysql()
	mysql.LogMode(true)
	defer mysql.Close()

	ledgerDetailDatas := []getFinancialLedgerDetailData{}

	plusDatas := []getFinancialLedgerDetailData{}
	minusDatas := []getFinancialLedgerDetailData{}

	mysql.Table(financialLedgerDetailTable).Where(
		"financial_ledger_idx=?", reqLedgerIdx).Order(
			"reg_dt desc").Find(&ledgerDetailDatas)

	for _, v := range ledgerDetailDatas {
		if v.LedgerType == "plus" {
			plusDatas = append(plusDatas, v)
		} else {
			minusDatas = append(minusDatas, v)
		}
	}

	result := &allFinancialLedgerDetailResults {
		Plus: plusDatas,
		Minus : minusDatas,
	}

	return c.JSON(http.StatusOK, result)
}

func UpdateLedgerDetail(c echo.Context) error {
	bodys := make(map[string]interface{})
	c.Bind(&bodys)

	reqPrice := bodys["price"]
	reqDetails := bodys["details"]

	ledgerDetailData := updateFinancialLedgerDetailData{
		Price: reqPrice,
		Details: reqDetails,
		UpdateDt: time.Now(),
	}

	mysql := mysql.ConMysql()
	mysql.LogMode(true)
	defer mysql.Close()

	if err := mysql.Table(financialLedgerDetailTable).Where("financial_ledger_detail_idx=?", bodys["detailIdx"]).Update(&ledgerDetailData).Error; err != nil {
		fmt.Println("financial ledger date insert err >>",err)
	}

	return c.String(http.StatusOK, "success")
}

func SaveLedgerDetail(c echo.Context) error {
	bodys := make(map[string]interface{})
	c.Bind(&bodys)
	fmt.Println(bodys)

	mysql := mysql.ConMysql()
	mysql.LogMode(true)
	defer mysql.Close()

	ledgerDetailData := saveFinancialLedgerDetailData{
		FinancialLedgerIdx: bodys["ledgerIdx"],
		Price: bodys["price"],
		Details: bodys["details"],
		LedgerType: bodys["ledgerType"],
	}

	if err := mysql.Table(financialLedgerDetailTable).Create(&ledgerDetailData).Error; err != nil {
		fmt.Println("financial ledger detail insert err>>", err)
	}

	return c.String(http.StatusOK, "success")
}