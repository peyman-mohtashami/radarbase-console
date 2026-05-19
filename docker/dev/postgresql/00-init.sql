-- Management Portal database
CREATE USER managementportal WITH PASSWORD 'mp_dev_password';
CREATE DATABASE managementportal OWNER managementportal;

-- App Config database
CREATE USER appconfig WITH PASSWORD 'appconfig_dev_password';
CREATE DATABASE appconfig OWNER appconfig;
