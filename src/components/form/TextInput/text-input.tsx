import { component$, type QRL } from '@builder.io/qwik';

type TextInputProps = {
  name: string;
  class: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date';
  label?: string;
  labelClass?: string;
  placeholder?: string;
  value: string | undefined;
  error: string;
  required?: boolean;
  ref: QRL<(element: HTMLInputElement) => void>;
  onInput$: (event: Event, element: HTMLInputElement) => void;
  onChange$: (event: Event, element: HTMLInputElement) => void;
  onBlur$: (event: Event, element: HTMLInputElement) => void;
};

export const TextInput = component$(
  ({ label, error, ...props }: TextInputProps) => {
    const { name, required } = props;
    return (
      <div>
        {label && (
          <label for={name} class={props.labelClass ?? ''}>
            {label} {required && <span>*</span>}
          </label>
        )}
        <input
          {...props}
          id={name}
          class={props.class}
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        />
        {error && <div id={`${name}-error`} class="text-red-600 dark:text-white">{error}</div>}
      </div>
    );
  }
);
