import { component$ } from "@builder.io/qwik";
import { useServerTimeLoader } from "../../../routes/layout";
import Ima from "../../../../public/images/paramo_logo.png";

export interface FooterProps {
  class?: string;
}

export default component$<FooterProps>((props) => {
  const serverTime = useServerTimeLoader();

  return (
    <footer class={props.class+"  border border-red-500"}>
      <div class="flex items-center 	 pt-4 mx-auto text-center w-4/5 dark:text-white border-t-2 border-t-black dark:border-t-white">
        <img src={Ima} width={100} height={100} alt=""/>
        <p class="">{serverTime.value.date}</p>
      </div>
    </footer>
  );
});
