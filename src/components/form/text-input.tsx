import { component$, type QRL } from '@builder.io/qwik';

type TextInputProps = {
  name: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date';
  inputClass: string;
  labelClass: string;
  label?: string;
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
    const { name, required, inputClass, labelClass } = props;

    return (
      <div>
        {label && (
          <label for={name} class={labelClass}>
            {label} {required && <span>*</span>}
          </label>
        )}
        <input
          {...props}
          id={name}
          class={inputClass}
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        />
        {error && <div id={`${name}-error`}>{error}</div>}
      </div>
    );
  }
);
