import { component$ } from "@builder.io/qwik";
import { useServerTimeLoader } from "../../../routes/layout";
import ImgParamoLogo from "/images/paramo_logo.png";

export interface FooterProps {
  class?: string;
}

export default component$<FooterProps>((props) => {
  const serverTime = useServerTimeLoader();

  return (
    <footer class={props.class+"  border border-red-500"}>
      <div class="flex items-center 	 pt-4 mx-auto text-center w-4/5 dark:text-white border-t-2 border-t-black dark:border-t-white">
      <img
                src={ImgParamoLogo}
                width="120"
                height="140"
                
              />
        <span class="">{serverTime.value.date}</span>
      </div>
    </footer>
  );
});
