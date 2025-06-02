import * as Sentry from "@sentry/react";
// import * as Sentry from "@sentry/react/cjs";

function inint() {
  Sentry.init({
    dsn: "https://a38f73bbb3b649e077919dcbcdcfe775@o4509376888832000.ingest.de.sentry.io/4509376904691792",
    sendDefaultPii: true,
  });
}

function log(error) {
  Sentry.captureException(error);
}

const logger = {
  inint,
  log,
};

export default logger;
