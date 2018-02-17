# Simple Storage
a lightweight library for projects that allow you to work with local and session storage.

## Installation
```sh
npm install simple-storage --save
yarn add simple-storage
bower install simple-storage --save
```

## Usage

first, you must import it.
### Javascript

```javascript
var Storage = require('simple-storage');
```

### TypeScript
```typescript
import { Storage } from 'simple-storage';
```

then you can use it like this:

```typescript
let json = {
    value1: 'Hello',
    value2: 'World'
}

// it will store `json` as an session storage
Storage.set('some-storage', json); 

// it will store `json` as an local storage
Storage.set('some-storage', json, true);

// it will get storage from sessionStorage Object
let r = Storage.get('some-storage');
// it will get storage from localStorage Object
// let r = Storage.get('some-storage', true);

console.log(r.value1 + ' ' + r.value2); // print Hello World in console
```

## Test
```sh
npm run test
```

## Contribute
feel free to fork and do what ever you want (or send pull requests).

for contribute this project, first clone the project and go to project folder:
```sh
git clone https://github.com/MetaiR/simple-storage.git
cd simple-storage
```

then run:
```sh
npm install
```

after that you ready to go :D