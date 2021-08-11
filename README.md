To run the project:
    - create your mysql db and .env file(by copying the env-example and changing values);
    
    run: node ace serve --watch

To create a db migration:

    node ace make:migration users

To create the table in the db from the migration
    
    node ace migration:run
    
   * IF you get the error: Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
        - connect to MySQL Workbench, to your db as root.
        - go to Users and Privileges and select adonisUser:
            - if it has authentication type set to other than Standard, select it to standard
            - if the selection doesn't work, delete the user and create it again with the same user name and password and select the authentication type to standard
            - grant the new user all of the privileges you want from the other tabs

On windows:
For setting up your mysql
1. install docker
2. run this command in the terminal 
    
       docker run --name adonisgram-mysql -e MYSQL_ROOT_PASSWORD=rootPassword -e MYSQL_USER=adonisUser -e MYSQL_PASSWORD=adonis123 -e MYSQL_DATABASE=adonisdb -v D:/Projects/Database:/var/lib/mysql -p 3306:3306 -d mysql:latest
    
   2.1. It will:
   * create a docker container: adonisgram-mysql
   * create a root user: root
   * create a root password for your mysql instalation: rootPassword
   * create a database: adonisdb
   * create a user for the db: adonisUser
   * create a password for the db: adonis123
   * create a volume where to store the db: D:/Projects/Database
   * map the volume on your machine to the docker container's mysql: /var/lib/mysql
   * map mysql to the port 3306 on your machine and in docker
   * install the latest mysql mysql:latest

3. add these values in .env file


For the mailer, in this example we use the smtp configuration:
   1. The data is from: https://mailtrap.io/ (make a free account)
   1. For SMTP settings/Integrations, use Nodemailer
   1. The sent emails from the platform to whatever email you want will be received in the mailtrap inbox (https://mailtrap.io/inboxes/)
