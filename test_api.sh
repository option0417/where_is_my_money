#!/bin/bash

HEADER="-H Content-Type:application/json"
BODY_PUT="-d {\"payment_id\":\"byw-1528961921712\",\"payment_description\":\"just for test update\"}"

function sendPut() {
  echo $HEADER
  echo $BODY_PUT
  curl -1kv -X PUT $HEADER "$BODY_PUT" http://127.0.0.1:3000/record
}

sendPut;
