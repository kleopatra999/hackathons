#!/bin/sh

export ID_DOMAIN=$1
export USER_ID=$2
export USER_PASSWORD=$3
export APP_NAME=$4
export ARCHIVE_FILE=$5
export ARCHIVE_LOCAL=target/$ARCHIVE_FILE
export APAAS_HOST=apaas.us.oraclecloud.com

# CREATE CONTAINER
printf '\n[info] Creating container\n'
curl -i -X PUT -u ${USER_ID}:${USER_PASSWORD} https://${ID_DOMAIN}.storage.oraclecloud.com/v1/Storage-$ID_DOMAIN/$APP_NAME

# PUT ARCHIVE IN STORAGE CONTAINER
printf '\n[info] Uploading application to storage\n'
curl -i -X PUT -u ${USER_ID}:${USER_PASSWORD} https://${ID_DOMAIN}.storage.oraclecloud.com/v1/Storage-$ID_DOMAIN/$APP_NAME/$ARCHIVE_FILE -T $ARCHIVE_LOCAL

# See if application exists
let httpCode=`curl -i -X GET -u ${USER_ID}:${USER_PASSWORD} -H "X-ID-TENANT-NAME:${ID_DOMAIN}" -H "Content-Type: multipart/form-data" -sL -w "%{http_code}" https://${APAAS_HOST}/paas/service/apaas/api/v1.1/apps/${ID_DOMAIN}/${APP_NAME} -o /dev/null`

# If application exists...
if [ $httpCode == 200 ]
then
  # Update application
  printf '\n[info] Updating application...\n'
  curl -i -X PUT -u ${USER_ID}:${USER_PASSWORD} -H "X-ID-TENANT-NAME:${ID_DOMAIN}" -H "Content-Type: multipart/form-data" -F archiveURL=${APP_NAME}/${ARCHIVE_FILE} https://${APAAS_HOST}/paas/service/apaas/api/v1.1/apps/${ID_DOMAIN}/${APP_NAME}
else
  # Create application and deploy
  printf '\n[info] Creating application...\n'
  curl -i -X POST -u ${USER_ID}:${USER_PASSWORD} -H "X-ID-TENANT-NAME:${ID_DOMAIN}" -H "Content-Type: multipart/form-data" -F "name=${APP_NAME}" -F "runtime=node" -F "subscription=Hourly" -F archiveURL=${APP_NAME}/${ARCHIVE_FILE} https://${APAAS_HOST}/paas/service/apaas/api/v1.1/apps/${ID_DOMAIN}
fi
printf '\n[info] Deployment complete\n'
