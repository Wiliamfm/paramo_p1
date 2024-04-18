import { Slot, component$, type QRL } from '@builder.io/qwik';

type TextInputProps = {
  name: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date';
  value?: string | FormDataEntryValue | undefined | null;
  error?: string | undefined;
  class?: string;
  id?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  ref?: QRL<(element: HTMLInputElement) => void>;
  onInput$?: (event: Event, element: HTMLInputElement) => void;
  onChange$?: (event: Event, element: HTMLInputElement) => void;
  onBlur$?: (event: Event, element: HTMLInputElement) => void;
};

export const TextInput = component$(
  (props: TextInputProps) => {
  return (
    <div>
      <div class="mb-5">
        {props.error ? (<>
          <label for={props.name} class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">
            {props.label} {props.required && <span class="text-red-500">*</span>}
          </label>
          <input type={props.type} id={props.name} class={"bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" + props.class ?? ""} placeholder={props.placeholder} />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">{props.error}</p>
        </>) : (<>
          <label for={props.name} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {props.label} {props.required && <span class="text-red-500">*</span>}
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <Slot />
            </div>
            <input type={props.type} id={props.name} class={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" + props.class ?? ""} placeholder={props.placeholder} />
          </div>
        </>)}
      </div>
    </div>
    );
  }
);
