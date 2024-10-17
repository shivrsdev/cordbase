import Elysia, { t } from "elysia";
import { Database } from "./database";

export const handler = new Elysia()
  .post(
    "/:id",
    async ({ params, body, error }) => {
      await Database.create(params.id, body.data).catch((err: Error) => {
        console.error(err);
        return error(500); // Internal server error
      });
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        data: t.String(),
      }),
    }
  )
  .put(
    "/:id",
    async ({ params, body, error }) => {
      await Database.set(params.id, body.data).catch((err: Error) => {
        console.error(err);
        return error(500); // Internal server error
      });
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        data: t.Any(),
      }),
    }
  )
  .get(
    "/:id",
    async ({ params, error }) => {
      return await Database.get(params.id).catch((err: Error) => {
        console.error(err);
        return error(500); // Internal server error
      });
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .delete(
    "/:id",
    async ({ params, error }) => {
      await Database.delete(params.id).catch((err: Error) => {
        console.error(err);
        return error(500); // Internal server error
      });
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
