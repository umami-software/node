# @umami/node

## Installation

```shell
npm install @umami/node
```

## Usage

```javascript
import umami from '@umami/node';

umami.init({
  websiteId: '50429a93-8479-4073-be80-d5d29c09c2ec', // Your website id
  hostUrl: 'https://umami.mywebsite.com' // URL to your Umami instance
});

umami.track({ url: '/home' });
```
