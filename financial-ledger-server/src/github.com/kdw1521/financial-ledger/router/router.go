package router

import (
	"net/http"

	"github.com/labstack/echo/middleware"
	"github.com/labstack/echo"
	"github.com/kdw1521/financial-ledger/service"
	"github.com/kdw1521/financial-ledger/common/jwt"
)

type Login struct {
	Email string `json:"email"`
	Name string `json:"name"`	
}

func Router(e *echo.Echo) {

	// no required header api
	e.POST("/login", func(c echo.Context) error {
		return login.Login(c)
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
		return c.JSON(http.StatusOK, map[string]string{
			"test" : "teststest",
		})
	})


}