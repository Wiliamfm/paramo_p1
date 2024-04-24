import { $, Signal, component$, useSignal } from "@builder.io/qwik";
import { NavLink } from "../navLink/navLink";
import ImgParamoLogo from "../../../../public/images/paramo_logo.png?jsx";
import { SideBarMenu } from "../sideBarMenu/sideBarMenu";
import { User } from "@supabase/supabase-js";
import { server$ } from "@builder.io/qwik-city";

interface HeaderProps {
  user: User | null;
}

export interface formCreation {
  name: string;
  dataTfLive: string;
  src: "//embed.typeform.com/next/embed.js";
}

const TypeFormView = component$(
  ({
    typeFormViewState,
    dataTfLive,
  }: {
    typeFormViewState: Signal;
    dataTfLive: string;
  }) => {
    try {
      if (dataTfLive) {
        return (
          <div
            class={` fixed -left-[100vw] top-0 z-50  h-[100vh] w-[100vw]  bg-red-500 bg-opacity-70 transform duration-200 ${typeFormViewState.value ? "translate-x-[100vw]" : ""}`}
          >
            <div class="flex items-center justify-center relative w-full h-full">
              <button
                class="absolute bg-purple-500 top-5 right-5 text-white"
                onClick$={() => {
                  typeFormViewState.value = !typeFormViewState.value;
                }}
              >
                X
              </button>
              <div class="w-[80%] h-[90%] bg-white">
                {/* 01HW175B1ZJ5BP9EHYRS309X9C */}
                {/* <div>{dataTfLive}</div> */}
                <div
                  data-tf-widget={dataTfLive}
                  data-tf-hide-headers
                  data-tf-hide-footer
                  data-tf-opacity="0"
                  id="dataTfLive"
                ></div>
                <script src="//embed.typeform.com/next/embed.js"></script>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div
            class={` fixed -left-[100vw] top-0 z-50  h-[100vh] w-[100vw]  bg-red-500 bg-opacity-70 transform duration-200 ${typeFormViewState.value ? "translate-x-[100vw]" : ""}`}
          >
            <div class="flex items-center justify-center relative w-full h-full">
              <button
                class="absolute bg-purple-500 top-5 right-5 text-white"
                onClick$={() => {
                  typeFormViewState.value = !typeFormViewState.value;
                }}
              >
                X
              </button>
              <div class="w-[80%] h-[90%] bg-white">
                {/* 01HW175B1ZJ5BP9EHYRS309X9C */}
                <div>{dataTfLive}</div>
              </div>
            </div>
          </div>
        );
      }
    } catch (err) {
      console.error(err);
    }
  }
);

export const getForm = server$(async function (formId: string) {
  const response = await fetch(`https://api.typeform.com/forms/${formId}`);
  return response.ok;
});

export default component$<HeaderProps>(({ user }) => {
  const isDark = useSignal(false);
  const sideBarMenuRef = useSignal<Element>();
  const modalFormState = useSignal(false);
  const forms = useSignal<formCreation[]>([
    {
      name: "formulario 1",
      dataTfLive: "",
      src: "//embed.typeform.com/next/embed.js",
    },
  ]);
  const typeFormViewState = useSignal(false);
  const typeFormViewId = useSignal("");

  const handleAddForm = $(async () => {
    new Promise<{ name: string; id: string }>((resolve) => {
      let name = window.prompt("el nombre del formulario") || "";
      let id = window.prompt("digite el id del form") || "";
      resolve({ name: name, id: id });
    })
      .then(async (val) => {
        if (val?.name == "" || val?.id == "") {
          return window.alert("no se pudo crear, algun campo vacio");
        }

        const response = await getForm(val.id);

        if (!response) {
          return window.alert("no se encontro el form");
        }

        forms.value = [
          ...forms.value,
          {
            dataTfLive: val.id,
            name: val.name,
            src: "//embed.typeform.com/next/embed.js",
          },
        ];
      })
      .catch((err) => console.log(err));
  });

  return (
    <div class="relative h-full w-full">
      {/* Modal Form */}

      <div
        class={` fixed -left-[100vw] top-0 z-50 flex h-[100vh] w-[100vw] items-center justify-center bg-black bg-opacity-70 transform duration-200 ${modalFormState.value ? "translate-x-[100vw]" : ""}`}
      >
        <button
          class="absolute right-[5%] top-[10%] text-white"
          onClick$={() => (modalFormState.value = !modalFormState.value)}
        >
          X
        </button>
        <div class="flex flex-col items-center justify-center gap-5 h-[80%] w-[80%] bg-transparent">
          {forms.value.map((form, index) => {
            return (
              <button
                key={index}
                class="w-[200px] h-[50px] bg-transparent border-2 border-white rounded-xl text-white font-bold"
                onClick$={() => {
                  typeFormViewState.value = !typeFormViewState.value;
                  typeFormViewId.value = form.dataTfLive;
                }}
              >
                {form.name}
              </button>
            );
          })}
          {user && (
            <button
              class="w-[200px] h-[50px] text-white border-2  bg-blue-500 rounded-xl font-bold"
              onClick$={() => handleAddForm()}
            >
              Agregar Formulario
            </button>
          )}
        </div>
      </div>
      {/* TypeForm View */}

      <TypeFormView
        typeFormViewState={typeFormViewState}
        dataTfLive={typeFormViewId.value}
      />

      {/*  */}
      <div ref={sideBarMenuRef}>
        <SideBarMenu
          id="drawer-navigation"
          modalFormState={modalFormState}
          user={user}
        />
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
              onClick$={() => (modalFormState.value = !modalFormState.value)}
            >
              Encuestas
            </button>

            <script src="//embed.typeform.com/next/embed.js"></script>
            <div class="hidden p-2 md:block">
              <button
                onClick$={() => {
                  const theme = document.documentElement.className;
                  
                  if (theme === "light") {
                    isDark.value = false
                    document.documentElement.className = "dark";
                    localStorage.setItem("theme", "dark");
                  } else {
                    document.documentElement.className = "light";
                    localStorage.setItem("theme", "light");
                    isDark.value = true

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
