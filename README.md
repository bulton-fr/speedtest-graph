# speedtest-graph
For generate graph from speedtest results.

# Started
## Required 
Install https://github.com/sivel/speedtest-cli

## Add a cron task
Copy crontask.sh in /etc/cron.hourly/ and rename file to speedtest

Add execution right to file : chmod +x /etc/cron.hourly/speedtest

Reload crontab : /etc/init.d/cron reload

## Run
Configurate your apache/nginx server and run index.php on your browser :)

![Screenshot](http://autres.bulton.fr/github/speedtest-graph.jpg)