git clean -d -x -f
git pull

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

export MJ_PROD=true
export MJ_PORT=443

npm start

