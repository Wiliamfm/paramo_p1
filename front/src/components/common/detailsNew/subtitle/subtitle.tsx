import { component$ } from "@builder.io/qwik";


export const SubtitleComponent = component$(({value}:{value:string})=>{
    return(
        <div class="flex h-[15vh] w-[90%] items-center justify-center  ">
          <h1 class="w-full text-left text-2xl font-bold">{value}</h1>
        </div>
    )
});