<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="./frontend/src/assets/logo.png" width="200px" />
</h1>

<h3 align="center">
  Final Challenge Gympoint: backend | frontend | mobile
</h3>

# Gym Point

This project has the following features:

Administrator features:

0. Authentication - Administrator should be able to authentication using user: admin@gympoint.com and password: 123456
1. Management Students - Administrator should be able to: list, create, edit(update) and remove.
1. Management Plans - Administrator should be able to: list, create, edit(update) and remove.
1. Management Enrollments - Administrator should be able to: list, create, edit(update) and remove.
1. Management Help Orders - Administrator should be able to: list and edit(update).

Students features:

0. Authentication - Student should be able to authentication using using your enrollment ID.
1. Checkins - User should be able to: list all checkins and create a new checkin.
1. Help Orders - User should be ablet to: list all help orders answered or not and create new help order.

## Backend part

### Backend Instructions

```bash
# install postgreSQL
docker run --name database -e POSTGRES_PASSWORD=desafiorocketseat -p 5432:5432 -d postgres:11

# install redis
docker run --name redis -p 6379:6379 -d -t redis:alpine

# postgree database name
gym

# install packages and dependencies
yarn
```

```bash
# stucture database
yarn sequelize db:migrate

# populate database
yarn sequelize db:seed:all

# start backend application postgree
yarn dev

# start backend application redis
yarn queue
```

## Frontend part

### Frontend Instructions

```bash
# install packages and dependencies
yarn

# start frontend application
yarn start
```

## Mobile part

### Mobile Instructions

### iOS

```bash
# install packages and dependencies
yarn

# start mobile application on IOS emulator
react-native run-ios
```

### Android

```bash
# install packages and dependencies
yarn
```

Change baseURL variable on /src/services/api.js to local IP or local IP emulator

```bash
# start mobile application on IOS emulator
react-native run-android

```
