#!/bin/bash

echo -n Cleaning old binaries...
rm -rf ./build
echo -e "\tOK"

echo -n Transpiling files...
npx tsc
cd ./build
mkdir ../build_src
mv -v ./* ../build_src > /dev/null
mkdir ./src
mv -v ../build_src/* ./src > /dev/null
rm -rf ../build_src

cp ../package.json ./package.json
mkdir ./src/shared/graphql
cp ../src/shared/graphql/schema.graphql ./src/shared/graphql/schema.graphql
echo -e "\t\tOK"

echo -n Installing dependencies...
npm i --production &>/dev/null
echo -e "\tOK"

echo Source transpiled and installed successfully

cd ..