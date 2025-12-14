/* eslint-disable no-console */
const express = require("express");
const { join } = require("path");
const morgan = require("morgan");
const app = express();

// Deshabilitar X-Powered-By antes de cualquier middleware
app.disable('x-powered-by');

// Configuración de headers de seguridad HTTP
app.use((req, res, next) => {
  // Content Security Policy (CSP) - Versión mejorada sin unsafe-inline/unsafe-eval cuando sea posible
  // Nota: unsafe-inline y unsafe-eval pueden ser necesarios para Vue.js y algunas librerías
  // Se recomienda usar nonces o hashes en el futuro para mayor seguridad
  const csp = "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdn.auth0.com; " +
    "style-src 'self' 'unsafe-inline' https://cdn.auth0.com https://cdn.jsdelivr.net; " +
    "img-src 'self' data: https://cdn.jsdelivr.net https://cdn.auth0.com https://stackpath.bootstrapcdn.com https://cdnjs.cloudflare.com https://code.jquery.com https://maxcdn.bootstrapcdn.com https://www.google.com https://*.googleapis.com https://*.googleusercontent.com blob:; " +
    "font-src 'self' https://cdn.auth0.com https://cdn.jsdelivr.net; " +
    "connect-src 'self' https://api.google.dev https://api.ipify.org https://*.googleapis.com; " +
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

  // Asegurar que X-Powered-By esté removido (por si acaso)
  res.removeHeader("X-Powered-By");
  
  next();
});

app.use(morgan("dev"));
app.use(express.static(join(__dirname, "dist")));

app.use((_, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

app.listen(3000, () => console.log("Listening on port 3000"));
