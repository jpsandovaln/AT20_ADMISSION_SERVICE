import { useState } from 'react';
import { Image, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form'
import './userForm.css';
 

export function UserForm (){

    const {register, formState:{errors}, handleSubmit} = useForm();

    const submit = (data) => {
        console.log(data);
    }

    return <div className = 'ui center aligned middle aligned grid'>
        
        <form onSubmit={handleSubmit(submit)}>
            <h2>Register User</h2>
            <div class="ui stacked segment">
            <div>
                <label>Full Name: </label>
                <input type= "text" {...register('name', {
                    required: true
                })}/>
                {errors.name?.type === 'required' && <p>this data are required</p>}
            </div>
            <div>
                <label>Email: </label>
                <input type= "text" {...register('email', {
                    required: true,
                    pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
                })}/>
                {errors.email?.type === 'required' && <p>this data are required</p>}
                {errors.email?.type === 'pattern' && <p>email format is required</p>}
            </div>
            <div>
                <label>Phone: </label>
                <input type= "text" {...register('phone', {
                    required: true,
                })}/>
                {errors.phone?.type === 'required' && <p>this data are required</p>} 
                       
            </div>
            <div>
                <label>Country: </label>
                <input type= "text" {...register('country', {
                    required: true,
                })}/>
                {errors.country?.type === 'required' && <p>this data are required</p>}
            </div>
            <div>
            <Button type='submit' primary>Register</Button>
            </div>
            </div>
        </form>
    </div>
}

export function ImageUser (){
    return <div className='changeMargin'>  
        <Image src='https://lpz.ucb.edu.bo/wp-content/uploads/2021/10/Jalasoft.png' size='medium' centered />
    </div>
} 

function InputUser({text, nameRegister}){
  const {register, formState:{errors}} = useForm();
  return <div>
   <label>{text} </label>
                <input type= "text" {...register(nameRegister, {
                    required: true
                })}/>
                {errors.nameRegister?.type === 'required' && <p>this data are required</p>}
  </div>
}