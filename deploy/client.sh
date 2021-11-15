#!/bin/sh

cd ../financial-ledger-client
yarn build
../deploy/deploy.sh build/ $Wando/www