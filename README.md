# livefit-api
![GitHub Repo stars](https://img.shields.io/badge/status-development-yellowgreen)
![GitHub Repo stars](https://img.shields.io/badge/node-%3E%3D16.0.0-green")
![GitHub Repo stars](https://img.shields.io/github/issues/mayconreis/livefit-api)
![GitHub Repo stars](https://img.shields.io/github/stars/mayconreis/livefit-api)

## Descrição do projeto

API developed in Typescript using Express and Sequelize.
Livefit is a system that connects patients to nutritionists and helps them lead a healthier life.

## Running the project

### install dependencies

```
yarn
```


### OPTION 1 - build and run project for production
```
yarn start
```

### OPTION 2 - run project in development
```
yarn dev
```

## Observation
This project uses Sequelize migrations to create database tables, this is done automatically in production.
In development run the commands below:
```
yarn db:create
yarn db:migrate
yarn db:seed
```

## Autores
| [<img src="https://avatars.githubusercontent.com/u/40437688?s=400&u=6d20aff99a529254986c9ed3d649b0655d8ad607&v=4" width=115><br><sub>Maycon Reis de Jesus</sub>](https://github.com/mayconreis) |
| :---: |