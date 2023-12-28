import { useEffect, useState } from "react"

import { MyModal } from "./MyModal"




export function Contacts () {

    const [friends, setFriends] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const [showModal,setShowModal] = useState(false)
    
    const [feedback, setFeedback] =  useState(null)

    const [error, setError] = useState(null)

    const RenderFriend = ({name, birthday, index})=>{

        const parsedBirthday = birthday.slice(0, 10)


        const handleDeleteFriend = async () => {

            try{
    
                const storedToken = localStorage.getItem('token')

                const friendID = friends[index].id
    
                if(storedToken){
    
                    const requestOptions = {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${storedToken}`, 
                            'Content-Type': 'application/json', 
                        },
                    }
        
                    const response = await fetch(`https://backend-calendar-app-dev-xqxm.2.us-1.fl0.io/users/user/friends/${friendID}`, requestOptions)
    
                    if (!response.ok) {
                        // Maneja errores de respuesta HTTP
                        const responseData =  await response.json()
                        setError('Hubo un problema al eliminar amigo, porfavor intente de nuevo')
                        throw new Error(responseData.error);
                    }
    
                    const lista = await response.json()
    
                    setFriends(lista)
    
                    setFeedback('Se ha eliminado con exito')
    
                    setTimeout(() => {
                        setFeedback(false)
                    }, 3000); 
                }
    
       
            }
            catch(err){
                console.error('Error de red: ', err)
                alert(err.message)
            }

        }

        return(
            <>
                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {parsedBirthday}
                    </td>
                    <td className="flex text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap justify-evenly ">
                        {/* <button > Edit </button> */}
                        <button type="button" onClick={handleDeleteFriend} > Delete </button>
                    </td>
                </tr>
            
            </>
        )
    
    }

    useEffect(()=>{
        const fetchFriends = async ()=>{

            try{
    
                const storedToken = localStorage.getItem('token')
    
                if(storedToken){
    
                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${storedToken}`, 
                            'Content-Type': 'application/json', 
                        }
                    }
        
                    const response = await fetch('https://backend-calendar-app-dev-xqxm.2.us-1.fl0.io/users/user/friends', requestOptions)
    
                    if (!response.ok) {
                        // Maneja errores de respuesta HTTP
                        const responseData =  await response.json()
                        throw new Error(responseData.error);
                    }
    
                    const lista = await response.json()

                    setFriends(lista.friends)

                    setIsLoading(false)
    
                    console.log(lista.friends)


    
                }
    
       
            }
            catch(err){
                console.error('Error de red: ', err)
                alert(err.mes)
            }
        } 
        fetchFriends()
    },[])

    console.log('render contacts')
    const handleFriendsModal = () => {

        setShowModal(!showModal)


    }

    return(
        <>
        { 
            showModal && 
            <MyModal friends={friends} setFriends={setFriends} setFeedback={setFeedback} setError={setError} setShowModal={setShowModal}></MyModal>
        }
        <form className="bg-slate-300 flex flex-col xs:min-w-[490.34px] sm:min-w-[543.34px] min-h-[493px] min-w-[544.34px] justify-center shadow-md rounded-md px-10 grow">
     
            <h1 className="text-2xl  text-blue-900 font-bold text-center font-sans">Contacts</h1>
            <div className="flex flex-col mt-2">
                <div className=" sm:mx-0.5 lg:mx-0.5">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-y-scroll max-h-[318px]">
                        <table className="min-w-full">
                        <thead className="bg-gray-200 border-b sticky top-0">
                            <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                #
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Name
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Birthday
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                Actions
                            </th>
                            </tr>
                        </thead>
                        <tbody className=" min-h-[493px] ">
                            {
                                !isLoading ?
                                    friends.map((friend,index) => {
                                        return <RenderFriend key={index} index={index} name={friend.name} birthday={friend.birthday} />
                                    })
                                :
                                
                                <tr >
                                    <td className="text-black font-bold" colSpan="4">Loading...</td>
                                </tr>
                                
                            }                            
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col text-center items-center mt-3 gap-2 ">
                <button type="button" className="bg-blue-900 text-lg text-white px-3 border-none py-1 w-36 rounded" onClick={handleFriendsModal}>Add friend</button>
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