# calendar-homey-api

## Usage

Create a .env file
```bash
PORT=<port-number_if-not-defined_default-of-3000-used>
CONNECTION=mongodb+srv://<mongodbUsername>:<mongoDbPassword>@<serverAddress>?retryWrites=true&w=majority
NAME=<mongoDbName>
COLLECTION_SYSTEM=<mongoDb_system_collection>
COLLECTION_OPERATIONS=<mongoDb_operations_collection>
TOKEN_AUTH=<json-web-token-secret>
```

## Vercel

1. Create an account with Vercel
1. Clone done this repo
