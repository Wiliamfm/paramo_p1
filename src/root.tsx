import { Signal, component$, createContextId, useContextProvider, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { initFlowbite } from "flowbite";
import "./global.css";


export const ThemeContext = createContextId<Signal<string>>(
  'light'
);

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  // initialise the event listeners for the data attributes on render
  // eslint-disable-next-line qwik/no-use-visible-task
  const isDark = useSignal("light");
  useVisibleTask$(() => {
    initFlowbite();
  });
  
  useContextProvider(ThemeContext,isDark)

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta http-equiv="Permissions-Policy" content="interest-cohort=()" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <ServiceWorkerRegister />
        
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
