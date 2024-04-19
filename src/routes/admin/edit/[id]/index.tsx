import { component$, useContext, useStore } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
    const currentUser = useStore({
      logged: false,
      roles: [],
      token: "",
      name: "",
    });
    const states = useStore({
      article: null || "",
    });
    const { params } = useLocation();
    return (
      <div class=" min-h-[70vh] w-full p-3 ">
        <h1 >editar: {params.id}</h1>
      </div>
    );
  });
  