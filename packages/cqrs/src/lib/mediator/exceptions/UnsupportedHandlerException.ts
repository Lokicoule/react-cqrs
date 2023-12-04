export default class UnsupportedHandlerException extends Error {
  constructor(message: unknown, handler: unknown) {
    super(`Unsupported handler type ${handler} for message ${message}.`);
  }
}
