import https from "https"
import { readFileSync } from "fs"
import { parse } from "url"
import next from "next"

const app = next({ dev: false })
const handle = app.getRequestHandler()

await app.prepare()

https.createServer(
  {
    key: readFileSync("./certificates/localhost-key.pem"),
    cert: readFileSync("./certificates/localhost.pem"),
  },
  (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }
).listen(8000, () => {
  console.log("> Ready on https://localhost:8000")
})
