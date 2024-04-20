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

const ModularComponent = component$(() => {
  const isOpen = useSignal(true);
  return (
    <div class="flex w-full flex-col  items-center justify-center">
      <div class="flex h-7 w-full justify-end bg-black text-white">
        <div></div>
        <div
          class="borer-red-500 border"
          onClick$={() => isOpen.value=!isOpen.value}
        >
          {isOpen.value ? <p>^</p> : <p>V</p>}
        </div>
      </div>
      <div class="flex flex-col">
        <label for="email">Titulo del articulo: </label>
        <input type="text" placeholder="titulo" />
      </div>
    </div>
  );
});

export default component$(() => {
  const states = useStore({
    data: { name: "", date: "", description: "" } as DataType,
    agregatorState: true,
    components: [] as string[],
  });

  const handleComponents = $((component: string) => {
    if (component == "title") {
      return (
        // modular component
        <ModularComponent />
      );
    } else if (component == "subtitle") {
    }
  });

  const handleOnSubmit = $((event: Event) => {
    console.log(states.data);
  });

  return (
    <div class=" min-h-[70vh] w-full p-3 ">
      <h1>Crear un nuevo articulo</h1>
      <Form onSubmit$={handleOnSubmit}>
        <input type="" />
        {states.components.map((component, index) => {
          const comp = handleComponents(component);
          return comp;
        })}
        <div class="relative flex h-[25px] w-full items-center justify-center border border-red-500">
          <div
            class={`absolute left-1/2 top-1/2 min-h-[100px] w-[35vw]  ${states.agregatorState ? "" : "hidden"}`}
          >
            <div class="relative h-full w-full bg-green-300">
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
