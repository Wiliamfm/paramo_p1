import { component$ } from '@builder.io/qwik';
import { useForm, formAction$, valiForm$, required, minLength, email } from '@modular-forms/qwik';
import { TextInput } from '~/components/form/TextInput/text-input';
import * as v from 'valibot';
import { PrismaClient } from '@prisma/client'

const LoginSchema = v.object({
    email: v.string([
    v.minLength(1, 'Please enter your email.'),
    v.email('The email address is badly formatted.'),
  ]),
  password: v.string([
    v.minLength(1, 'Please enter your password.'),
    v.minLength(8, 'You password must have 8 characters or more.'),
    v.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "The password is not valid"),
  ]),
});

type LoginForm = v.Input<typeof LoginSchema>;

export default component$(() => {

  const useFormAction = formAction$<LoginForm>(async (values) => {
    console.log(values)
    const prisma = new PrismaClient();
    const users = await prisma.users.findMany();
    console.log(users);
  }, valiForm$(LoginSchema));

  const [, { Form, Field }] = useForm<LoginForm>({
    loader: { value: { email: '', password: '' } },
    action: useFormAction(),
    validate: valiForm$(LoginSchema),
  });

  return (
    <Form class="max-w-md mx-auto mt-8">
      <div class="relative z-0 w-full mb-5 group">
        <Field name="email" validate={[
          required<string>("Email is required"),
          email('The email address is badly formatted.'),
        ]} >
          {(field, props) => {
            return <TextInput 
              {...props}
              type="email"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              label="Email Address"
              labelClass="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              value={field.value}
              error={field.error}
              required
            />
          }}
        </Field>
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <Field name="password" validate={[
          required<string>("Password is required"),
          minLength(8, "Password must be at least 8 characters long"),
        ]} >
          {(field, props) => {
            return <TextInput
              {...props}
              type="password"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              label="Password"
              labelClass="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              value={field.value}
              error={field.error}
              required
              />
          }}
        </Field>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </Form>
  );
});
