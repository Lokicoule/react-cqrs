export class InvalidDependencyException extends Error {
  constructor(identifier: string) {
    super(`Invalid dependency for identifier: ${identifier}`);
  }
}
