import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "http://66fcce22ca354372ab54257ebf2f9a72@localhost:8000/1",
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#sendDefaultPii
});
