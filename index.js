// Modules
import express from "express";
import helmet from "helmet";
import geoip from "geoip-lite";
import { z } from "zod";

// Settings
const listen_address = process.env.LISTEN_ADDRESS || "0.0.0.0";
const listen_port = process.env.LISTEN_PORT || "8080";

// New Express App
const app = express();

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Routes
app.get("/v0/geoip", function (req, res, next) {
  if (!req.query.ipv4) {
    res.status(400).json({
      status: "bad_request",
      message: "provide an ipv4 address in query string",
    });
  }
  const ipv4match = z.string().ip({ version: "v4" });
  const check = ipv4match.safeParse(req.query.ipv4);
  if (check.success !== true) {
    res.status(400).json({
      status: "bad_request",
      message: "invalid ipv4 address in query string",
    });
    return next();
  }
  const ipinfo = geoip.lookup(check.data);
  res.status(200).json({
    status: "ok",
    ipinfo: ipinfo,
  });
  return next();
});

// Wildcard - Not Found
app.get("*", function (req, res, next) {
  if (res.headersSent === false) {
    res.status(404).json({
      error: "not_found",
    });
  }
  return next();
});

// Error Handler - Basic
app.use(function (error, req, res, next) {
  res.status(500).json({
    status: "error",
    error: error,
  });
  return next();
});

// HTTP Server
app.listen(listen_port, listen_address, () => {
  console.log(`HTTP server listening on ${listen_address}:${listen_port}`);
});
