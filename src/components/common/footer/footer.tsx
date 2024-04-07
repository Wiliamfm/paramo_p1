import { component$ } from "@builder.io/qwik";
import { useServerTimeLoader } from "../../../routes/layout";
import ImgParamoLogo from '../../../../public/images/paramo_logo.png?jsx';

export interface FooterProps {
  class?: string;
}

export default component$<FooterProps>((props) => {
  const serverTime = useServerTimeLoader();

  return (
    <footer class={props.class}>
      <div class="flex items-center	 pt-4 mx-auto text-center w-4/5 dark:text-white border-t-2 border-t-black dark:border-t-white">
        <ImgParamoLogo class="mr-4" style={{ width: '200px'}} alt="Paramo Logo" />
        <span class="">{serverTime.value.date}</span>
      </div>
    </footer>
  );
});
