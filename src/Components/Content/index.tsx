import { useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { todoStatus } from '../../features/todo/todoInterface'
import TodoContainer from './todoContainer'



const Content = () => {

    const _todo = useAppSelector((e) => e.todo)
    const [search, setSearch] = useState<todoStatus | 'All'>('All')

    const backGroundStyle = (_search: todoStatus | 'All'): { backgroundColor: string, color: string } => {
        if (_search === search)
            return { backgroundColor: '#1ab23b',color:'#ffffff' }

        return { backgroundColor: '', color: '' }
    }

    return (
        <div className='mx-2'>
            <div className='my-2 text-center'>
                <div className=''>
                    <span onClick={() => setSearch('All')} style={backGroundStyle('All')} className='mx-1 rounded-md px-2 py-1'>All</span>
                    <span onClick={() => setSearch('Pending')} style={backGroundStyle('Pending')} className='mx-1 rounded-md px-2 py-1'>Pending</span>
                    <span onClick={() => setSearch('InProgress')} style={backGroundStyle('InProgress')} className='mx-1 rounded-md px-2 py-1'>InProgress</span>
                    <span onClick={() => setSearch('Completed')} style={backGroundStyle('Completed')} className='mx-1 rounded-md px-2 py-1'>Completed</span>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-5 my-2' >
                {
                    search === 'All' && _todo.todoList.filter((todo) => todo.title.includes(_todo.searching))
                        .map((filterTodo) => <TodoContainer key={filterTodo.id} _todo={filterTodo} />)
                }
                {
                    search !== 'All' && _todo.todoList.filter((todo) => todo.title.includes(_todo.searching) && todo.status === search)
                        .map((filterTodo) => <TodoContainer key={filterTodo.id} _todo={filterTodo} />)
                }
            </div>
        </div>
    )
}

export default Content