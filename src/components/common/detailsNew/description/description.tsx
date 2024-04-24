import { component$ } from "@builder.io/qwik";


export const DescriptionComponent = component$(({value}:{value:string})=>{
    return(
        <div class="flex w-[90%] items-center justify-center my-20">
          <h1 class="text-justify md:text-2xl">{value}</h1>
        </div>
    )
});