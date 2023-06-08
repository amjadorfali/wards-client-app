```js
/**
 * Get all conversions
 * with id
 * filtered by
 * page and country.
 */
await analytics.events
	.find({
		where: {
			page: '/pricing',
			country: 'NL'
		}
	})
	.conversions({
		where: {
			id: 231
		}
	});
```
