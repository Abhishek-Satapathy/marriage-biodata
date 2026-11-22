# Marriage Biodata

A web-based marriage biodata profile with a public read-only share link and a separate private editing link. There is no sign-in screen.

## Run locally

1. Create `server/.env` from `server/.env.example`.
2. Set `MONGODB_URI` and `IMAGEKIT_PRIVATE_KEY`.
3. Generate a long random owner edit key in PowerShell:
   `node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"`
   Put the output in the server environment as `OWNER_EDIT_KEY`.
4. In `client/.env`, set `VITE_API_BASE_URL=http://localhost:5000/api/v1`.
5. Start the API from `server` with `npm run dev`.
6. Start the website from `client` with `npm run dev`.

Open `http://localhost:5173/manage/<OWNER_EDIT_KEY>` to edit the biodata. Open `http://localhost:5173/share/<share-id>` to view the public read-only profile. After saving, use **Share** or **Copy link** in the editor to copy the public URL. Changes appear at that same URL.

The edit URL is a secret bearer link: anyone who has it can edit the biodata and upload photos. Keep it private and do not put `OWNER_EDIT_KEY` in a client environment file or commit it. To revoke an exposed edit link, replace `OWNER_EDIT_KEY` in the server environment and restart/redeploy the server.

## Deploy

Deploy the client and API to public HTTPS addresses. Set `VITE_API_BASE_URL` to the deployed API's `/api/v1` URL, set the server's `CLIENT_URL` to the deployed website origin, and configure the server environment with `MONGODB_URI`, `IMAGEKIT_PRIVATE_KEY`, and a strong `OWNER_EDIT_KEY`.

The website host must serve the client app's `index.html` for direct visits to `/share/<share-id>` and `/manage/<edit-key>`. Use the public `/share/<share-id>` URL when sharing the biodata; never share the private `/manage/<edit-key>` URL.
