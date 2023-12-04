export class InvalidInstanceException extends Error {
  constructor(identifier: string) {
    super(`Invalid instance for identifier: ${identifier}`);
  }
}
