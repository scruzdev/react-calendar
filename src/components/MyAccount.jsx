import { useEffect } from "react"

import { Link, useNavigate, Route, Routes } from "react-router-dom"

import { Profile } from "./Profile"

import { Contacts } from "./Contacts"





export function MyAccount ({userData, isLoading, setUserData}) { //eslint-disable-line

    const navigate = useNavigate()

    useEffect(()=>{
        if(!isLoading && !userData){
            console.log(isLoading+' '+userData )
            navigate('/')
        }


    },[isLoading]) //eslint-disable-line
    return (
        <>
            {  userData ?         
                <section className='flex justify-center items-center h-full '>

                    <div className='flex-col my-2'>
                        <div className='flex justify-normal mb-2'>

                            <Link to='' className="px-4 py-3 text-md font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 dark:bg-[#2C2C2C] dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-[#041623]  dark:focus:text-white" >Profile</Link>
                            <Link to='contacts' className="px-4 py-3 text-md font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:bg-[#2C2C2C] dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-[#041623]   dark:focus:text-white" >Contacts</Link>
                        </div>
                            <Routes>
                                <Route path='/'>
                                <Route index element={<Profile userData={userData} setUserData={setUserData} isLoading={isLoading} />} />
                                <Route path='contacts' element={<Contacts  />} />
                                </Route>
                            </Routes>                    

                    </div>
                </section>

                :  

            <section className='bg-slate-900 flex flex-grow justify-center items-center'>
                <div className='flex w-1/2 h-1/2 justify-center mt-auto text-white'>
                    Loading...
                </div>
            </section>
            }
            
        </>
    )




}