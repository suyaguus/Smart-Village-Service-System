declare module 'form-data' {
  class FormData {
    constructor();
    append(
      name: string,
      value: any,
      options?: { filename?: string; contentType?: string } | string,
    ): void;
    getHeaders(): { [key: string]: string };
  }
  export = FormData;
}
