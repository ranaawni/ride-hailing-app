import { StatusCodes } from "http-status-codes";

interface AppErrorArgs {
	httpCode: number;
	description: string;
	name?: string;
}

export class AppError extends Error {
	public readonly httpCode: number;
	public readonly description: string;
	public readonly name: string;

	constructor(args: AppErrorArgs) {
		super(args.description);

		Object.setPrototypeOf(this, new.target.prototype);

		this.httpCode = args.httpCode;
		this.description = args.description;
		this.name = args.name || "Error";

		Error.captureStackTrace(this);
	}
}
