Echo Post Service
call pm2 start --name posts posts/index.js --time
Echo Comments Service
call pm2 start --name comments comments/index.js --time
Echo Moderation Service
call pm2 start --name moderation moderation/index.js --time
Echo Event Bus
call pm2 start --name event-bus event-bus/index.js --time
Echo Query
call pm2 start --name query query/index.js --time
Echo Auth
call pm2 start --name auth auth/src/index.js --time
Echo ------