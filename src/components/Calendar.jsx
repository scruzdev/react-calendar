import { useEffect, useState } from "react"

import signosData from  '../assets/signos.json'



export function Calendar () {

    const [numberDays, setNumberDays] = useState([])

    const [actualMonth, setActualMonth] =  useState(null) 

    const [actualYear, setActualYear] =  useState(null) 

    const [friendsMonth, setFriendsMonth] =  useState(['lala'])

    const [friends, setFriends] = useState(null)

    const [signosDelMes, setSignosDelMes] = useState(null) 

   

    const daysOfWeek = ['Monday','Tuesday','Wednesday','Thuesday','Friday','Saturday','Sunday']

    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ]
      

    const handleNextMonth = ()=> {

        const date = new Date(actualYear,actualMonth)

        if (actualMonth === 11) {
            date.setMonth(0) // enero
            date.setFullYear(actualYear + 1)

        } else {
            date.setMonth(actualMonth+1)
        }
        



        calculateDaysInCalendar(actualYear,actualMonth+1)

        setActualMonth(date.getMonth())

        setActualYear(date.getFullYear())

        filterFriendsMonth(friends,date.getMonth())

        setSignosDelMes(getSignosDelMes(date.getMonth()))


    }

    const handlePrevMonth = ()=> {

        const date = new Date(actualYear,actualMonth)

        if (actualMonth === 0) {
            // Si el mes actual es enero (0), establece el mes en diciembre del año anterior
            date.setMonth(11) // diciembre
            date.setFullYear(actualYear - 1)// año anterior
          } else {
            date.setMonth(actualMonth - 1)
          }

        filterFriendsMonth(friends,date.getMonth())

        calculateDaysInCalendar(actualYear,actualMonth-1)

        setActualMonth(date.getMonth())

        setActualYear(date.getFullYear())

        setSignosDelMes(getSignosDelMes(date.getMonth()))

        
    }

    const calculateNumberDays = (year, month)=> {
        const date = new Date(year, month+1, 0)  
        return date.getDate()
    }

    const caluclateBlankDays = (year, month) => {
        const date = new Date(year, month, 1)
        let blankDays = date.getDay()

        
        if (blankDays === 0) {
            blankDays = 6
            return Array(blankDays).fill(null)
        }

        blankDays -= 1

        return Array(blankDays).fill(null)
    }

    const calculateDaysInCalendar = (year,month)=> {

        const length = calculateNumberDays(year,month)
        const days = Array.from({length}, (_,index)=> index+1)

        const blankDays = caluclateBlankDays(year,month)

        const calendarDays = [...blankDays,...days]

        setNumberDays(calendarDays)
    }

    const filterFriendsMonth = (friends, month) => {



        const friendsInMonth = friends.filter((friend)=> { 
            const birthdayDate = new Date(friend.birthday)
            return birthdayDate.getMonth() === month
        }) 

        console.log(friendsInMonth)

        console.log(month)


        setFriendsMonth(friendsInMonth)


    }

    const getSignosDelMes = (currentMonth) => {

        const signos = signosData.filter((signo) => {
            const inicio = new Date(`2023-${signo.inicio}`);
            const fin = new Date(`2023-${signo.fin}`);
          
            const mesInicio = inicio.getMonth()
            const mesFin = fin.getMonth()
          
            if (mesInicio <= mesFin) {
              return currentMonth >= mesInicio && currentMonth <= mesFin;
            } else {
              return (currentMonth === mesInicio || currentMonth === mesFin);
            }
          })

          if(signos[0].signo === 'Acuario' && signos[1].signo === 'Capricornio') {
            const signos2 = [...signos]
            signos[0] = signos2[1]
            signos[1] = signos2[0]
        }

          return signos
    }      

    const getBackgroundColor = (day, currentMonth) => { 
        
        const signosEnMes = signosData.filter((signo) => {
            const inicio = new Date(`2023-${signo.inicio}`);
            const fin = new Date(`2023-${signo.fin}`);
          
            const mesInicio = inicio.getMonth()
            const mesFin = fin.getMonth()
          
            if (mesInicio <= mesFin) {
              return currentMonth >= mesInicio && currentMonth <= mesFin;
            } else {
              return (currentMonth === mesInicio || currentMonth === mesFin);
            }
          });

        if(signosEnMes[0].signo === 'Acuario' && signosEnMes[1].signo === 'Capricornio') {
            const signos = [...signosEnMes]
            signosEnMes[0] = signos[1]
            signosEnMes[1] = signos[0]
        }

        const finPrimerSigno = parseInt(signosEnMes[0].fin.slice(3,5))  

        if (day <= finPrimerSigno) {
          return '#50B7C1';
        } else {
          return '#A3A4E0';
        }
      }




    useEffect(()=>{

        const actualDate = new Date()

        const month = actualDate.getMonth()

        const year = actualDate.getFullYear()

        setActualMonth(month)

        setActualYear(year)
        
        calculateDaysInCalendar(year,month)

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

                    

                    filterFriendsMonth(lista.friends, month)

                    setFriends(lista.friends)

               
    
                }
    
       
            }
            catch(err){
                console.error('Error de red: ', err)
                alert(err.mes)
            }
        } 

        fetchFriends()

        setSignosDelMes(getSignosDelMes(month))

        

        

    },[]) //eslint-disable-line


    return (
        <>

            <div className="2xl:max-w-[1344px] xl:max-w-[800px] lg:max-w-[770px] md:max-w-[640px] sm:max-w-[590px] xs:max-w-[490px] my-2 ">
            <div className="bg-white text-black flex justify-between px-2 py-1">
                    <div className="flex gap-2 items-center">
                        <span className="font-semibold text-xl ">{actualYear}</span>
                        <span className="font-semibold text-xl">{months[actualMonth]}</span>                  
                    </div>

                    <div className="flex gap-6 justify-center">
                    {
                        signosDelMes && (
                            signosDelMes.map((e,index)=> {

                                if (index === 0) { return <div key={index} className="flex justify-center font-medium text-lg items-center gap-2">
                                {e.signo}
                                <div className="bg-[#50B7C1] h-4 w-4 rounded-2xl"></div>
                                </div> }
                                else {
                                    return <div key={index} className="flex justify-center items-center font-medium text-lg gap-2">
                                        <div className="bg-[#A3A4E0] h-4 w-4 rounded-2xl"></div>
                                        {e.signo}
                                
                                </div>
                                }

                                
                            }

                            )
                        )
                    }
                    </div>
                    
                    <div className='flex items-center gap-2 py-1'>
                        <button type='button' className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-4 py-2 text-center" onClick={handlePrevMonth}>Prev</button>
                        <button type="button" className="text-white bg-gradient-to-br from-blue-400 to-green-600 hover:bg-gradient-to-bl   focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2  text-center" onClick={handleNextMonth}>Next</button>
                    </div>               
                </div>

                <div className="flex">
                    {daysOfWeek.map((e, i) => (
                    <div key={i} className="bg-white w-[15%] text-black flex border h-9 items-center pl-2">
                        {e}
                    </div>
                    ))}
                </div>

                <div className="flex bg-transparent  flex-wrap ">                
                {friends && friends.length > 0 ? 
               
                   (numberDays.map((day, i) =>{

                   
                        const backgroundColor = getBackgroundColor(day, actualMonth)

                        return <div key={i} className="2xl:max-w-[192px] 2xl:min-w-[192px] xl:max-w-[114.27px] xl:min-w-[114.27px] 
                         lg:max-w-[110px] lg:min-w-[110px] md:max-w-[91.37px] md:min-w-[91.37px] 
                         sm:max-w-[84.25px] sm:min-w-[84.25px] xs:max-w-[68.25px] xs:min-w-[70px]
                          text-white font-bold flex flex-col border h-24" style={{backgroundColor:backgroundColor}}> 
                            {day} 

                                                { <div className="flex text-[#180D0A] font-semibold flex-col m-0">
                        {friendsMonth.map((friend)=>{
                            if (friend.birthday && friend.birthday.slice){
                                const birthdayDay = friend.birthday.slice(8, 10)
                                if(parseInt(birthdayDay) === day) {
                                    return  <p key={friend.id}>{friend.name}</p>
                                }
                            }
                        })}
                    </div> }
                        </div>
                    
                        
                   }                                

            )
            ) : (
                // Renderiza null si friendsMonth aún no está cargado
                <div className="flex m-auto py-5 text-black font-medium bg-white w-full flex-col items-center">
                    Aun no tienes amigos agregados!
                    <p>Dirigente a tu perfil para agregar tus contactos</p>
                </div>
            )}
            </div>

            </div>
            
                    
        </>
    )
}