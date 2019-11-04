# @rikas/axios-rails-middleware

![npm (scoped)](https://img.shields.io/npm/v/@rikas/axios-rails-middleware)
[![install size](https://packagephobia.now.sh/badge?p=@rikas/axios-rails-middleware)](https://packagephobia.now.sh/result?p=@rikas/axios-rails-middleware)

Small package to convert the JSON objects from Rails (snake_case) to JavaScript (lowCamelCase).

## Install

```
npm install @rikas/axios-rails-middleware
```

or

```
yarn add @rikas/axios-rails-middleware
```

## Usage

```javascript
import { registerService } from '@rikas/axios-rails-middleware';
registerService();
```
