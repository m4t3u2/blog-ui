import { BaseDomain } from "./base-domain";
import { Usuario } from "./usuario";

export class Post extends BaseDomain {
    title: string;
    text: string;
    date: Date;
    user: Usuario;
}