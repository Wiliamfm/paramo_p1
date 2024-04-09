import { component$ } from '@builder.io/qwik';
import * as v from 'valibot';

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

  return (
    <div>
      <div data-tf-live="01HV32H5BWZDKVAC6T74SCKKDK"></div><script src="//embed.typeform.com/next/embed.js"></script></div>
  );
});
