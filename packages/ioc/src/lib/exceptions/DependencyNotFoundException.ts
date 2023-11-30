export class DependencyNotFoundException extends Error {
  constructor(identifier: string) {
    super(`Dependency '${identifier}' not found.`);
  }
}
