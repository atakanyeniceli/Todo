import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { ITodo, todoStatus } from "../../features/todo/todoInterface"
import { _update } from "../../features/todo/todoSlice"
import { Colors } from "../Colors"


const ModificationTodo = ({ _todo, _setDisplay }: { _todo: ITodo, _setDisplay: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [todo, setTodo] = useState<ITodo>(_todo)
    const dispatch = useAppDispatch()

    return (
        <div className='fixed top-0 left-0 z-10 bg-black w-full h-full text-center bg-opacity-60 px-[20%] pt-[10%]'>
            <div className='shadow shadow-white px-5 py-2'>
                <div>
                    <div className='flex'>
                        <select className='text-sm outline-none my-1 bg-transparent' value={todo.status} onChange={(e) => setTodo({ ...todo, status: e.target.value as todoStatus })}>
                            <option className='text-black' value='Pending'>Pending</option>
                            <option className='text-black' value='InProgress'>InProgress</option>
                            <option className='text-black' value='Completed'>Completed</option>
                        </select>
                        <span className='w-full mr-20'>Title</span>
                        <span onClick={() => _setDisplay(false)} className='text-lg hover:text-red-700'>X</span>
                    </div>
                    <input className='w-full outline-none text-black px-2 shadow shadow-white' type="text" value={todo.title} onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
                </div>
                <div className='my-2'>
                    <span>Description</span>
                    <textarea className='w-full outline-none text-black shadow shadow-white' rows={5} value={todo.description} onChange={(e) => setTodo({ ...todo, description: e.target.value })}></textarea>
                </div>
                <div className='flex overflow-x-auto customColorScroll'>
                    {Colors.map((color, index) => {
                        return (
                            <div key={color.title + index} className='mx-1'>
                                <div>{color.title}</div>
                                <button onClick={() => setTodo({ ...todo, color: color.color })} style={{ backgroundColor: color.color }} className='w-6 h-6 rounded-full'>
                                    {todo.color === color.color && 'X'}
                                </button>
                            </div>
                        )
                    })}
                </div>
                <div className='my-2'>
                    <button onClick={() => {
                        dispatch(_update(todo))
                        _setDisplay(false)
                    }} className='shadow shadow-black px-5 py-1 rounded-md active:shadow-inner'>SAVE</button>
                </div>
            </div>
        </div>
    )
}

export default ModificationTodo