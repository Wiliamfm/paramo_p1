import { $, component$, QRL } from '@builder.io/qwik';
import { useForm, SubmitHandler } from '@modular-forms/qwik';
import {
  email,
  minLength,
  required,
} from '@modular-forms/qwik';
import { Checkbox } from '~/components/form/checkbox';
import { TextInput } from '~/components/form/text-input';

export default component$(() => {
  const [loginForm, { Form, Field }] = useForm<LoginForm>({
    loader: {
      value: {
        email: '',
        password: '',
        rememberMe: false
      }
    }
  });

  const handleSubmit: QRL<SubmitHandler<LoginForm>> = $((values, event) => {
    console.log(loginForm);
    if(loginForm.submitting){
      console.log("submitting");
      if(loginForm.submitted){
        console.log("submitted");
        alert(`Logged in ${JSON.stringify(values)}`);
      }
    }
  });

  return (
    <Form onSubmit$={handleSubmit} class="max-w-sm mx-auto mt-8">
      <div class="mb-5">
        <Field name="email" validate={[
          required<string>("Please enter your email."),
          email("The email address is baddly formatted.")
        ]}>
          {(field, props) => (
            <TextInput
              {...props}
              type="email"
              label="Email"
              name="email"
              inputClass="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              labelClass="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>
      </div>
      <div class="mb-5">
        <Field name="password" validate={[
          required<string>("Please enter your email."),
          minLength(8, "The password must have 8 characters or more.")
        ]}>
          {(field, props) => (
            <TextInput
              {...props}
              type="password"
              label="Password"
              name="password"
              inputClass="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              labelClass="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>
      </div>
      <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
          <Field name="rememberMe" type="boolean">
            {(field, props) => (
              <Checkbox
                {...props}
                label="Remember me"
                name="rememberMe"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                labelClass="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                value={field.value ?? false}
                error={field.error}
                required
              />
            )}
          </Field>
        </div>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </Form>
  );
});
