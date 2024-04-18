import { component$ } from "@builder.io/qwik";


export const TitleComponent = component$(({value}:{value:string})=>{
    return(
        <div class="flex h-[40vh] w-[90%] items-center justify-center  ">
          <h1 class="text-center text-3xl font-bold">{value}</h1>
        </div>
    )
});