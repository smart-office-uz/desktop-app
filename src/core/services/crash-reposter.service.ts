import type { SeverityLevel } from "@sentry/react";
import * as sentry from "@sentry/react";

type Options = Partial<{
  severityLevel: SeverityLevel;
}>;

export interface ICrashReposterService {
  captureException(exception: Error, options?: Options): void;
}

export class CrashReporterService implements ICrashReposterService {
  captureException(exception: Error, options?: Options): void {
    sentry.captureException(exception, {
      level: options?.severityLevel ?? "error",
    });
  }
}

export const crashReporter = new CrashReporterService();
