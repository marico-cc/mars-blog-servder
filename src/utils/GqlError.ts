export class CmsError extends Error {
  code?: string | number;
  message: string;
  constructor(message: string, code?: string | number) {
    super(message);
    this.message = message;
    this.code = code;
  }
  toString() {
    return JSON.stringify({ code: this.code, message: this.message });
  }
}
