import { component$ } from "@builder.io/qwik";
import { useServerTimeLoader } from "../../../routes/layout";

export interface FooterProps {
  class?: string;
}

export default component$<FooterProps>((props) => {
  const serverTime = useServerTimeLoader();

  return (
    <footer class={props.class}>
      <div class="flex items-center	 pt-4 mx-auto text-center w-4/5 dark:text-white border-t-2 border-t-black dark:border-t-white">
        <img class="mr-4" src="public/images/paramo_logo.png" width="200" height="200" alt="Paramo Logo" />
        <span class="">{serverTime.value.date}</span>
      </div>
    </footer>
  );
});
