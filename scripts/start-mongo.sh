#!/bin/bash
# chmod +x ./scripts/start-mongo.sh
set -e

DB_PATH="/opt/homebrew/var/mongodb"

# Cek apakah mongod sudah jalan
if pgrep mongod > /dev/null; then
  echo "MongoDB sudah berjalan."
else
  echo "Menjalankan MongoDB dengan replSet rs0..."
  mongod --dbpath "$DB_PATH" --replSet rs0 --bind_ip localhost --port 27017 &
  sleep 5
fi

# Cek apakah replSet sudah diinisialisasi
REPL_STATUS=$(mongo --quiet --eval "rs.status().ok" || echo "0")

if [ "$REPL_STATUS" != "1" ]; then
  echo "Inisialisasi replSet..."
  mongo --eval "rs.initiate()"
else
  echo "ReplSet sudah aktif."
fi

