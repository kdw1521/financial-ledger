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
	UserKey interface{} `json:"userKey"`
	Name string `json:"name"`	
}

type User struct {
	Idx uint64 `json:"idx" gorm:"primaryKey"`
	UserKey string `json:"userKey"`
	Name string `json:"name"`
	RegDt time.Time `json:"regDt"`
}

const table = "t_user"

var errSocialLogin = errors.New("social login error")

func Login(c echo.Context) error {
	u := new(LoginReq)
	user := User{}

	if err := c.Bind(u); err != nil {
		fmt.Println(err)
		return errSocialLogin
	}

	mysql := mysql.ConMysql()
	mysql.LogMode(true)
	defer mysql.Close()

	mysql.Table(table).Find(&user, "user_key = ?", u.UserKey)

	if user.UserKey == "" {
		if err := mysql.Table(table).Create(&u).Error; err != nil {
			fmt.Println("insert user err >>",err)
		} 
		mysql.Table(table).Find(&user, "user_key = ?", u.UserKey)
	}

	token := jwtService(user.Idx)

	return c.JSON(http.StatusOK, token)
}

func jwtService(idx uint64) map[string]string {

	token, err := jwt.CreateJwt(idx)

	if err != nil {
		fmt.Println("create token err >>",err)
	}

	return token
}