import type { NextApiRequest, NextApiResponse } from "next";

// The real backend API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { route = [] } = req.query;
  const apiPath = Array.isArray(route) ? route.join("/") : route;
  const targetUrl = `${API_BASE_URL}/${apiPath}`;

  const headers: Record<string, string> = {};
  for (const key in req.headers) {
    if (typeof req.headers[key] === "string") {
      headers[key] = req.headers[key] as string;
    }
  }

  if (req.headers.cookie) {
    headers["cookie"] = req.headers.cookie;
  }
  console.log(headers, req.headers.cookie);
  const response = await fetch(targetUrl, {
    method: req.method,
    headers,
    body: ["GET", "HEAD"].includes(req.method || "")
      ? undefined
      : req.body
      ? JSON.stringify(req.body)
      : undefined,
    credentials: "include",
  });

  // Forward status and headers
  res.status(response.status);
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      res.setHeader("Set-Cookie", value);
    } else {
      res.setHeader(key, value);
    }
  });

  // Forward response body
  const data = await response.text();
  res.send(data);
}
