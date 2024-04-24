import {
  Resource,
  component$,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { News, NewsComponent } from "~/models/news.models";
import { log } from "~/services/LogginService";
import { supabase } from "~/utils/supabase";
import { useUserLoader } from "../layout";

export default component$(() => {
  const newsSignal = useSignal<News[]>();
  const user = useUserLoader();

  const newsResource = useResource$<News[]>(async ({ track }) => {
    track(() => newsSignal.value);
    const newsResponse = await supabase
      .from("News")
      .select("*, News_components(*)")
      .eq("author_id", user.value?.id ?? "-1");
    if (newsResponse.error || newsResponse.status != 200) {
      log(
        `Failed to get news [${newsResponse.status}: code: ${newsResponse.error?.code}]: ${newsResponse.error?.message ?? newsResponse.statusText}`
      );
      return [];
    }

    const data: News[] = [];
    for (let newsItem of newsResponse.data) {
      const news: News = {
        id: newsItem.id,
        title: newsItem.title,
        components: [],
        lastModification: newsItem.last_modification,
      };
      for (let newsComponent of newsItem.News_components) {
        newsComponent.component_type =
          newsComponent.component_type.charAt(0).toUpperCase() +
          newsComponent.component_type.slice(1);
        const componentsTable = `${newsComponent.component_type}s`;
        const componentResponse = await supabase
          .from(componentsTable)
          .select()
          .eq("id", newsComponent.component_id);
        if (componentResponse.error || componentResponse.status != 200) {
          log(
            `Failed to get news components [${componentResponse.status}: code: ${componentResponse.error?.code}]: ${componentResponse.error?.message ?? componentResponse.statusText}`
          );
          return [];
          //return {success: false, status: newsResponse.status ?? 500, error: componentResponse.error};
        }
        const component: NewsComponent = {
          type: newsComponent.component_type,
          value: componentResponse.data[0].value,
          order: newsComponent.order,
        };
        news.components.push(component);
      }
      data.push(news);
    }

    return data;
  });

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
          return (
            <>
              <h1>PENDING</h1>
            </>
          );
        }}
        onResolved={(news) => {
          return (
            <>
              <div class="w-full dark:text-white">
                <table class="w-full">
                  <thead>
                    <tr class="border border-black  bg-black text-white">
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
                          <td class="border-x border-black">
                            {article.lastModification?.toString() ?? ""}
                          </td>
                          <td class="flex h-full w-full justify-center items-center   sm:flex-col">
                            <Link
                              href={`/admin/edit/${article.id}`}
                              class="bg-purple-400 w-[60px] text-center sm:w-full"
                            >
                              <span class="material-symbols-outlined">
                                edit
                              </span>
                            </Link>
                            <button
                              class="bg-red-500 w-[60px] text-center sm:w-full"
                              onClick$={async () => {
                                const response = await supabase
                                  .from("News")
                                  .delete()
                                  .eq("id", article.id);
                                if (response.status != 204) {
                                  alert(
                                    `Failed to delete news id: ${article.id} created [${response.status}, hint ${response.error?.hint}]: ${response.error?.message ?? response.statusText}`
                                  );
                                  return;
                                }
                                alert(`News id: ${article.id} deleted`);
                                newsSignal.value = [];
                                return;
                              }}
                            >
                              <span class="material-symbols-outlined">
                                delete
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          );
        }}
      />
    </div>
  );
});
