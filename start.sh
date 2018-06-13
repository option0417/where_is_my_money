#!/bin/bash

DATE=$(date +%Y%m%d)
LOG="wimm_$DATE.log"

[ -d 'log' ] || mkdir 'log'


/usr/bin/node ./main.js >> log/$LOG 2>&1 &

sleep 0.3s
PID=$(pgrep -f 'node.*main.js')

if [ -z $PID ]; then
  echo "Start failed, check log."
  exit 1
else 
  echo "Start WIMM[$PID] done."
fi
