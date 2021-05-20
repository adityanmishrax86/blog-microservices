# Deployment steps

First, You need to install node v14, npm, and nginx (you can use [Laragon](https://laragon.org/)).

## Installation

Use the package manager npm to install pm2.

```bash
npm install -g pm2
```

## Deploying Microservices with PM2
Go into every microservice folder, and run the following command
```shell
npm install && pm2 start --name <folder-name> src/index.js --time
```
replace <folder-name> with the folder that you are in.

## Nginx
Place the auto.reposts.test file in the C:/Laragon/etc/nginx/sites-enabled (if on windows) or paste the contents of the file in /etc/nginx/default.conf (in case on linux) file with the one provided in the starter pack
Place the dist folder present in the client folder on the root of nginx web server directory.

In the auto.reposts.test (if windows) or nginx.conf (if linux), please verify that the root folder path is same as the path where you copied the dist folder.

## Host file
We will be using a local domain name called posts.text for our application.
Go into your hosts file and add the following entry at the end of the file
```bash
posts.test    127.0.0.1
```

Now go to the browser and enter the URL posts.test 