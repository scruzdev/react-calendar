import { Link, useNavigate } from 'react-router-dom';



export function Header ({userData, setUserData, isLoading}){ //eslint-disable-line
    
    const navigate = useNavigate();


    const handleLogoutClick = () => {

        localStorage.removeItem('token')
        // Cambia el estado a false
        setUserData(null)

       
        // Redirige al usuario a '/'
        navigate('/')
      }

   
    
    return(
        <>
            <header className="flex items-center px-2 w-screen justify-between bg-blue-800  text-white">
                <Link className='w-[198px]' to='/'>
                    <img src="/assets/images/astrology.png"className="h-22 w-20 ml-3 pb-2 pt-1" alt="Logo" />
                </Link>
                <h1 className=' flex text-center text-3xl font-mono'>Welcome to Calendar!</h1>
                {userData ? 
                    <>
                    <div className="flex w-[198px] items-center">
                    <Link to='/my-account' className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2'>{userData.name}</Link>
                   <button onClick={handleLogoutClick} className='text-white bg-gradient-to-br from-blue-500 to-purple-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2'>Logout</button>
                    </div>
                    
                    </>
                   
                     : 
                     isLoading ?
                    <div className='w-[198px] flex justify-center'>
                     Loading...   
                    </div>

                    :

                    <div className='w-[198px] flex justify-center'>
                    <Link to='/login' className='text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>Login</Link>    
                   </div>
                    
                }
                
            </header>

        </>
    ) 
    
}