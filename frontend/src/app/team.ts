import { User } from "./user";
import {Project} from "./project";

export interface Team {
    _id: string, 
    name: string,
    members: User [],
    project: Project | null
}