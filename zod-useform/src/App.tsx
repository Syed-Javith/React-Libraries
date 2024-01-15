import React from 'react';
import './App.css';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"

interface FormData{
  name : string ,
  email : string,
  age : number,
  password : string ,
  confirmPassword : string
};

function App() {

  const schema : ZodType<FormData> = z.object({
    name : z.string().min(2).max(20),
    email : z.string().email(),
    age : z.number().min(18),
    password : z.string().min(8).max(16),
    confirmPassword : z.string().min(8).max(16)
  }).refine((data) => 
    data.password === data.confirmPassword,{
    message : "password mismatch",
    path : ["confirmPassword"]
  })

   const submitData = (data : FormData) => {
    console.log(data);
    
   }

  const { register , handleSubmit , formState : {
    errors
  } } = useForm<FormData>({ resolver : zodResolver(schema) })
  return (
    <div className="App">
      <form onSubmit={handleSubmit(submitData)}>
        <div className="form-group">
          <label htmlFor="name">Name : </label>
          <input type="text" id="name" {...register("name")} />
          <span>{errors.name && errors.name.message}</span>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email : </label>
          <input type="email" {...register("email")} id="email" />
          <span>{errors.email && errors.email.message}</span>
        </div>
        <div className="form-group">
          <label htmlFor="age">Age : </label>
          <input type="number" {...register("age" , { valueAsNumber : true }) } id="age" />
          <span>{errors.age && errors.age.message}</span>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password : </label>
          <input type="password" {...register("password")} id="password" />
          <span>{errors.password && errors.password.message}</span>
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password : </label>
          <input type="password" {...register("confirmPassword")} id="confirm-password" />
          <span>{errors.confirmPassword && errors.confirmPassword.message}</span>
        </div>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default App;
