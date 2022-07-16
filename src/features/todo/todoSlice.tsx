import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAction, IinitialState, ITodo } from "./todoInterface";



const initialState: IinitialState = {
    todoList: Array<ITodo>(),
    searching: ''
}

export const todoSlice = createSlice(
    {
        name: 'todo',
        initialState,
        reducers: {
            _add: (state: IinitialState, action: PayloadAction<IAction>) => {
                state.todoList.push({ ...action.payload, id: state.todoList.length + 1, status: 'Pending' })
            },
            _update: (state: IinitialState, action: PayloadAction<ITodo>) => {
                const tempIndex = state.todoList.findIndex((todo) => todo.id === action.payload.id)
                if (tempIndex > -1)
                    state.todoList[tempIndex] = { ...action.payload }
            },
            _delete: (state: IinitialState, action: PayloadAction<number>) => {
                state.todoList = state.todoList.filter((todo) => todo.id !== action.payload)
            },
            _searching: (state: IinitialState, action: PayloadAction<string>) => {
                state.searching = action.payload
            }
        }
    }
)

export const { _add, _delete, _update, _searching } = todoSlice.actions