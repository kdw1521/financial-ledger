package service 

import (
	"fmt"
	"errors"
	"net/http"
	"time"
	"github.com/labstack/echo"
	"github.com/kdw1521/financial-ledger/common/mysql"
	"github.com/kdw1521/financial-ledger/common/jwt"
)

type LoginReq struct {
	Email string `json:"email"`
	Name string `json:"name"`	
}

type User struct {
	Idx uint64 `json:"idx" gorm:"primaryKey"`
	Email string `json:"email"`
	Name string `json:"name"`
	RegDt time.Time `json:"regDt"`
}

const table = "t_user"

var errSocialLogin = errors.New("social login error")

func Login(c echo.Context) error {
	u := new(LoginReq)
	user := User{}
	
	if err := c.Bind(u); err != nil {
		return errSocialLogin
	}

	mysql := mysql.ConMysql()
	mysql.LogMode(true)
	defer mysql.Close()

	mysql.Table(table).Find(&user, "email = ?", u.Email)

	if user.Email == "" {
		if err := mysql.Table(table).Create(&u).Error; err != nil {
			fmt.Println("insert user err >>",err)
		} 
	}

	return c.JSON(http.StatusOK, jwtService(user.Idx))
}

func jwtService(idx uint64) map[string]string {

	token, err := jwt.CreateJwt(idx)

	if err != nil {
		fmt.Println(err)
	}

	return token
}