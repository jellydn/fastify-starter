import process from "process";

import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-proto";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { Resource } from "@opentelemetry/resources";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

// Configure the SDK to export telemetry data to the console
// enable all auto-instrumentations from the meta package
const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "fastify-service",
  }),
  traceExporter: new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces",
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: "http://localhost:4318/v1/metrics",
    }),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

// Initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start();

// Gracefully shut down the SDK on process exit
process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(() => {
      console.log("Tracing terminated");
    })
    .catch((error) => {
      console.log("Error terminating tracing", error);
    })
    .finally(() => process.exit(0));
});
