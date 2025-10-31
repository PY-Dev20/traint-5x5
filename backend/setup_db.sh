#!/bin/bash
sudo -u postgres psql <<EOF
CREATE DATABASE traint_db;
CREATE USER traint_user WITH PASSWORD 'N@123our';
ALTER ROLE traint_user SET client_encoding TO 'utf8';
ALTER ROLE traint_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE traint_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE traint_db TO traint_user;
\c traint_db
GRANT USAGE ON SCHEMA public TO traint_user;
GRANT CREATE ON SCHEMA public TO traint_user;
EOF