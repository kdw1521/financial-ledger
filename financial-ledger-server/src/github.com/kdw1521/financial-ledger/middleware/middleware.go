package middleware

import (
	"net/http"
	"time"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func Middleware(e *echo.Echo) {
	e.Pre(middleware.Logger())
	e.Pre(middleware.Recover())
	e.Pre(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", "https://wando.ga"},
		AllowMethods: []string{
			http.MethodGet, 
			http.MethodPost, 
			http.MethodPut, 
			http.MethodDelete, 
			http.MethodOptions,
			http.MethodHead},
		AllowHeaders: []string{"*"},
		AllowCredentials: true,
	}))
	
}

func HeaderSet(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
	   c.Response().Header().Set("Expires", "0")
	   c.Response().Header().Set(echo.HeaderLastModified, time.Now().Format("Mon, 02 Nov 2021 09:56:15 GMT"))
	   c.Response().Header().Set("Cache-Control", "no-store, no-cache, must-revalidate")
	   c.Response().Header().Set("Cache-Control", "pre-check=0, post-check=0, max-age=0")
	   c.Response().Header().Set("Pragma", "no-cache")
	   c.Response().Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, accept, authorization")
	   c.Response().Header().Set("Access-Control-Allow-Origin", "https://wando.ga")
	   c.Response().Header().Set("Access-Control-Max-Age", "3600")
	   c.Response().Header().Set("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS")
	   c.Response().Header().Set("Access-Control-Allow-Credentials", "true")
	   c.Response().Header().Set(echo.HeaderContentType, "application/json; charset=utf-8")
 
	   return next(c)
	}
 }