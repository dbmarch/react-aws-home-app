#export NODE_VERSION=`node -e "console.log(require('./package.json').engines.node);"`
#export APP_NAME = `node -e "console.log (require('./package.json').name)";`
export AWS_DEFAULT_REGION=us-east-2
export AWS_REGION=us-east-2

node -v
npm -v 

if [ -f package-lock.json ]; then 
  echo 'getting packages based on package-lock.json'
  npm ci || exit 1
else 
  echo 'getting packages based on package.json'
  npm i || exit 1
fi

npm run build
npm prune --production

pwd
ls *

echo 'Saving build in S3'



