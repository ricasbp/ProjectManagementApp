import { Team } from "./team";
import { User } from "./user";

export interface Reunion {
    _id: string, 
    nome: string,
    membros: User [],
    data_inicio: string,
    data_fim: string,
    team: Team
}