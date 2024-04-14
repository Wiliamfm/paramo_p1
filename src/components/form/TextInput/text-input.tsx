import { component$, type QRL } from '@builder.io/qwik';

type TextInputProps = {
  name: string;
  class: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date';
  value: string | FormDataEntryValue | undefined | null;
  error: string | undefined;
  id?: string;
  label?: string;
  labelClass?: string;
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
        <label for={props.name} class={props.labelClass}>{props.label} {props.required && <span class="text-black dark:text-white">*</span>}</label>
        <input value={props.value} name={props.name} type={props.type} id={props.name} class={props.class} placeholder={props.placeholder}/>
        {props.error && <p class="my-2 text-sm text-red-600 dark:text-red-500">{props.error}</p>}
      </div>
    );
  }
);
