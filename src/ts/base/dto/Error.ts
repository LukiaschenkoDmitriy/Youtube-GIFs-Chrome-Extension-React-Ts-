export default class ErrorResponse {
    public error: string;
    public code: number;
    public constructor(data: any) {
        this.error = data.error;
        this.code = data.code;
    }
}