export type todoColor = `#${string}`
export type todoStatus = 'Completed' | 'Pending' | 'InProgress'

export interface IinitialState {
    todoList: Array<ITodo>,
    searching: string,
}



export interface ITodo {
    id: number,
    title: string,
    description: string,
    color: todoColor,
    status: todoStatus
}

export interface IAction {
    title: string,
    description: string,
    color: todoColor
}