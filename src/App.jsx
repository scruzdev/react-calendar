import { useState, useEffect } from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom" 

import { Header } from "./components/Header"
import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { MyAccount } from "./components/MyAccount"



function App() {

  const [userData, setUserData] = useState(null)

  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {


    async function fetchSession(){

      try {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
          const requestOptions = {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${storedToken}`, 
              'Content-Type': 'application/json', 
            }
          }
        

          const response = await fetch('https://backend-calendar-app-dev-xqxm.2.us-1.fl0.io/users/user',requestOptions)

          if (!response.ok) {
            // Maneja errores de respuesta HTTP
            const responseData =  await response.json()
            throw new Error(responseData.error);
          }

          // Procesa los datos de la respuesta
          const data = await response.json()
          
          setUserData(data)

          console.log(data)

          setIsLoading(false)

          console.log('setLoadingFALSE')
      }
      else {
        setIsLoading(false)
      }     

    } catch (err) {
        setIsLoading(false)
        console.error('Error de red: ', err)
        alert(err)
        
    }
  }
    fetchSession()

  }, []);


  return (
    <>
      <div className="flex flex-col w-max h-screen">
      <BrowserRouter>
        <Header userData={userData} isLoading={isLoading} setUserData={setUserData}/>
        <section className="flex-1 bg-blue-950">
          <Routes>
              <Route path='/'>
                    <Route index element={<Home isLoading={isLoading} userData={userData} />} />
                    <Route path='login' element={<Login userData={userData} setUserData={setUserData} />} />    
                    <Route path='my-account/*' element={<MyAccount isLoading={isLoading} userData={userData} setUserData={setUserData} />}/>                
              </Route>
          </Routes>
          </section>
      </BrowserRouter>      
      <footer className="bg-blue-800 w-screen font-mono text-center text-white py-2 px-4">
            Developed by Sebastián Cruz
      </footer>
        </div>

    </>
  )
}

export default App
