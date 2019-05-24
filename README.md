# Code class firebase rules

## Project setup

1. Create a firebase project in [the firebase console](https://console.firebase.google.com)
2. Click create database (start in test mode)
3. Add a collection called `shoppingList`
4. Add a first document with `auto-id` and with a field `name` and enter a random shopping list item as value.
5. Click on `project overview`. Add a `web app (</> icon)`. Create a new file in the root of the project called `firebase.config.js` and insert
```js
export default {
  // YOUR FIREBASE CONFIG GOES HERE
}
```

```bash
npm install
npm start
```
