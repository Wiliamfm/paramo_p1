import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { type RequestHandler } from '@builder.io/qwik-city';
import prisma from "~/db/prisma";
import { hashPassword } from "~/utils/helpers";

export const onRequest : RequestHandler = async requestEvent => {
  const password = "admin";

  const admin = await prisma.users.create({
    data: {
      name: "admin",
      email: "admin@test.com",
      password: await hashPassword(password),
    }
  })
  requestEvent.json(200, admin);
}

export const useGetUsers = routeLoader$(async () => {
  const users = await prisma.users.findMany();
  return users;
});

export default component$(() => {
  const users = useGetUsers();
  return (
    <section>
      <h1>User's directory</h1>
      <ul>
        {users.value?.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </section>
  );
});
