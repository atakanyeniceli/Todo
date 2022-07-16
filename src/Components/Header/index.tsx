import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { _searching } from '../../features/todo/todoSlice'
import NewTodo from '../newTodo'

const Header = () => {

    const [newTodoDisplay, setNewTodoDisplay] = useState<'none' | 'block'>('none')
    const _search = useAppSelector((slice) => slice.todo.searching)
    const dispatch = useAppDispatch()

    return (
        <div className='bg-green-700 w-full py-2 text-center sticky top-0   w'>
            <input className='bg-transparent border border-white rounded-md px-2 outline-none text-white' value={_search} onChange={(e) => dispatch(_searching(e.target.value))} type="text" placeholder='Search' />
            <button onClick={() => setNewTodoDisplay('block')} className='ml-3 font-bold text-white text-xl'>+</button>
            <NewTodo _display={newTodoDisplay} _setDisplay={setNewTodoDisplay} />
        </div>
    )
}

export default Header