CREATE ROLE node_role;
GRANT CREATE SESSION, CREATE TABLE, CREATE SEQUENCE, CREATE VIEW, CREATE TRIGGER to node_role;

--CREATE SCHEMA/USER FOR NODE CS
CREATE USER nodejs_demouser IDENTIFIED BY Welcome1# 
DEFAULT TABLESPACE users
QUOTA UNLIMITED ON users;
GRANT node_role TO nodejs_demouser;

--CREATE SCHEMA/USER FOR DEVELOPMENT
CREATE USER nodejs_devuser IDENTIFIED BY Welcome1# 
DEFAULT TABLESPACE users
QUOTA UNLIMITED ON users;
GRANT node_role TO nodejs_devuser;