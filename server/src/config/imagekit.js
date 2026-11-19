import "dotenv/config";

import ImageKit from "@imagekit/nodejs";

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

if (!privateKey) {
  throw new Error("IMAGEKIT_PRIVATE_KEY is missing. Check server/.env");
}

const imagekit = new ImageKit({
  privateKey,
});

export default imagekit;
