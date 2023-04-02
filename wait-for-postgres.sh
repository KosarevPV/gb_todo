#!/bin/sh
# wait-for-postgres.sh

set -e

host="$1"
shift
cmd="$@"

until PGPASSWORD="todo" psql -h "$host" -d "todo" -U "drf" -c '\q'; do sleep 1; done

>&2 echo "Postgres is up - executing command"
exec $cmd
