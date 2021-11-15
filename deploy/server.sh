#!/bin/sh

cd ../financial-ledger-server/src/github.com/kdw1521/financial-ledger
GOOS=linux GOARCH=amd64 go install
cd ../../../..
../deploy/deploy.sh ./bin/linux_amd64/financial-ledger $Wando/server