# Terminaali

## API
### Authentication

Some of the actions on API endpoints require authentication. The json sent to the authentication endpoint needs to be as follows:

```javascript
{
	"email": "test@test.com",
    "password": "test"
}
```
And needs to be posted to:
```
POST /auth/local
```

The server will return a JSON web token that needs to be included in requests.

### List map pins

List all pins

```
GET /api/pins
```

Create a new pin (requires authentication)

```
POST /api/pins
```