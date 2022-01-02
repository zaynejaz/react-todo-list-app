import React, { useState, useEffect, useRef } from 'react'

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    });

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onSubmit({
            id: ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            ),
            text: input
        });

        setInput('');
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            {props.edit ? (
                <>
                    <input
                        placeholder="Update what needs doing"
                        value={input}
                        onChange={handleChange}
                        name="text"
                        ref={inputRef}
                        className="todo-input edit"
                    />
                    <button onClick={handleSubmit} className="todo-button edit">
                        Update
                    </button>
                </>
            ) : (
                <>
                    <input
                        placeholder="What needs to be done?"
                        value={input}
                        onChange={handleChange}
                        name="text"
                        className="todo-input"
                        ref={inputRef}
                    />
                    <button onClick={handleSubmit} className="todo-button">
                        Add todo
                    </button>
                </>
            )}
        </form>
    )
}

export default TodoForm
