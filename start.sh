#!/bin/bash

DATE=$(date +%Y%m%d)
LOG="wimm_$DATE.log"

[ -d 'log' ] || mkdir 'log'


/usr/bin/node ./main.js >> log/$LOG 2>&1 &
