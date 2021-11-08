package jwt

import (
	"time"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
)

type JwtCustomClaims struct {
	Email string `json:"email"`
	jwt.StandardClaims
}

func GetEmail(c echo.Context) interface{} {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*JwtCustomClaims)
	email := claims.Email
	return email
}

func GetExp(c echo.Context) interface{} {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*JwtCustomClaims)
	exp := claims.ExpiresAt
	return exp
}

func CreateJwt(email string) (map[string]string, error) {

	if email == "" {
		return  make(map[string]string), echo.ErrUnauthorized
	}

	claims := &JwtCustomClaims{
		email,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString([]byte("secret"))
	if err != nil {
		return make(map[string]string), err
	}

	return map[string]string{
		"token" : t,
	}, nil
}