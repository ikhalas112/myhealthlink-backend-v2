### Docker Command

> docker build -t mhl-parse-server .

> docker run -p 27017:27017 -v "$(pwd)":/data --name mhl-mongo -d mongo

> docker run -d -p 1337:1337 --name mhl-parse --link mhl-mongo:mongo mhl-parse-server

---

docker network create mhl-network

docker build . -t mhl-mongodb-image:1.0.0
docker run -d --name demo-mhl-mongodb --network mhl-network mhl-mongodb-image:1.0.0

docker network connect mhl-network mhl-mongodb

docker build . -t mhl-parse-image:1.0.0

docker run \
--name demo-mhl-parse \
--network mhl-network \
-d \
-p 1337:1337 \
-e DATABASE_USER=root \
-e DATABASE_PASSWORD=QtoLtI5x9hql7PZ \
-e DATABASE_HOST=demo-mhl-mongodb \
-e DATABASE_USER=root \
-e APP_ID=root \
-e MASTER_KEY=root \
mhl-parse-image:1.0.0

docker build . -t mhl-dashboard-image:1.0.0
Docker run -d --name mhl-dashboard -p 80:80 --network mhl-network mhl-dashboard-image:1.0.0
