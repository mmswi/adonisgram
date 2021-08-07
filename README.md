To run the project:
    create your mysql db and .env file(by copying the env-example and changing values)
    in the terminal: node ace serve --watch

To create a db migration:
    node ace make:migration users
    
On windows:
For setting up your mysql
1. install docker
2. run this command in the terminal 
    docker run --name adonisgram-mysql -e MYSQL_ROOT_PASSWORD=adonis123 -e MYSQL_DATABASE=adonisdb -v D:/Projects/Database:/var/lib/mysql -p 3306:3306 -d mysql:latest
    2.1. It will:
        - create a docker container: adonisgram-mysql
        - create a root user: root
        - create a root password: adonis123
        - create a database: adonisdb
        - create a volume where to store the db: D:/Projects/Database
        - map the volume on your machine to the docker container's mysql: /var/lib/mysql
        - map mysql to the port 3306 on your machine and in docker
        - install the latest mysql mysql:latest

3. add these values in .env file
