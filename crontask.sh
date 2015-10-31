#!/bin/sh

printf %s "[$(date +'%d-%m-%Y %T')] " >> /opt/speedtest/hourly.log
speedtest-cli --simple --server 972 | awk -vRS="" '{gsub("\n"," | ");print $0}' >> /opt/speedtest/hourly.log