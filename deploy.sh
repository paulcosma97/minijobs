#!/bin/bash

cd /root/minijobs

if [ "$1" != "--phase-2" ]; then
    git pull
    bash ./deploy.sh --phase-2
    exit 0
fi

export MJ_PROD=true
export MJ_PORT=443

# Build client
cd ./client
npm install
npm run build

# Restart docker
cd ../docker
docker-compose down
docker-compose up -d

# Build & run server
cd ../server
npm i
npx prockill -p 443 -k
npx wait-port 50500 # waits for db

nohup npm start > "../logs/server-$(date "+%Y-%m-%dT%H:%M:%S").log"
npx wait-port -t 30000 443
exit 0