/* eslint-disable no-console */
const express = require("express");
const { join } = require("path");
const morgan = require("morgan");
const app = express();

// Deshabilitar X-Powered-By antes de cualquier middleware
app.disable('x-powered-by');

// Configuración de headers de seguridad HTTP
// NOTA: CSP y otros headers de seguridad están deshabilitados para evitar bloqueos
// Si necesitas seguridad en el futuro, descomenta las líneas correspondientes
app.use((req, res, next) => {
  // Content Security Policy (CSP) - DESHABILITADO
  // Si necesitas habilitarlo en el futuro, descomenta:
  // const csp = "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; " +
  //   "script-src * 'unsafe-inline' 'unsafe-eval' data: blob:; " +
  //   "style-src * 'unsafe-inline' data: blob:; " +
  //   "img-src * data: blob:; " +
  //   "font-src * data: blob:; " +
  //   "connect-src * data: blob:; " +
  //   "frame-src * data: blob:; " +
  //   "object-src * data: blob:; " +
  //   "media-src * data: blob:; " +
  //   "worker-src * data: blob:;";
  // res.setHeader("Content-Security-Policy", csp);

  // Headers de seguridad adicionales - DESHABILITADOS
  // Descomenta si necesitas habilitarlos en el futuro:
  
  // res.setHeader("X-Frame-Options", "SAMEORIGIN");
  // res.setHeader("X-Content-Type-Options", "nosniff");
  // if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
  //   res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  // }
  // res.setHeader("X-XSS-Protection", "1; mode=block");
  // res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  // res.setHeader("Permissions-Policy", 
  //   "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), speaker=()");

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
