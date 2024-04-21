import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";

type DataType = {
  name: string;
  date: string;
  description: string;
};

const ModularComponent = component$(({ type }: { type: string }) => {
  const isOpen = useSignal(true);
  const handleModuleComponent = $(() => {
    if (type == "title") {
      return (
        <div class="flex flex-col">
          <label for="">ingrese titulo del articulo: </label>
          <input type="text" placeholder="titulo" />
        </div>
      );
    } else if (type == "subtitle") {
      return (
        <div class="flex flex-col">
          <label for="">ingrese un subtitulo: </label>
          <input type="text" placeholder="subtitulo" />
        </div>
      );
    } else if (type == "description") {
      return (
        <div class="flex flex-col">
          <label for="">ingrese una description: </label>
          <input type="text" placeholder="text" />
        </div>
      );
    } else if (type == "banner") {
      return (
        <div class="flex flex-col">
          <label for="">ingrese una imagen para el banner: </label>
          <input type="file" />
        </div>
      );
    } else if (type == "carousel") {
      return (
        <div class="flex flex-col">
          <label for="">seleccione imagenes para el carrousel: </label>
          <input type="file" />
        </div>
      );
    } else if (type == "video") {
      return (
        <div class="flex flex-col">
          <label for="">Ingrese url del video: </label>
          <input type="text" placeholder="url" />
        </div>
      );
    } else {
      return (
        <div>
          <h2>Componente no referenciado</h2>
        </div>
      );
    }
  });
  return (
    <div class="flex w-[80%] flex-col  items-center justify-center">
      <div class="flex h-7 w-full justify-between bg-black text-white">
        <div>{type}</div>
        <div class="" onClick$={() => (isOpen.value = !isOpen.value)}>
          {isOpen.value ? <p>^</p> : <p>V</p>}
        </div>
      </div>
      <div class={`flex w-full flex-col py-5 ${isOpen.value ? "" : "hidden"}`}>
        {handleModuleComponent()}
      </div>
    </div>
  );
});

export default component$(() => {
  const states = useStore({
    data: { name: "", date: "", description: "" } as DataType,
    agregatorState: false,
    components: [] as string[],
  });

  const handleComponents = $((component: string) => {
    return <ModularComponent type={component} />;
  });

  const handleOnSubmit = $((event: Event) => {
    console.log(states.data);
  });

  return (
    <div class=" min-h-[70vh] w-full p-3 ">
      <h1 class="my-5 text-xl font-bold">Crear un nuevo articulo</h1>
      <Form onSubmit$={handleOnSubmit}>
        <div class="flex w-full flex-col items-center justify-center">
          {states.components.map((component, index) => {
            const comp = handleComponents(component);
            return comp;
          })}
        </div>

        <div class="relative flex h-[25px] w-full items-center justify-center ">
          <div
            class={`absolute left-1/2 top-1/2 min-h-[100px] w-[35vw]  ${states.agregatorState ? "" : "hidden"}`}
          >
            <div class="relative h-full w-full bg-black p-3 text-white">
              {/* icon close */}
              <div
                class="absolute right-0 top-0 bg-red-500"
                onClick$={() =>
                  (states.agregatorState = !states.agregatorState)
                }
              >
                x
              </div>
              <div
                onClick$={() => {
                  states.components.push("title");
                  states.agregatorState = false;
                }}
              >
                Title
              </div>
              <div
                onClick$={() => {
                  states.components.push("subtitle");
                  states.agregatorState = false;
                }}
              >
                Subtitle
              </div>
              <div
                onClick$={() => {
                  states.components.push("description");
                  states.agregatorState = false;
                }}
              >
                Description
              </div>
              <div
                onClick$={() => {
                  states.components.push("banner");
                  states.agregatorState = false;
                }}
              >
                Banner
              </div>
              <div
                onClick$={() => {
                  states.components.push("carousel");
                  states.agregatorState = false;
                }}
              >
                Carousel
              </div>
              <div
                onClick$={() => {
                  states.components.push("video");
                  states.agregatorState = false;
                }}
              >
                Video
              </div>
            </div>
          </div>
          {/* submit button */}
          <button disabled={states.components.length === 0}  class={`fixed bottom-[10%] right-[5%] ${states.components.length === 0?"bg-gray-400":"bg-green-500"} `} onClick$={()=>console.log("hola")}>
                confirmar
          </button>

          {/* agregator */}
          <div
            id="agregator"
            class="relative flex h-[25px] w-[25px] items-center justify-center rounded-full border border-red-500 bg-red-500"
            onClick$={() => (states.agregatorState = !states.agregatorState)}
          >
            <p>+</p>
          </div>
        </div>
      </Form>
    </div>
  );
});
