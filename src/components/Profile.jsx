import { useEffect, useState } from 'react'


export function Profile ({userData, isLoading, setUserData}) { //eslint-disable-line

    const [feedback, setFeedback] =  useState(null) 
    const [error, setError] = useState(null)

    useEffect(()=>{
        console.log('render')
    },[feedback])

    const handleOnSubmit = async (event)=>{

        event.preventDefault()

        const fields = new FormData(event.target)

        const name = fields.get('name')
        const email = fields.get('email')
        const birthday = fields.get('birthday')
        const password = fields.get('password')
        const confirmPassword = fields.get('confirmpassword')

        const data = {
            name:name,
            mail:email,
            birthday:birthday
        }

        if(password !==''){
            data.password = password
        }

        // Valida que las password sean iguales
        if(password !== confirmPassword){
            setError('Las contraseñas deben ser iguales')
            setTimeout(() => {
                setError(null)
            }, 2000);
            return
        }
        

        try {

            const storedToken = localStorage.getItem('token')

            if (storedToken) {
                const requestOptions = {
                    method: 'PUT',
                    headers: {
                    'Authorization': `Bearer ${storedToken}`, 
                    'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(data)
                }

                const response = await fetch(`https://backend-calendar-app-dev-xqxm.2.us-1.fl0.io/users/update`,requestOptions)

                if (!response.ok) {
                    // Maneja errores de respuesta HTTP
                    alert()

                    const responseData =  await response.json()
                    throw new Error(responseData.error);
                }

                
                if (error) setError(null)

                setFeedback('Se han actualizado los datos')

                setTimeout(() => {
                    window.location.reload()
                }, 1000);

                

                


            }


        } catch (error) {
            console.error('Error de red: ', error)
            alert(error)
        }



    }

    return (
        <>
        <form onSubmit={handleOnSubmit} className="bg-slate-300 flex flex-col min-h-[493px] xs:min-w-[490.34px] sm:min-w-[543.34px]  justify-evenly shadow-md rounded-md px-10 pt-6 pb-6 ">
            <h1 className="text-2xl text-blue-900 mb-6 font-bold text-center font-sans">Profile</h1>
            <div className="flex">
                <div className="w-1/2 pr-2">
                    <label className="block text-lg text-gray-700 mb-2 font-bold" htmlFor="name">Name</label>
                    <input className="shadow border rounded py-1 px-2 w-full  leading-tight focus:outline-none" defaultValue={!isLoading && userData.name} name="name" type="text" />
                </div>
                <div className="w-1/2 pl-2">
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">Email</label>
                    <input className="shadow border rounded py-1 px-2 w-full leading-tight focus:outline-none" defaultValue={!isLoading && userData.mail} name="email" type="text" />
                </div>
            </div>
            <div className="flex">
                <div className="w-1/2 pr-2">
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="date">Birthday</label>
                    <input className="shadow border rounded py-1 px-2 w-full leading-tight focus:outline-none" defaultValue={!isLoading && userData.birthday.slice(0, 10)} name="birthday" type="date" />
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
                <button type="submit" className=" bg-blue-900 text-lg text-white px-3 border-none py-1 rounded">Save changes</button>
                
                    {
                        !error  ? 

                            <div className="font-bold mt-2 max-w-[200px]: text-green-700">
                                {feedback}
                            </div>  
                            :
                            <div className="font-bold mt-2 max-w-[200px]: text-red-700">
                                {error} 
                            </div>    
                    } 
                
            </div>
        </form>


        </>
    )
}