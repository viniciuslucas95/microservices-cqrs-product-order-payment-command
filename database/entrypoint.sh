#!/bin/bash
export PGPASSWORD='admin'
psql -U 'admin' <<- EOSQL
    CREATE DATABASE dev;
EOSQL
psql -U 'admin' -d 'dev' <<- EOSQL
	CREATE TABLE "product_order_payments" (
        id UUID PRIMARY KEY,
        order_id UUID NOT NULL,
        status VARCHAR(9) NOT NULL
    );
EOSQL
