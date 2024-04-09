import { component$ } from "@builder.io/qwik"

interface CardProps {
    ImgUrl: string;
    title: string;
    description?: string;
    url?: string;
  }

export default component$<CardProps>((props) => {
    return (        
        <a href="#" class="flex flex-col items-center bg-white  rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100  dark:bg-gray-800 dark:hover:bg-gray-700">
           <div>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.description}</p>
           </div>
            <img src={props.ImgUrl} class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="" alt="" />
        </a>
    );

});
