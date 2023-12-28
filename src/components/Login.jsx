import { useNavigate } from "react-router-dom";


export function Login({userData, setUserData}){ //eslint-disable-line
    const navigate = useNavigate()


    if(userData) navigate('/')

    const handeOnSubmit = async (event) => {

        event.preventDefault()

        const fields = new FormData(event.target)

        const email = fields.get('email')
        const password = fields.get('password')

        const data = {
            mail: email,
            password: password
        }

        try {
            const response = await fetch('https://backend-calendar-app-dev-xqxm.2.us-1.fl0.io/session',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if(response.ok){
                //mensaje de que se realizo con exito y/o redirigir al usuario
                const responseData = await response.json()
                console.log("Datos de la respuesta:", responseData)


             
                const { token } = responseData

                localStorage.setItem('token', token);

                setUserData(responseData)

                navigate('/')
                
            }else{
                //sv devuelve error
                const responseData = await response.json();
            
                alert(responseData.error)
                
            }


        } catch (err) {
            console.error('Error de red: ', err)
            alert(err.message)
            
        }

    
    }

    return(
        <>
         
            <section className='flex justify-center items-center h-full'>
                <form onSubmit={handeOnSubmit} className="bg-slate-200 shadow-md rounded-md px-10 pt-6 pb-6  ">
                        <h1 className="text-2xl text-gray-700 mb-3 font-bold text-center font-sans">Login</h1>
                        <label className="block text-gray-700 text-lg font-bold mb-3"  htmlFor="email">Email</label>
                        <input className="shadow border rounded py-1 px-2 w-full leading-tight mb-4 focus:outline-none"  name="email" type="text"></input>
                        <label className="block text-gray-700 text-lg font-bold mb-3" htmlFor="password">Password</label>
                        <input className="shadow border rounded py-1 px-2 w-full leading-tight mb-8 focus:outline-none" name="password" type="password"></input>
                        <div className="flex justify-center">
                            <button type="submit" className="bg-blue-800 text-lg w-24 text-white px-3 border-none py-1 rounded-md">Login</button>
                        </div>
                </form>
            </section>

        </>
    )


}