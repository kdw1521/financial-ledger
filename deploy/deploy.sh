#!/bin/sh

rsync -avzr $1 $2 -e "ssh -o StrictHostKeyChecking=no"