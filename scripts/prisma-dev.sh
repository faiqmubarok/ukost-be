#!/bin/bash

docker exec -it prisma-cli bash -c "
  cd services/$1 && npx prisma $2
"
# bash scripts/prisma-dev.sh user-service migrate dev
# bash scripts/prisma-dev.sh product-service db push
# bash scripts/prisma-dev.sh user-service studio
