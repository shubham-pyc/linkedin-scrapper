linkedin-scrapper
=========
## Installation
```shell 
npm install linkedin-scrapper
```

## Usage

```javascript
const scrapper = require("linkedin-scrapper");

scrapper({
    url:"{country-code}/{profile-id}/", // ex: in/natsu-gupta/
}).then(res=>console.warn(res));
```

scrapper returns a promise so it could be used with await as well.


```javascript
const scrapper = require("linkedin-scrapper");

async function foo(){
    const profile = await scrapper({url:"in/profile-id/"});
    console.warn(profile);
}

foo();
```

## Fetching Multiple Profiles
```javascript
scrapper({
    url: ["{country-code}/{profile-id-1}/",
        "{country-code}/{profile-id-2}/"
    ]
}).then(res => console.warn(res));
```