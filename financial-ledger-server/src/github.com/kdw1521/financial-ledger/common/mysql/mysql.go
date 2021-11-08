package mysql

import (
	"os"
	"encoding/json"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

type MysqlConfig struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Host string `json:"host"`
	Port string `json:"port"`
	Database string `json:"database"`
}

func ConMysql() *gorm.DB {
	var config MysqlConfig

	file, _ := os.Open("config.json")
	defer file.Close()

	decoder := json.NewDecoder(file)
	decoder.Decode(&config)

	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", 
		config.Username, config.Password, config.Host, config.Port, config.Database,
	)


	db, err := gorm.Open("mysql", dsn)
	
	if err != nil {
		fmt.Println("mariadb connect err >>",err)
	}

	db.DB().SetMaxIdleConns(10)
    db.DB().SetMaxOpenConns(100)
	
	return db
}