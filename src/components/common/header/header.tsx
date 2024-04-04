import { QRL, component$, useSignal } from "@builder.io/qwik";
import { NavLink } from "../navLink/navLink";
import ImgParamoLogo from '../../../../public/images/paramo_logo.png?jsx';

interface HeaderProps {
  toggleSideBarMenu$ : QRL<() => void>;
}

export default component$<HeaderProps>((props) => {

  const isDark = useSignal(false);

  return (
    <>
      <nav class="w-screen mx-auto border-b-2 p-4 border-b-black dark:border-b-white dark:text-white">
        <div class="max-w-screen-xl flex flex-wrap items-stretch mx-auto">
          <div class="p-2 border-r-2 border-r-black dark:border-r-white">
            <button type="button" class="flex items-center" onClick$={props.toggleSideBarMenu$}>
              <span class="material-symbols-outlined">
                menu
              </span>
              Menu
            </button>
          </div>
          <div class="flex-auto p-2 text-center md:border-r-2 md:border-r-black dark:md:border-r-white">
            PARAMO PRESENTA LOGO
          </div>
          <div class="hidden md:block p-2 border-r-2 border-r-black dark:border-r-white">
            <span class="material-symbols-outlined">
              search
            </span>
          </div>
          <div class="hidden md:block p-2 border-r-2 border-r-black dark:border-r-white">
            Encuestas
          </div>
          <div class="hidden md:block p-2">
            <button onClick$={() => {
              isDark.value = !isDark.value
              if (isDark.value) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            }}>
              {isDark.value ?
                <span class="material-symbols-outlined">
                  brightness_high
                </span> :
                <span class="material-symbols-outlined">
                  dark_mode
                </span>
              }
            </button>
          </div>
        </div>
      </nav>
      <ImgParamoLogo class="w-1/2 mx-auto" alt="Paramo Logo" />
      <div class="flex justify-evenly text-center text-gray-500 dark:text-gray-400 p-4 w-5/6 mx-auto border-y-2 border-y-black dark:border-y-white">
        <NavLink href="/news" activeClass="text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Noticias</NavLink>
        <span class="border-x border-x-black dark:border-x-white"/>
        <NavLink href="/ideas" activeClass="text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Ideas</NavLink>
        <span class="border-x border-x-black dark:border-x-white"/>
        <NavLink  href="/fan-insights" activeClass="text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Fans</NavLink>
        <span class="border-x border-x-black dark:border-x-white"/>
        <NavLink href="/backstage-with-brands" activeClass="text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Marcas</NavLink>
        <span class="border-x border-x-black dark:border-x-white"/>
        <NavLink href="/" activeClass="" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Buscar</NavLink>
      </div>
    </>
  );
});
