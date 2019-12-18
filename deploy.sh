#!/bin/bash

cd /root/minijobs

if [ "$1" != "--phase-2" ]; then
    git checkout -- deploy.sh
    git pull
    bash ./deploy.sh --phase-2
    exit $?
fi

export MJ_PROD=true
export MJ_PORT=443

# Build client
cd ./client
npm install

if [ $? -eq 1 ]; then
    echo "Could not install client dependencies."
    exit 1
fi

npm run build

if [ $? -eq 1 ]; then
    echo "Could not build client."
    exit 1
fi

# Restart docker
cd ../docker
docker-compose down
docker-compose up -d

# Build & run server
cd ../server
npm i

if [ $? -eq 1 ]; then
    echo "Could not install server dependencies."
    exit 1
fi

npx wait-port 50500 # waits for db

if [ $? -eq 1 ]; then
    echo "Timeout: Database not available."
    exit 1
fi

kill -9 `sudo lsof -t -i:443`

nohup npm run start:prod > "../../logs/server-$(date "+%Y-%m-%dT%H:%M:%S").log" &
npx wait-port -t 30000 443

if [ $? -eq 1 ]; then
    echo "Timeout: Server not available."
    exit 1
fi

exit 0