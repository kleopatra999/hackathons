#!/bin/sh
echo "Creating Environment Variables: execute as $source environmentVariables.sh"
export PORT=8090
echo "PORT set as " $PORT

export DBAAS_DEFAULT_CONNECT_DESCRIPTOR="<IP GOES HERE>:1521/<REST OF YOUR PLUGGABLE DB CONNECITON STRING>"
echo "DBAAS_DEFAULT_CONNECT_DESCRIPTOR set as " $DBAAS_DEFAULT_CONNECT_DESCRIPTOR

export DBAAS_USER_NAME="devuser"
echo "DBAAS_USER_NAME set as " $DBAAS_USER_NAME

export DBAAS_USER_PASSWORD="Welcome1#"
echo "DBAAS_USER_PASSWORD set as " $DBAAS_USER_PASSWORD
