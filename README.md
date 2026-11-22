# Marriage Biodata

A web-based marriage biodata profile with a private owner editor and a read-only public share link.

## Run locally

1. Create `server/.env` from `server/.env.example`.
2. Set `MONGODB_URI` and `IMAGEKIT_PRIVATE_KEY`.
3. Choose an `OWNER_PASSWORD` of at least 12 characters. In PowerShell, generate a signing secret with:
   `node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"`
   Copy its output into `SESSION_SECRET` in `server/.env`.
4. In `client/.env`, set `VITE_API_BASE_URL=http://localhost:5000/api/v1`.
5. Start the API from `server` with `npm run dev`.
6. Start the website from `client` with `npm run dev`.

The owner password and session secret must stay in the server environment. Never put them in a client environment file or commit them.

On first visit to the website, sign in with `OWNER_PASSWORD`. After saving the biodata, use **Share** or **Copy link** to get a public link. Anyone with that link can view the profile; only the signed-in owner can edit details or upload photos. Changes appear on the same public link after they are saved.

## Deploy

Deploy the client and API to public HTTPS addresses. Set `VITE_API_BASE_URL` to the deployed API's `/api/v1` URL, and set the server's `CLIENT_URL` to the deployed website origin. Configure the deployed server environment with `MONGODB_URI`, `IMAGEKIT_PRIVATE_KEY`, `OWNER_PASSWORD`, and `SESSION_SECRET`.

The website host must serve the client app's `index.html` for direct visits to routes such as `/share/<share-id>`. Keep `OWNER_PASSWORD` and `SESSION_SECRET` private.
