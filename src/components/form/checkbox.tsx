import { component$, type QRL } from '@builder.io/qwik';

type CheckboxProps = {
  ref: QRL<(element: HTMLInputElement) => void>;
  name: string;
  value: boolean;
  checked?: boolean;
  onInput$: (event: Event, element: HTMLInputElement) => void;
  onChange$: (event: Event, element: HTMLInputElement) => void;
  onBlur$: (event: Event, element: HTMLInputElement) => void;
  required?: boolean;
  class?: string;
  label: string;
  labelClass:string;
  error?: string;
};

/**
 * Checkbox that allows users to select an option. The label next to the
 * checkbox describes the selection option.
 */
export const Checkbox = component$(
  ({ label, error, class: className, labelClass, ...props }: CheckboxProps) => {
    const { name, required } = props;
    return (
      <div>
        <input
          {...props}
          id={name}
          type="checkbox"
          class={className}
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        />
        {label && (
          <label for={name} class={labelClass}>
            {label} {required && <span>*</span>}
          </label>
        )}
        {error && <div id={`${name}-error`}>{error}</div>}
      </div>
    );
  }
);
