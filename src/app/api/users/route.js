import { use } from "react";

export async function GET(request) {
  return Response.json({
    message: "Hello World!",
  });
}
