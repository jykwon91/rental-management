#!/bin/bash

echo What should the version be?
read VERSION
echo $VERSION

docker build -t jykwon91/rentalmgmt:$VERSION .
docker push jykwon91/rentalmgmt:$VERSION
ssh root@104.248.228.17 "docker pull jykwon91/rentalmgmt:$VERSION && docker tag jykwon91/rentalmgmt:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"