import { BaseDomain } from "./base-domain";

export class Usuario extends BaseDomain {
    name: string;
    username: string;
    email: string;
    password: string;
    roles: [];
}