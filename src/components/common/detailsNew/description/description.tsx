import { component$ } from "@builder.io/qwik";


export const DescriptionComponent = component$(({value}:{value:string})=>{
    return(
        <div class="flex w-[90%] items-center justify-center  ">
          <h1 class="text-justify text-base">{value}</h1>
        </div>
    )
});