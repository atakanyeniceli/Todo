import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { IAction, todoColor } from "../../features/todo/todoInterface"
import { _add } from "../../features/todo/todoSlice"
import { Colors } from "../Colors"


interface IProps {
    _display: 'none' | 'block',
    _setDisplay: React.Dispatch<React.SetStateAction<"none" | "block">>
}

const defaultTodo: IAction = {
    title: '',
    description: '',
    color: Colors[0].color
}

const addCustomColor = (_color: todoColor) => {
    const message = 'Would you like to save the color?'
    if (window.confirm(message)) {
        const _title = window.prompt('Please Enter Title.')
        if (_title !== null)
            Colors.push({ title: _title, color: _color })
    }
}

const NewTodo = ({ _display, _setDisplay }: IProps) => {
    const dispatch = useAppDispatch()
    const [todo, setTodo] = useState(defaultTodo)

    const addNewTodo = () => {

        if (todo.title.length > 0 && todo.description.length > 0 && todo.color.length > 0) {
            dispatch(_add({ ...todo }))
            setTodo(defaultTodo)
            _setDisplay('none')
        } else {
            alert('Please check your information.')
        }

    }

    return (
        <div style={{ display: _display }} className='bg-black bg-opacity-40 fixed top-0 z-10 w-full h-full text-center '>
            <div className=' mt-[10%] sm:mx-[30%] shadow-2xl shadow-black pb-5 pt-2 px-2'>
                <div className=' text-white text-right mb-2'>
                    <button onClick={() => _setDisplay('none')} className='rounded-full w-6 h-6 text-sm bg-slate-700 hover:bg-red-700'>X</button>
                </div>
                <div className=''>
                    <input className='outline-none px-2 w-full' type="text" placeholder='Title' maxLength={20} value={todo.title} onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
                </div>
                <div className='my-2'>
                    <textarea className='outline-none px-2 w-full h-36' placeholder='Description' value={todo.description} onChange={(e) => setTodo({ ...todo, description: e.target.value })} />
                </div>
                <div className='items-center mb-2 overflow-x-auto overflow-y-hidden flex h-20 w-full customColorScroll'>
                    {Colors.map((item, index) => {
                        return (
                            <div key={item.color + index} className='w-full mx-3 text-white'>
                                <div className='text-xs'>{item.title}</div>
                                <button
                                    onClick={() => setTodo({ ...todo, color: item.color })}
                                    style={{ backgroundColor: item.color }}
                                    className='w-6 h-6 rounded-full '>
                                    {item.color === todo.color && 'X'}
                                </button>
                            </div>)
                    })}
                </div>
                <div className='text-white'>
                    <button onClick={addNewTodo} className='border border-white px-5 rounded-lg shadow-md shadow-black active:shadow-inner'>Add</button>
                    <button className='relative mx-2 shadow-md shadow-black rounded-md px-2 border border-white active:shadow-inner'>
                        Custom Color
                        <input onBlur={(e) => {
                            const _value = e.target.value as todoColor
                            if (todo.color !== _value) {
                                setTodo({ ...todo, color: _value })
                                addCustomColor(_value)
                            }
                        }} className='opacity-0 absolute left-0 w-full' type="color" name="" id="" />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default NewTodo