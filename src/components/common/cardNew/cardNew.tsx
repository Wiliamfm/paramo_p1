import { component$ } from '@builder.io/qwik';

export const CardNew = component$(({ title, description }: { title: string, description: string }) => {
    return (
        <div  class="w-full h-[230px] flex transition-all ease-in-out duration-[0.5s] hover:bg-black hover:text-white">
            <div class="w-[40%] h-full flex justify-center items-center border border-black">
                <div class="bg-black w-[140px] h-[140px]"></div>
            </div>
            <div class="w-[60%] h-full">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            
        </div>
    )
});