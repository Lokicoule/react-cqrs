export default class UnsupportedMessageException extends Error {
  constructor(message: unknown) {
    super(`Unsupported message type ${message}.`);
  }
}
