#!/bin/sh
STACK_NAME=STACK_NAME
BUCKET_NAME=BUCKET_NAME

rm -rf node_modules
npm install --production
npm run build
sam build
npm install
sam deploy --template .aws-sam/build/template.yaml --stack-name $STACK_NAME --s3-bucket $BUCKET_NAME --capabilities CAPABILITY_IAM
