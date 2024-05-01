export interface Task {
    _id: string;
    name: string;
    priority: String;
    users: String[];
    project: String;
    progress: Number;
    items: Item[];
    data_inicio: Date;
    data_fim: Date;
}

export interface Item {
    name: string,
    completed : boolean,
}
