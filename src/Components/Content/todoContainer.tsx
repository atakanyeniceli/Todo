import { ITodo } from "../../features/todo/todoInterface"
import modificationIcon from '../../Assets/modificationIcon.svg'
import { useAppDispatch } from "../../app/hooks"
import { _delete } from "../../features/todo/todoSlice"
import { useState } from "react"
import ModificationTodo from "./modificationTodo"


const TodoContainer = ({ _todo }: { _todo: ITodo }) => {

    const dispatch = useAppDispatch()
    const [modification, setModification] = useState(false)

    return (
        <div style={{ backgroundColor: _todo.color }} className='rounded-lg mx-5 my-2 col-span-1  text-center p-2 text-white hover:cursor-pointer'>
            <div className='flex'>
                <div className='text-xs'>{_todo.status}</div>
                <div className='w-full text-center ml-5 '>Title</div>
                <div onClick={(e) => setModification(true)} className='mx-5 hover:scale-125'><img src={modificationIcon} alt="" /></div>
                <div onClick={() => dispatch(_delete(_todo.id))} className='text-xs hover:text-red-600'>X</div>
            </div>
            <div className='shadow-inner shadow-black mb-2 rounded-md'>{_todo.title}</div>
            <div>Description</div>
            <div className='my-2 shadow-inner shadow-black px-2 h-24 todoDescripton'>
                <p>{_todo.description}</p>
            </div>
            {modification && <ModificationTodo _todo={_todo} _setDisplay={setModification} />}
        </div>
    )
}

export default TodoContainer