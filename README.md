# Marriage Biodata

A web-based marriage biodata profile with one share URL. It is read-only without an owner key and opens the editor when the key is added. There is no sign-in screen.

## Run locally

1. Create `server/.env` from `server/.env.example`.
2. Set `MONGODB_URI` and `IMAGEKIT_PRIVATE_KEY`.
3. Generate a long random owner edit key in PowerShell:
   `node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"`
   Put the output in the server environment as `OWNER_EDIT_KEY`.
4. In `client/.env`, set `VITE_API_BASE_URL=http://localhost:5000/api/v1`.
5. Start the API from `server` with `npm run dev`.
6. Start the website from `client` with `npm run dev`.

Open `http://localhost:5173/share/<share-id>` to view the read-only profile. To edit it, use that same URL with `?key=<OWNER_EDIT_KEY>` appended, for example `http://localhost:5173/share/<share-id>?key=<OWNER_EDIT_KEY>`. After saving, the normal share URL continues to show the updated profile. Use **Share** or **Copy link** to copy the URL without the key for visitors.

The key is a secret bearer credential: anyone who has the URL with `?key=...` can edit the biodata and upload photos. Keep that version private; share the same URL without the key with visitors. Do not put `OWNER_EDIT_KEY` in a client environment file or commit it. To revoke an exposed key, replace it in the server environment and restart/redeploy the server.

## Deploy

Deploy the client and API to public HTTPS addresses. Set `VITE_API_BASE_URL` to the deployed API's `/api/v1` URL, set the server's `CLIENT_URL` to the deployed website origin, and configure the server environment with `MONGODB_URI`, `IMAGEKIT_PRIVATE_KEY`, and a strong `OWNER_EDIT_KEY`.

The website host must serve the client app's `index.html` for direct visits to `/share/<share-id>`. Use the public `/share/<share-id>` URL when sharing the biodata; share the URL without its `key` parameter with visitors.
