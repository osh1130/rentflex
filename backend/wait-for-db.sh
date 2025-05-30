#!/bin/sh
# wait-for-db.sh

set -e

host="$DB_HOST"
port="$DB_PORT"
user="$DB_USER"
password="$DB_PASSWORD"

echo "等待MySQL数据库就绪..."
until mysqladmin ping -h"$host" -P"$port" -u"$user" -p"$password" --silent; do
  echo "MySQL尚未就绪 - 等待..."
  sleep 2
done

echo "MySQL数据库已准备就绪！"
echo "执行命令: $@"
exec "$@" 