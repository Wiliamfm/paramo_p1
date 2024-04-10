import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';


export const CardNew = component$(({ title, description, id, date }: {id:string, title: string, description: string, date:string }) => {
    return (
        <Link href={`/news/${id}`} class="w-full h-[230px] flex justify-center items-center transition-all ease-in-out duration-[0.5s] hover:bg-black hover:text-white md:h-[260px] ">
            <div class="w-[85%] h-full flex justify-center items-center sm:flex-row-reverse ">

                <div class="w-[60%] h-[120px] flex pl-3   sm:flex-col md:w-[65%] md:h-[160px]">
                    <div class="  md:w-[15%]">
                        <span class="text-gray-500">02.03.24</span>
                    </div>

                    <div class="w-[85%] pl-3  sm:pl-0 ">
                        <h2 class="font-bold text">{title}</h2>
                        <button class="w-7 h-7 bg-red-500 rounded-md text-white">ir</button>
                    </div>
                    
                </div>
                <div class="w-[40%] h-full flex justify-center items-center  overflow-hidden md:w-[35%]">
                    <div class="bg-black w-[140px] h-[120px] md:w-[230px] md:h-[160px]"></div>
                </div>
            </div>

        </Link>
    )
});
