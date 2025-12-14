/* eslint-disable no-console */
const express = require("express");
const { join } = require("path");
const morgan = require("morgan");
const app = express();

// Configuración de headers de seguridad HTTP
app.use((req, res, next) => {
  // Content Security Policy (CSP)
  const csp = "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://code.jquery.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://stackpath.bootstrapcdn.com https://cdn.auth0.com; " +
    "style-src 'self' 'unsafe-inline' https://stackpath.bootstrapcdn.com https://cdn.auth0.com https://cdn.jsdelivr.net; " +
    "img-src 'self' data: https: blob:; " +
    "font-src 'self' https://stackpath.bootstrapcdn.com https://cdn.auth0.com; " +
    "connect-src 'self' https://api.google.dev https://api.ipify.org; " +
    "frame-src 'self' https://accounts.google.com; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "frame-ancestors 'self'; " +
    "upgrade-insecure-requests;";
  res.setHeader("Content-Security-Policy", csp);

  // X-Frame-Options: Protección contra clickjacking
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  // X-Content-Type-Options: Prevenir MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Strict-Transport-Security (HSTS): Solo para HTTPS
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }

  // X-XSS-Protection
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Referrer-Policy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions-Policy
  res.setHeader("Permissions-Policy", 
    "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), speaker=()");

  // Cache-Control para recursos estáticos
  if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  } else {
    // No cache para HTML y rutas de API
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
  }

  // Ocultar información del servidor
  res.removeHeader("X-Powered-By");
  
  next();
});

app.use(morgan("dev"));
app.use(express.static(join(__dirname, "dist")));

app.use((_, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

app.listen(3000, () => console.log("Listening on port 3000"));
