package main

import (
	"github.com/labstack/echo"
	"github.com/kdw1521/financial-ledger/middleware"
	"github.com/kdw1521/financial-ledger/router"
)

func main() {

	debug := false 

	e := echo.New()
	middleware.Middleware(e)
	router.Router(e)
	e.Use(middleware.HeaderSet)

	if debug {
		e.Logger.Fatal(e.Start(":1323"))
	} else {
		e.Logger.Fatal(e.StartTLS(":1323", "cert.pem", "privkey.pem"))
	}
}