import { $,component$, useStore } from "@builder.io/qwik";

export default component$(() => {
  const state = useStore({
    images: [
      "bg-red-500",
      "bg-purple-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-orange-500",
    ],
    imageSelector: 0,
  });
    const handleButtonsCarousel = $((direction:string)=>{
        preventdefault:onclick;
        if(direction=="left"){
            if(state.imageSelector===0){
                state.imageSelector = state.images.length-1
                return
            }
            state.imageSelector--

        }else if(direction=="right"){
            if(state.imageSelector===state.images.length-1){
                state.imageSelector = 0
                return
            }
            state.imageSelector++

        }else{
            console.log("f manito")
        }
    })

  return (
    <div class="relative w-full py-3">
      <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
        {state.images.map((image, index) => {
          return (
            <div
              key={index}
              class={`absolute h-full w-full duration-700 ease-in-out ${image}`}
            >
              hola
            </div>
          );
        })}
      </div>

      <div class="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
        {state.images.map((image, index) => {
          return (
            <button
              key={index}
              type="button"
              class={`$ h-3 w-3 rounded-full border-2 border-white ${index==state.imageSelector?"bg-white":""}`}
              onClick$={()=>{state.imageSelector = index}}
            ></button>
          );
        })}
      </div>

      <div class="group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none" onClick$={()=>handleButtonsCarousel("left")}>
        <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50   dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 ">
          <svg
            class="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </div>
      <div class="group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none" onClick$={()=>handleButtonsCarousel("right")}>
        <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50  dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 ">
          <svg
            class="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </div>
    </div>
  );
});
