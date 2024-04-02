import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {

  const isDark = useSignal(false);

  return (
    <>
      <nav class="w-screen mx-auto flex border-b-2 p-4 border-b-black dark:border-b-white dark:text-white">
        <div class="p-2 border-r-2 border-r-black dark:border-r-white">
          <button>
            <i class="fa-solid fa-bars dark:color-white"></i> Menu
          </button>
        </div>
        <div class="flex-auto p-2 text-center border-r-2 border-r-black dark:border-r-white">
          PARAMO PRESENTA LOGO
        </div>
        <div class="p-2 border-r-2 border-r-black dark:border-r-white">
          <i class="fa-solid fa-magnifying-glass dark:color-white"></i>
        </div>
        <div class="p-2 border-r-2 border-r-black dark:border-r-white">
          Encuestas
        </div>
        <div class="p-2">
          <button onClick$={() => {
            isDark.value = !isDark.value
            if(isDark.value) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }}>
            {isDark.value ? <i class="fa-regular fa-sun"></i> : <i class="fa-solid fa-sun"></i>}
          </button>
        </div>
      </nav>
      <img src="public/images/paramo_logo.png" class="w-1/2 mx-auto" width="200" height="600" alt="Paramo Logo" />
      <div class="flex justify-evenly text-center text-gray-500 dark:text-gray-400 p-4 w-5/6 mx-auto border-y-2 border-y-black dark:border-y-white">
        <a href="#" aria-current="page" class="inline-block p-4 text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500">Noticias</a>
        <span class="border-x border-x-black dark:border-x-white"/>
        <a href="#" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Ideas</a>
        <span class="border-x border-x-black dark:border-x-white"/>
        <a href="#" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Fans</a>
        <span class="border-x border-x-black dark:border-x-white"/>
        <a href="#" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Marcas</a>
        <span class="border-x border-x-black dark:border-x-white"/>
        <a href="#" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Buscar</a>
      </div>
    </>
  );
});
