import { Signal, component$, useContext } from '@builder.io/qwik';
import { NavLink } from '../navLink/navLink';
import { User } from '@supabase/supabase-js';
import { ThemeContext } from '~/root';

export interface SideBarMenuProps {
  id: string,
  modalFormState:Signal,
  user: User | null
}

export const SideBarMenu = component$<SideBarMenuProps>((props) => {
  const isDark = useContext(ThemeContext)
  console.log("SideBar user: \n", props.user);

  

  return (
    <div id={props.id} class="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800 dark:text-white" tabIndex={-1} aria-labelledby="drawer-navigation-label">
      <h5 id="drawer-navigation-label" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">MENU</h5>
      <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Close menu</span>
      </button> <div class="py-4 overflow-y-auto">
        <ul class="space-y-2 font-medium">
          <li class="text-center flex items-center md:hidden">
            <button type="button" class="p-2 border-r-2 border-r-black dark:border-r-white">
              <span class="material-symbols-outlined">
                search
              </span>
            </button>
            <button type="button" class="p-2 border-r-2 border-r-black dark:border-r-white" onClick$={()=>props.modalFormState.value=!props.modalFormState.value}>
              Encuestas
            </button>
            <button
                onClick$={() => {
                  
                  
                  if (isDark.value === "light") {
                    isDark.value = "dark"
                    document.documentElement.className = "dark";
                    localStorage.setItem("theme", "dark");
                  } else {
                    document.documentElement.className = "light";
                    localStorage.setItem("theme", "light");
                    isDark.value = "light"

                  }
                }}
              >
                {isDark.value == "light" ? (
                  <span class="material-symbols-outlined">brightness_high</span>
                ) : (
                  <span class="material-symbols-outlined">dark_mode</span>
                )}
              </button>
          </li>
          <li>
            <NavLink href="/news" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" activeClass="text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Noticias</NavLink>
          </li>
          <li>
            <NavLink href="/ideas" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" activeClass="text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Ideas</NavLink>
          </li>
          <li>
            <NavLink  href="/fan-insights" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" activeClass="text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Fans</NavLink>
          </li>
          <li>
            <NavLink href="/backstage-with-brands" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" activeClass="text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Marcas</NavLink>
          </li>
          <li>
            <NavLink href="/" activeClass="" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Buscar</NavLink>
          </li>
          {props.user && 
            <li>
              <NavLink href="/admin" activeClass="" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Admin</NavLink>
            </li>
          }
          <li>
            <a href={props.user ? "/logout" : "/login"} class="inline-block p-4 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">{props.user ? "logout" : "login"}</a>
          </li>
        </ul>
      </div>
    </div>
  );
});
