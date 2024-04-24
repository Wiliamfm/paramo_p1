import { component$ } from "@builder.io/qwik";


export const TitleComponent = component$(({value}:{value:string})=>{
  
    return(
        <div class="flex h-[70vh] w-[90%] items-center justify-center transition-all animate-slideIn ">
          <h1 class="text-center text-3xl font-bold md:text-6xl">{value}</h1>
        </div>
    )
});