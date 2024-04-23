import { Resource, component$, useResource$, useStore } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Fail } from "~/models/FailedValidation";
import { News, NewsComponent } from "~/models/news.models";
import { log } from "~/services/LogginService";
import { supabase } from "~/utils/supabase";

export default component$(() => {
  const news = useStore<News[] | Fail>([]);

  const newsResource = useResource$<News[]>(async ({track}) => {
    track(() => news);
    const userResponse = await supabase.auth.getUser();
    if(userResponse.error){
      log(`Failed to get user [${userResponse.error.status}: code: ${userResponse.error.code}]: ${userResponse.error.message}`);
      return [];
      //return {success: false, status: userResponse.error.status ?? 401, error: userResponse.error};
    }
    const newsResponse = await supabase
      .from("News")
      .select("*, News_components(*)")
      .eq("author_id", userResponse.data.user.id)
    if(newsResponse.error || newsResponse.status != 200){
      log(`Failed to get news [${newsResponse.status}: code: ${newsResponse.error?.code}]: ${newsResponse.error?.message ?? newsResponse.statusText}`);
      return [];
      //return {success: false, status: newsResponse.status ?? 500, error: userResponse.error};
    }

    const data: News[] = []
    for(let newsItem of newsResponse.data){
      const news: News = {id: newsItem.id, title: newsItem.title, components: [], lastModification: newsItem.last_modification};
      for(let newsComponent of newsItem.News_components){
        newsComponent.component_type = newsComponent.component_type.charAt(0).toUpperCase() + newsComponent.component_type.slice(1);
        const componentsTable = `${newsComponent.component_type}s`;
        const componentResponse = await supabase
          .from(componentsTable)
          .select()
          .eq("id", newsComponent.component_id);
        if(componentResponse .error || componentResponse .status != 200){
          log(`Failed to get news components [${componentResponse.status}: code: ${componentResponse.error?.code}]: ${componentResponse.error?.message ?? componentResponse.statusText}`);
          return [];
          //return {success: false, status: newsResponse.status ?? 500, error: componentResponse.error};
        }
        const component: NewsComponent = {
          type: newsComponent.component_type,
          value: componentResponse.data[0].value,
          order: newsComponent.order,
        }
        news.components.push(component);
      }
      data.push(news);
    }
    return data;
  })

  return (
    <div class=" min-h-[70vh] w-full p-3 ">
      <div class="sticky top-5 flex items-center justify-between rounded-lg bg-white ">
        <h1 class="my-5 text-xl font-bold">Admin page</h1>
        <Link href={"/admin/create"} class=" h-[30px] rounded-lg bg-green-500">
          Crear Nuevo Articulo
        </Link>
      </div>
      <Resource
        value={newsResource}
        onPending={() => {
        return <>
          <p>PENDING</p>
        </>
        }}
        onResolved={(news) => {
          return <>
            <div class="w-full">
              <table class="w-full">
                <thead>
                  <tr class="border border-black">
                    <th class="border border-black">id</th>
                    <th class="border border-black">Nombre</th>
                    <th class="border border-black">fecha</th>
                    <th class="border border-black">acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((article) => {
                    return (
                      <tr key={article.id} class="!z-20 border border-black">
                        <td class="border-x border-black">{article.id}</td>
                        <td class="border-x border-black">{article.title}</td>
                        <td class="border-x border-black">{article.lastModification?.toString() ?? ""}</td>
                        <td class="flex h-full w-full justify-center items-center   sm:flex-col">
                          <Link
                            href={`/admin/edit/${article.id}`}
                            class="bg-purple-400 w-[60px] sm:w-full"
                            
                          >
                            editar
                          </Link>
                          <button
                            class="bg-red-500 w-[60px] sm:w-full"
                            onClick$={() => console.log("eliminar" + article.id)}
                          >
                            eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        }}
      />

    </div>
  );
});
