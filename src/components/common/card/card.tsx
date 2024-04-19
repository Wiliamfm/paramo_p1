import { component$, useSignal, $ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import Ima from "../../../../public/images/prueba1.jpg";

export const Card = component$(
  ({
    title,
    id,
  }: {
    id: string;
    title: string;
    description: string;
    date: string;
  }) => {
    const isOn = useSignal(false);

    const handleHover = $((hovered: boolean) => {
      isOn.value = hovered;
    });

    return (
      // revisar Link
      <a
        href={`/news/${id}`}
        class="flex h-[230px] w-full items-center justify-center transition-all duration-[0.5s] ease-in-out hover:bg-black hover:text-white md:h-[260px] "
        onMouseEnter$={async () => {
          await handleHover(true);
        }}
        onMouseLeave$={async () => {
          await handleHover(false);
        }}
      >
        <div class="flex h-full w-[85%] items-center justify-center sm:flex-row-reverse ">
          <div class="flex h-[120px] w-[60%] pl-3 sm:flex-col md:h-[160px] md:w-[65%]">
            <div class="md:w-[15%]">
              <span class="text-gray-500">02.03.24</span>
            </div>

            <div class="w-[85%] pl-3 sm:pl-0 ">
              <h2 class="text font-bold">{title}</h2>
              <button class="h-7 w-7 rounded-md bg-red-500 text-white">
                ir
              </button>
              
            </div>
          </div>
          <div class="newContainer flex h-full w-[40%] items-center justify-center overflow-hidden md:w-[35%]">
            <div
              class={`prueba newContainerImage h-[120px] w-[140px] overflow-hidden     md:h-[160px] md:w-[230px] `}
            >
              <img
                src={Ima}
                width="120"
                height="140"
                style={{
                  transform: isOn.value ? "scale(1.25)" : "scale(1)",
                  transition: "transform 0.5s ease-in-out",
                }}
              />
            </div>
          </div>
        </div>
      </a>
    );
  },
);
