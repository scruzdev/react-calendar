import { useRef } from "react";

export function MyModal ({friends, setFriends, setShowModal, setFeedback, setError}) { //eslint-disable-line


    

    const nombreRef = useRef("")
    const birthdayRef = useRef("")

    const handleCloseModal = () => {

        setShowModal(false)

    }

    const handleAddFriend = async () => {

        const newFriend = {
            name: nombreRef.current.value,
            birthday: birthdayRef.current.value
        }

        try{
    
            const storedToken = localStorage.getItem('token')

            if(storedToken){

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${storedToken}`, 
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(newFriend)
                }
    
                const response = await fetch('https://backend-calendar-app-dev-xqxm.2.us-1.fl0.io/users/user/friends', requestOptions)

                if (!response.ok) {
                    // Maneja errores de respuesta HTTP
                    const responseData =  await response.json()
                    setError('Hubo un problema al agregar amigo, porfavor intente de nuevo')
                    throw new Error(responseData.error);
                }

                const lista = await response.json()

                setFriends(lista)

                setFeedback('Se ha agregado con exito')

                setTimeout(() => {
                    setFeedback(false)
                }, 3000); 
            }

   
        }
        catch(err){
            console.error('Error de red: ', err)
            alert(err.mes)
        }


        handleCloseModal()


    }


    return(
            

        <>
            <div className="fixed inset-0 z-50 bg-black opacity-60"></div>
            <div className="fixed inset-0 left-0 z-50 flex justify-center items-center">
            <div className="text-white w-[420px] h-[300px]">
                <div className="bg-blue-900 rounded">
                <div className="flex justify-between py-3 px-4">
                    <h1 className="font-bold" id="exampleModalLabel">Add friend</h1>
                    <button type="button" className="bg-slate-600 rounded px-2" onClick={handleCloseModal} aria-label="Close">X</button>
                </div>
                <div className="border-y-[1px] py-6">
                    <form className="flex flex-col px-20">
                    <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label block">Nombre:</label>
                        <input ref={nombreRef} type="text" className="shadow border py-1 px-2 leading-tight focus:outline-none rounded  text-black w-full" id="web-name"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message-text" className="col-form-label block">Birthday:</label>
                        <input ref={birthdayRef} type="date" className="shadow border rounded py-1 px-2 leading-tight focus:outline-none  text-black w-full" id="web-name"></input>
                    </div>
                    </form>
                </div>
                <div className="py-4 flex justify-center gap-7">
                    <button type="button" className="font-medium bg-red-800 px-2 py-1 rounded" onClick={handleCloseModal}>Cancelar</button>
                    <button type="button" onClick={handleAddFriend} data-bs-dismiss="modal" className="font-medium bg-blue-700 px-2 py-1 rounded">Guardar</button>
                </div>
                </div>
            </div>
            </div>
        </>

    )



}