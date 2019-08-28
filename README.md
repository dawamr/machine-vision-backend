# Readme

*** Machine Vision (Backend) ***
*** Require ***
* body-parser
* express
* morgan
* pg
* pg-hstore
* sequelize
* sequelize-cli

# API-SERVER #

API Server Using NodeJs, ExpressJs, Sequelize and PostgreSQL DB

## Directory structure
Your project directory structure should look like this
```
  + project_path/
  |
  |
  +--+ bin/
  |  |
  |  +-- www
  |
  |
  |--+ node_modules/
  |  |
  |  +-- sequelize
  |  |
  |  |__ pg
  |  |
  |  |__ ... all dependency_library required
  |
  |
  +--+ public
  |  |
  |  +-- images 
  |
  |
  +--+ src/
     |
     +-- config
     |
     +-- controllers
     |
     +-- models
     |
     +-- migrations
     |
     +-- ...

```

## Setup and Build

The following command :
```
  git clone <url>
  cd <directroy_clone>
```

## Configurable service json
  ```
  Open configuration_files -> src/config/config.json
  And change service destination url
  ```

## Running Application
  ```
  cd to directory-project
  sequelize db:migrate
  sequelize db:seed:all
  npm run start

  Application port can look at file -> bin/www
  Default user to login :
  - username : implementor
  - password : 123456
  ```
