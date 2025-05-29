#!/bin/bash
set -e

host="${DB_HOST:-mysql}"
port="${DB_PORT:-3306}"
user="${DB_USER}"
password="${DB_PASSWORD}"

>&2 echo "Waiting for MySQL at $host:$port..."

# 使用Python检查MySQL连接
until python -c "
import sys
import time
import mysql.connector
try:
    conn = mysql.connector.connect(
        host='$host',
        port=$port,
        user='$user',
        password='$password',
        connection_timeout=5
    )
    conn.close()
    sys.exit(0)
except Exception as e:
    print(f'MySQL is unavailable - {str(e)}', file=sys.stderr)
    sys.exit(1)
" > /dev/null 2>&1; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 2
done

>&2 echo "MySQL is up - executing command"
exec "$@" 