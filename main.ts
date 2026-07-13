import { serveDir } from "jsr:@std/http/file-server";

Deno.serve((req) => {
  return serveDir(req, {
    fsRoot: "dist",
    urlRoot: "",
    showDirListing: false,
    enableCors: true,
  });
});