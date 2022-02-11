#!/bin/bash
echo "creating tables"
psql < ./db/schema.sql
echo "seeding data"
psql < ./db/seed.sql
