import { component$ } from "@builder.io/qwik";


export const BannerComponent = component$(({value}:{value:string})=>{
    return(
        <div class="flex w-full items-center justify-center">
          <img class="w-full" width="2048" height="1080" src="https://itsbetterlive.livenationforbrands.com/wp-content/uploads/2024/04/Dreamville-fest.jpeg" alt="banner" />
        </div>
    )
});