#!/bin/bash

# Kill process of WIMM
PID=$(pgrep -f 'node.*main.js')

#sudo kill -9 $PID

[ $PID ] && echo "Kill PID $PID"
