package jwt

import (
	"fmt"
	"time"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
)

type JwtCustomClaims struct {
	Idx uint64 `json:"idx"`
	jwt.StandardClaims
}

func getClaims(c echo.Context) *JwtCustomClaims {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*JwtCustomClaims)
	return claims
}

func GetIdx(c echo.Context) interface{} {
	claims := getClaims(c)	
	idx := claims.Idx
	return idx 
}

func GetExp(c echo.Context) interface{} {
	claims := getClaims(c)	
	exp := claims.ExpiresAt
	return exp
}

func CreateJwt(idx uint64) (map[string]string, error) {
	fmt.Println("idx>>", idx)

	if idx == 0 {
		return  make(map[string]string), echo.ErrUnauthorized
	}

	claims := &JwtCustomClaims{
		idx,
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