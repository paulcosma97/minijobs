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
npx wait-port 50500 # waits for db

export MJ_PROD=true

npm start

