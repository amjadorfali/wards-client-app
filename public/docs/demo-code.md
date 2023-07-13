```js
const monitor =
 new wards.Monitor();

/** send a heartbeat event
 * with a message
 */

monitor
.ping(
    { message: 'Alive' }
);

/** 
 * include counts
 * & error counts
 */
monitor
.ping({ 
    count: 100,
    error_count: 3 
});
```
