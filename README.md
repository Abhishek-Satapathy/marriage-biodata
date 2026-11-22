# Marriage Biodata

A web-based marriage biodata profile with one share URL. It is read-only without an owner key and opens the editor when the key is added. There is no sign-in screen.

## Run locally

1. Create `server/.env` with the API and service settings below.
2. Set `MONGODB_URI` and `IMAGEKIT_PRIVATE_KEY`.
3. Set a private owner key in `server/.env`. The key must be at least six letters, digits, hyphens, or underscores. To use the example path `/my_key`, set `OWNER_EDIT_KEY=my_key`.
4. In `client/.env`, set `VITE_API_BASE_URL=http://localhost:5000/api/v1` (or the port configured for the local API).
5. Start the API from `server` with `npm run dev`.
6. Start the website from `client` with `npm run dev`.

Open `http://localhost:5173/` to view the read-only profile. To edit it, open `http://localhost:5173/<OWNER_EDIT_KEY>`; the same profile appears with edit controls. For example, if `OWNER_EDIT_KEY=my_key`, open `http://localhost:5173/my_key`. The **Share** button copies the root URL for visitors, and **Copy edit link** copies the owner URL.

Anyone who has the URL path containing the owner key can edit the biodata and upload photos. Use a long, hard-to-guess key for production; `my_key` is only a short example. Keep the edit URL private and share only the root URL with visitors. The API limits repeated incorrect attempts. Do not put `OWNER_EDIT_KEY` in a client environment file or commit it. To revoke an exposed key, replace it in the server environment and restart/redeploy the server.

## Deploy

Deploy the client and API to public HTTPS addresses. Set `VITE_API_BASE_URL` to the deployed API's `/api/v1` URL, set the server's `CLIENT_URL` to the deployed website origin, and configure the server environment with `MONGODB_URI`, `IMAGEKIT_PRIVATE_KEY`, and a private `OWNER_EDIT_KEY`.

The website host must serve the client app's `index.html` for direct visits to `/` and `/<OWNER_EDIT_KEY>`. Vercel uses `client/vercel.json` for this single-page-app rewrite. Share only the root website URL with visitors; keep the owner URL private.
