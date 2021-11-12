package router

import (
	// "net/http"
	// "fmt"

	"github.com/labstack/echo/middleware"
	"github.com/labstack/echo"

	"github.com/kdw1521/financial-ledger/service"
	"github.com/kdw1521/financial-ledger/common/jwt"
)


func Router(e *echo.Echo) {

	// no required header api
	e.POST("/login", func(c echo.Context) error {
		return service.Login(c)
	})


	// Configure middleware with the custom claims type
	config := middleware.JWTConfig{
		Claims:     &jwt.JwtCustomClaims{},
		SigningKey: []byte("secret"),
	}

	// required header api
	r := e.Group("/wando")

	r.Use(middleware.JWTWithConfig(config))

	r.GET("/home", func(c echo.Context) error {
		return service.GetFinancialLedgerDatasByUser(c)
	})

	r.POST("/ledger", func(c echo.Context) error {
		return service.PostLedgerDate(c) 
	})

	r.DELETE("/ledger", func(c echo.Context) error {
		return service.DeleteLedgerDate(c) 
	})

	r.GET("/ledger/detail", func(c echo.Context) error {
		return service.GetLedgerDetail(c)	
	})

	r.PUT("/ledger/detail", func(c echo.Context) error {
		return service.UpdateLedgerDetail(c)
	})

	r.POST("/ledger/detail", func(c echo.Context) error {
		return service.SaveLedgerDetail(c)	
	})

	r.DELETE("/ledger/detail", func(c echo.Context) error {
		return service.DeleteLedgerDetail(c)
	})


}