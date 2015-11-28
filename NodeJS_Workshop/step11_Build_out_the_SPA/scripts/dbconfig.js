var connectionStr = process.env.DBAAS_DEFAULT_CONNECT_DESCRIPTOR;
var username = process.env.DBAAS_USER_NAME;
var password = process.env.DBAAS_USER_PASSWORD;

module.exports= {
  user:username,
  password:password,
  connectString : connectionStr
};
