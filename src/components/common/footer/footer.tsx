import { component$ } from "@builder.io/qwik";
import { useServerTimeLoader } from "../../../routes/layout";

export default component$(() => {
  const serverTime = useServerTimeLoader();

  return (
    <footer>
      <div class="mt-8 text-center">
        <span>{serverTime.value.date}</span>
      </div>
    </footer>
  );
});
