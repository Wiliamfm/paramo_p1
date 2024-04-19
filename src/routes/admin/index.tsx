import { component$, useContext, useStore } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
// import { RequestHandler } from '@builder.io/qwik-city';

// export const onRequest: RequestHandler = async (requestEvent) => {
//   console.log("\n\nADMIN:\n");
//   console.log(requestEvent);
//   await requestEvent.next();
//   console.log("\n\nADMIN - NEXT:\n");
//   console.log(requestEvent.cookie.get("access_token")?.value);
// }

export default component$(() => {
  const currentUser = useStore({
    logged: false,
    roles: [],
    token: "",
    name: "",
  });
  const states = useStore({
    articles: [
      {
        id: 1236545412,
        name: "estadio maracana fdf dgdg dgd aasd fefe fsdf asdf ",
        date: "03 .02 .21",
      },
      {
        id: 1236545412,
        name: "estadio maracana fdf dgdg dgd aasd fefe fsdf asdf ",
        date: "03 .02 .21",
      },
      {
        id: 1236545412,
        name: "estadio maracana fdf dgdg dgd aasd fefe fsdf asdf ",
        date: "03 .02 .21",
      },
      {
        id: 1236545412,
        name: "estadio maracana fdf dgdg dgd aasd fefe fsdf asdf ",
        date: "03 .02 .21",
      },
      {
        id: 1236545412,
        name: "estadio maracana fdf dgdg dgd aasd fefe fsdf asdf ",
        date: "03 .02 .21",
      },
      {
        id: 1236545412,
        name: "estadio maracana fdf dgdg dgd aasd fefe fsdf asdf ",
        date: "03 .02 .21",
      },
      {
        id: 1236545412,
        name: "estadio maracana fdf dgdg dgd aasd fefe fsdf asdf ",
        date: "03 .02 .21",
      },
      {
        id: 1236545412,
        name: "estadio maracana fdf dgdg dgd aasd fefe fsdf asdf ",
        date: "03 .02 .21",
      },
      {
        id: 1236545412,
        name: "estadio maracana fdf dgdg dgd aasd fefe fsdf asdf ",
        date: "03 .02 .21",
      },
      {
        id: 1236545412,
        name: "estadio maracana fdf dgdg dgd aasd fefe fsdf asdf ",
        date: "03 .02 .21",
      },
    ],
  });

  return (
    <div class=" min-h-[70vh] w-full p-3 ">
      <div class="sticky top-5 flex items-center justify-between rounded-lg bg-white ">
        <h1 class="my-5 text-xl font-bold">Admin page</h1>
        <Link href={"/admin/create"} class=" h-[30px] rounded-lg bg-green-500">
          Crear Nuevo Articulo
        </Link>
      </div>

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
            {states.articles.map((article) => {
              return (
                <tr key={article.id} class="!z-20 border border-black">
                  <td class="border-x border-black">{article.id}</td>
                  <td class="border-x border-black">{article.name}</td>
                  <td class="border-x border-black">{article.date}</td>
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
    </div>
  );
});
