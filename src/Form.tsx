import { useState } from "react";


function Form () {

    const [value, setValue] = useState('');
    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        console.log(e.target);
        const {currentTarget: {value}} = e;
        setValue(value);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('hello ', value);
    };

    return (
        <form>
            <input value={value} onChange={onChange} type="text" placeholder="username"/>
            <button>Login</button>
        </form>
    )
}

export default Form;