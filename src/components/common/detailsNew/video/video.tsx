import { component$ } from "@builder.io/qwik";


export const VideoComponent = component$(()=>{
    return(
        <div class="flex w-full h-[40vh] items-center justify-center  ">
          <iframe class="w-full h-full" src="https://www.youtube.com/embed/4ZGQQQ8iXdk?si=eKV-325SfxX3eWfY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullscreen></iframe>
        </div>
    )
});
