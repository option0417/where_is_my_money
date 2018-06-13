#!/bin/bash

#NODE_ROOT=/usr/bin
NODE_ROOT=/home/vagrant/node-v8.11.1/bin


DATE=$(date +%Y%m%d)
LOG="wimm_$DATE.log"

[ -d 'log' ] || mkdir 'log'


$NODE_ROOT/node ./main.js >> log/$LOG 2>&1 &

sleep 0.3s
PID=$(pgrep -f 'node.*main.js')

if [ -z $PID ]; then
  echo "Start failed, check log."
  exit 1
else 
  echo "Start WIMM[$PID] done."
fi
