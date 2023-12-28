import { SignUp } from "./SignUp"

import { Calendar } from "./Calendar"

export function Home({userData, isLoading}){ //eslint-disable-line


    return(
        <>

          

            {
                !isLoading ? (
                    userData ?    
                    <main className="flex justify-center items-center h-full ">
                       
                            <Calendar userData={userData} isLoading={isLoading}/>

                    </main> :
                    <main className="flex justify-center items-center h-full">

                            <SignUp></SignUp>

                    </main>  ) 
                    : 
                    <main className="flex grow">
                        <section className='bg-slate-900 flex flex-grow justify-center items-center'>
                        </section>
                    </main> 
                        

            }
                


      </>
    )


}