import { z } from '@builder.io/qwik-city';

export const loginRequestSchema = {
  email: z.string().email("The email address is badly formatted."),
  password: z.string(),
  //TODO: Uncomment this
  //password: z.string().min(8, "You password must have 8 characters or more.").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "The password is not valid"),
}
