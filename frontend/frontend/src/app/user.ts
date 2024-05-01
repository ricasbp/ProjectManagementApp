import { Period } from "./period";

export interface User {
    _id: string;
    name: string;
    senha: string;
    admin: boolean;
    periods: Period [];
}
