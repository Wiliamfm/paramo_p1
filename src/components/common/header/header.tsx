import { $, component$, useSignal } from "@builder.io/qwik";
import { NavLink } from "../navLink/navLink";
import ImgParamoLogo from "../../../../public/images/paramo_logo.png?jsx";
import { SideBarMenu } from "../sideBarMenu/sideBarMenu";

interface HeaderProps {}

export default component$<HeaderProps>(() => {
  const isDark = useSignal(false);
  const sideBarMenuRef = useSignal<Element>();
  const modalFormState = useSignal(false);

  const handleForm = $(() => {
    modalFormState.value = !modalFormState.value;
  });

  return (
    <div class="relative h-full w-full">
      {/* Modal Form */}
      {modalFormState.value ? (
        <div class={" fixed -left-[100vw] top-0 z-50 flex h-[100vh] w-[100vw] items-center justify-center bg-black bg-opacity-70 transform duration-200 $"}>
          <div
            class="absolute right-[5%] top-[10%] text-white"
            onClick$={() => (modalFormState.value = !modalFormState.value)}
          >
            X
          </div>
          <div class="h-[80%] w-[80%] bg-white">
            <div data-tf-live="01HVP5JQJAQV43656VTFHQWPDB"></div>
            <script src="//embed.typeform.com/next/embed.js"></script>
          </div>
        </div>
      ) : (
        ""
      )}
      {/*  */}
      <div ref={sideBarMenuRef}>
        <SideBarMenu id="drawer-navigation" modalFormState={modalFormState} />
      </div>
      <div
        class="h-full w-full"
        onFocusIn$={() => {
          const closeButton =
            sideBarMenuRef.value?.getElementsByTagName("button")[0];
          if (closeButton) {
            closeButton.click();
          }
        }}
        tabIndex={0}
      >
        <nav class="w-full border-b-2 border-b-black p-4 dark:border-b-white dark:text-white">
          <div class="flex flex-wrap items-stretch justify-stretch">
            <div class="border-r-2 border-r-black p-2 dark:border-r-white">
              <button
                type="button"
                class="flex items-center font-bold"
                data-drawer-target="drawer-navigation"
                data-drawer-show="drawer-navigation"
                aria-controls="drawer-navigation"
              >
                <span class="material-symbols-outlined">menu</span>
                MENU
              </button>
            </div>
            <div class="hidden flex-auto p-2 text-center font-[karla] md:block md:border-r-2 md:border-r-black dark:md:border-r-white">
              PARAMO PRESENTA LOGO
            </div>
            <button
              type="button"
              class="hidden border-r-2 border-r-black p-2 dark:border-r-white md:block"
            >
              <span class="material-symbols-outlined">search</span>
            </button>
            <button
              type="button"
              class="hidden border-r-2 border-r-black p-2 dark:border-r-white md:block"
              onClick$={() => handleForm()}
            >
              Encuestas
            </button>

            <script src="//embed.typeform.com/next/embed.js"></script>
            <div class="hidden p-2 md:block">
              <button
                onClick$={() => {
                  isDark.value = !isDark.value;
                  if (isDark.value) {
                    document.documentElement.classList.add("dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                  }
                }}
              >
                {isDark.value ? (
                  <span class="material-symbols-outlined">brightness_high</span>
                ) : (
                  <span class="material-symbols-outlined">dark_mode</span>
                )}
              </button>
            </div>
          </div>
        </nav>
        <ImgParamoLogo class="mx-auto w-1/3" alt="Paramo Logo" />
        {/* menu navigato */}
        <div class="mx-auto flex w-5/6 justify-evenly border-y-2 border-y-black p-4 text-center text-gray-500 dark:border-y-white dark:text-gray-400 sm:overflow-x-scroll">
          <NavLink
            href="/news"
            activeClass="text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
            class="inline-block p-4 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            Noticias
          </NavLink>
          <span class="border-x border-x-black dark:border-x-white" />
          <NavLink
            href="/ideas"
            activeClass="text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
            class="inline-block p-4 hover:bg-gray-50 hover:text-red-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            IDEAS
          </NavLink>
          <span class="border-x border-x-black dark:border-x-white" />
          <NavLink
            href="/fan-insights"
            activeClass="text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
            class="inline-block p-4 hover:bg-gray-50 hover:text-red-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            FANS
          </NavLink>
          <span class="border-x border-x-black dark:border-x-white" />
          <NavLink
            href="/backstage-with-brands"
            activeClass="text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
            class="inline-block p-4 hover:bg-gray-50 hover:text-red-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            MARCAS
          </NavLink>
          <span class="border-x border-x-black dark:border-x-white" />
          <NavLink
            href="/"
            activeClass=""
            class="inline-block p-4 hover:bg-gray-50 hover:text-red-600 dark:hover:bg-red-800 dark:hover:text-red-300"
          >
            BUSCAR
          </NavLink>
        </div>
      </div>
    </div>
  );
});
