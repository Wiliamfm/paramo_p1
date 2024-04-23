import {
  $,
  component$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { Form, routeAction$, zod$ } from "@builder.io/qwik-city";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { NewsInputType, NewsType } from "~/models/news";
import { newsInputSchema } from "~/schemas/news.schema";
import { log } from "~/services/LogginService";
import { supabase } from "~/utils/supabase";

export const useCreate = routeAction$(async (data, requestEvent) => {
  const titleIndex = data.components.findIndex(x => x.title);

  if(titleIndex === -1){
    return requestEvent.fail(400, {success: false, error: "title is required"});
  }

  console.log(data);
  let title: string | undefined;
  try{
    title = data.components.splice(titleIndex, 1)[0].title;
    data.components.unshift({title, type: NewsInputType.title});
  }catch(error){
    log(`Failed to put title at the beginning of news: ${error}`);
    return requestEvent.fail(500, {message: "Failed to put title at the beginning of news"});
  }

  const userResponse = await supabase.auth.getUser();
  if(userResponse.error){
    log(`Failed to get user [${userResponse.error.status}: code: ${userResponse.error.code}]: ${userResponse.error.message}`);
    return requestEvent.fail(userResponse.error.status ?? 401, userResponse.error);
  }

  const newsResponse = await supabase.from("News")
  .insert({
    author_id: userResponse.data.user.id,
    title: title,
  })
  .select();
  if(newsResponse.error || newsResponse.data === null){
    log(`Failed to create news [${newsResponse.status}, hint ${newsResponse.error.hint}]: ${newsResponse.error.message}`);
    console.error(newsResponse);
    return requestEvent.fail(500, newsResponse.error);
  }

  for(let i = 0; i < data.components.length; i++){
    let componentResponse: PostgrestSingleResponse<any[]> | null;
    switch(data.components[i].type){
      case NewsInputType.title:
        continue;
      case NewsInputType.subtitle:
        componentResponse = await supabase.from("Subtitles")
        .insert({
          value: data.components[i].subtitle,
        })
        .select();
        break;
      case NewsInputType.description:
        componentResponse = await supabase.from("Contents")
        .insert({
          value: data.components[i].content,
        })
        .select();
        break;
      case NewsInputType.banner:
        componentResponse = await supabase.from("Images")
        .insert({
          value: data.components[i].images,
          type: 0,
          type_description: "banner",
        })
        .select();
        break;
      case NewsInputType.carousel:
        componentResponse = await supabase.from("Images")
        .insert({
          value: data.components[i].images,
          type: 1,
          type_description: "image",
        })
        .select();
        break;
      case NewsInputType.video:
        componentResponse = await supabase.from("Videos")
        .insert({
          value: data.components[i].videos,
        })
        .select();
        break;
      default:
        componentResponse = null;
        break;
    }
    if(!componentResponse || componentResponse.error || componentResponse.data == null){
      log(`Failed to create component [${componentResponse?.status}, hint ${componentResponse?.error.hint}]: ${componentResponse?.error.message}`);
      console.error(componentResponse);
      const response = await supabase
        .from("News")
        .delete()
        .eq("id", newsResponse.data[0].id);
      if(response.status != 204){
        log(`Failed to delete news id: ${newsResponse.data[0].id} created [${response.status}, hint ${response.error?.hint}]: ${response.error?.message}`);
        i--;
        continue;
      }
      log(`News id: ${newsResponse.data[0].id} deleted`);
      return requestEvent.fail(500, componentResponse?.error ?? {message: "Failed to create component"});
    }
    const newsComponent = await supabase.from("News_components")
    .insert({
      news_id: newsResponse.data[0].id,
      component_id: componentResponse.data[0].id,
      order: i,
      component_type: mapNewsInputTypes(data.components[i].type),
    })
    .select();
    if(newsComponent.error || newsComponent.data == null){
      i--;
      return requestEvent.fail(500, newsComponent?.error ?? {message: "Failed to create component"});
      //TODO: Check how to undo the rows creation.
      //continue;
    }
  }
  throw requestEvent.redirect(302, "/admin");
},
zod$(newsInputSchema),
);

const ModularComponent = component$(({ component, ...props }: { component: co, index: number }) => {
  const isOpen = useSignal(true);
  const handleModuleComponent = $(() => {
  console.log(props.index);
    if (component.type == "title") {
      return (
        <div class="flex flex-col">
          <label for={`components.${props.index}.title`}>ingrese titulo del articulo: </label>
          <input name={`components.${props.index}.title`} type="text" placeholder="titulo" />
          <input value={component.type} name={`components.${props.index}.type`} type="hidden" />
        </div>
      );
    } else if (component.type == "subtitle") {
      return (
        <div class="flex flex-col">
          <label for={`components.${props.index}.subtitle`}>ingrese un subtitulo: </label>
          <input name={`components.${props.index}.subtitle`} type="text" placeholder="subtitulo" />
          <input value={component.type} name={`components.${props.index}.type`} type="hidden" />
        </div>
      );
    } else if (component.type == "description") {
      return (
        <div class="flex flex-col">
          <label for={`components.${props.index}.content`}>ingrese una description: </label>
          <input name={`components.${props.index}.content`} type="text" placeholder="text" />
          <input value={component.type} name={`components.${props.index}.type`} type="hidden" />
        </div>
      );
    } else if (component.type == "banner") {
      return (
        <div class="flex flex-col">
          <label for={`components.${props.index}.bannerImage`}>ingrese una imagen para el banner: </label>
          <input name={`components.${props.index}.bannerImage`} type="file" />
          <input value={component.type} name={`components.${props.index}.type`} type="hidden" />
        </div>
      );
    } else if (component.type == "carousel") {
      return (
        <div class="flex flex-col">
          <label for={`components.${props.index}.images`}>seleccione imagenes para el carrousel: </label>
          <input name={`components.${props.index}.images`} type="file" />
          <input value={component.type} name={`components.${props.index}.type`} type="hidden" />
        </div>
      );
    } else if (component.type == "video") {
      return (
        <div class="flex flex-col">
          <label for={`components.${props.index}.videos`}>Ingrese url del video: </label>
          <input name={`components.${props.index}.videos`} type="text" placeholder="url" />
          <input value={component.type} name={`components.${props.index}.type`} type="hidden" />
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
        <div>{component.type}</div>
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
type co = {
  type:string,
  value: any,
}

export default component$(() => {
  const createAction = useCreate();
  const states = useStore({
    agregatorState: false,
    components: [] as co[],
  });

  const handleComponents = $((component: co, index: number) => {
    return <ModularComponent component={component} index={index} />;
  });

  return (
    <div class=" min-h-[70vh] w-full p-3 ">
      <h1 class="my-5 text-xl font-bold">Crear un nuevo articulo</h1>
      <Form action={createAction}>
        <div class="flex w-full flex-col items-center justify-center">
          {states.components.map((component, index) => {
            const comp = handleComponents(component, index);
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
                  states.components.push({type:"title",value:"Jueputa que rico"});
                  states.agregatorState = false;
                }}
              >
                Title
              </div>
              <div
                onClick$={() => {
                  states.components.push({type:"subtitle",value:"Jueputa que rico"});
                  states.agregatorState = false;
                }}
              >
                Subtitle
              </div>
              <div
                onClick$={() => {
                  states.components.push({type:"description",value:"Jueputa que rico"});
                  states.agregatorState = false;
                }}
              >
                Description
              </div>
              <div
                onClick$={() => {
                  states.components.push({type:"banner",value:"Jueputa que rico"});
                  states.agregatorState = false;
                }}
              >
                Banner
              </div>
              <div
                onClick$={() => {
                  states.components.push({type:"carousel",value:"Jueputa que rico"});
                  states.agregatorState = false;
                }}
              >
                Carousel
              </div>
              <div
                onClick$={() => {
                  states.components.push({type:"video",value:"Jueputa que rico"});
                  states.agregatorState = false;
                }}
              >
                Video
              </div>
            </div>
          </div>
          {/* submit button */}
          <button disabled={states.components.length === 0}  class={`fixed bottom-[10%] right-[5%] ${states.components.length === 0?"bg-gray-400":"bg-green-500"} `}>
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

function mapNewsInputTypes(type: NewsInputType): NewsType{
  switch(type){
    case NewsInputType.title:
      return NewsType.title;
    case NewsInputType.subtitle:
      return NewsType.subtitle;
    case NewsInputType.description:
      return NewsType.content;
    case NewsInputType.banner:
      return NewsType.bannerImage;
    case NewsInputType.carousel:
      return NewsType.images;
    case NewsInputType.video:
      return NewsType.videos;
  }
}
