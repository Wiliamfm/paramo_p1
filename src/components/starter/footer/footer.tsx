import { component$ } from "@builder.io/qwik";
import { useServerTimeLoader } from "../../../routes/layout";
import styles from "./footer.module.css";

export default component$(() => {
  const serverTime = useServerTimeLoader();

  return (
    <footer>
      <div class="mt-8 text-center">
        <span class={styles.spacer}>|</span>
        <span>{serverTime.value.date}</span>
      </div>
    </footer>
  );
});
