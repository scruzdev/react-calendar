import { useState } from "react"




export function SignUp (){

    const [error, setError] = useState(null)
    const [feedback, setFeedback] = useState(null)


    const handeOnSubmit = async (event) => {

        event.preventDefault()

        const fields = new FormData(event.target)

        const name = fields.get('name')
        const email = fields.get('email')
        const birthday =  fields.get('birthday')
        const password = fields.get('password')
        const confirmPassword = fields.get('confirmpassword')

        // Valida campos vacios
        if(!name || !email || !password || !confirmPassword ){
            setError('Todos los campos son obligatorios')
            return
        }

        // Valida que las password sean iguales
        if(password !== confirmPassword){
            setError('Las contraseñas deben ser iguales')
            return
        }

        const data = {
            mail: email,
            password: password,
            name: name,
            birthday: birthday
        }

        try {
            const response = await fetch('https://backend-calendar-app-dev-xqxm.2.us-1.fl0.io/users',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if(response.ok){
                //mensaje de que se realizo con exito y/o redirigir al usuario
                setFeedback('Register successfully')

                
            }else{
                //sv devuelve error
                const responseData = await response.json();
                setError(responseData.error || 'Error desconocido');
                console.log(responseData.error)
                alert('Algo ha salido mal, por favor intente nuevamente...')

                window.location.reload()
                
            }


        } catch (err) {
            console.error('Error de red: ', err)
            alert(err+'catch')
            
            setError('error')
        }


        setError(null)




    }

    return(
        <>
            {feedback ? 
            <form method="post" onSubmit={handeOnSubmit} className="bg-slate-200 shadow-md rounded-md px-10 pt-6 pb-6 ">
            <h1 className="text-2xl text-gray-700 mb-2 font-bold text-center font-sans">Sign Up</h1>
            <div className="font-bold text-center mt-6 max-w-[199px] text-green-700">
                {feedback} 
            </div>              
        </form> :

        <form method="post" onSubmit={handeOnSubmit} className="bg-slate-200 shadow-md rounded-md px-10 pt-6 pb-6">  
            <h1 className="text-2xl text-blue-900 mb-6 font-bold text-center font-sans">Sign Up</h1>
            <div className="flex">
                <div className="w-1/2 pr-2">
                    <label className="block text-lg text-gray-700 mb-2 font-bold" htmlFor="name">Name</label>
                    <input className="shadow border rounded py-1 px-2 w-full  leading-tight focus:outline-none" name="name" type="text" />
                </div>
                <div className="w-1/2 pl-2">
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">Email</label>
                    <input className="shadow border rounded py-1 px-2 w-full leading-tight focus:outline-none" name="email" type="text" />
                </div>
            </div>
            <div className="flex">
                <div className="w-1/2 pr-2">
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="date">Birthday</label>
                    <input className="shadow border rounded py-1 px-2 w-full leading-tight focus:outline-none" name="birthday" type="date" />
                </div>
                <div className="w-1/2 pl-2">
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">Password</label>
                    <input className="shadow border rounded py-1 px-2 w-full h-[32px] leading-tight focus:outline-none" name="password" type="password" />
                </div>
            </div>
            <div className="">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="confirmpassword">Confirm Password</label>
                <input className="shadow border rounded py-1 px-2 w-full leading-tight mb-6 focus:outline-none" name="confirmpassword" type="password" />
            </div>

            <div className="flex-col text-center">
                <button type="submit" className=" bg-blue-900 text-lg text-white px-3 border-none py-1 rounded">Create account</button>
                <div className="font-bold mt-2 max-w-[200px]: text-red-700">
                    {error} 
                </div> 
            </div>
         
          
        </form>
        
    }

        </>
    )

}