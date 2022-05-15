# @jrssnjn/express-scaffold

Express-Scaffold is a scaffolding-tool / library for generating express-files.

## Installation

Use [npm](https://www.npmjs.com) to install @jrssnjn/express-scaffold.

```javascript
npm i -g @jrssnjn/express-scaffold
```

## Usage

```javascript

// if installed globally
express-scaffold generate -t template.yml

// if installed locally
./node_modules/@jrssnjn/express-scaffold/app.js generate -t template.yml


// to view help section if installed globally
 
express-scaffold -h
express-scaffold generate -h 

// to view help section if installed locally

./node_modules/@jrssnjn/express-scaffold/app.js -h
./node_modules/@jrssnjn/express-scaffold/app.js generate -h
```

## Template File Format

Express-Scaffold currently only accepts template files in (yml) format, see example below.

```
routes:
  user: ['GET', 'POST', 'DELETE']
  auth: ['GET', 'POST']
app:
  name: 'Sample Express Scaffolding Tool.'
  description: 'Generates express files.'
  author: 'Jairus San Juan'
  version: '1.0.0'
```

## Result

```
current-folder
├─ routes             
│  ├─ auth.js         
│  └─ user.js         
├─ index.js           
├─ package-lock.json  
└─ package.json

```       

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)