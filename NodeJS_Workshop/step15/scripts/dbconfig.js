var connectionStr = process.env.DBAAS_DEFAULT_CONNECT_DESCRIPTOR || "129.152.151.225:1521/PDB1.jcsdemo248.oraclecloud.internal";
var username = process.env.DBAAS_USER_NAME || "system";
var password = process.env.DBAAS_USER_PASSWORD || "Welcome1#";

module.exports= {
  user:username,
  password:password,
  connectString : connectionStr
};
