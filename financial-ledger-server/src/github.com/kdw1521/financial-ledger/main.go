package main

import (
	"github.com/labstack/echo"
	"github.com/kdw1521/financial-ledger/middleware"
	"github.com/kdw1521/financial-ledger/router"
)

func main() {
	e := echo.New()
	middleware.Middleware(e)
	router.Router(e)

	e.Logger.Fatal(e.Start(":1323"))
}