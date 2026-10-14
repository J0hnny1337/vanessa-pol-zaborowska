import type { Access, CollectionConfig } from "payload";

type Role = { role?: string; id?: string | number } | null | undefined;
const isAdmin: Access = ({ req }) => (req.user as Role)?.role === "admin";
// Administrator widzi wszystkich, redaktor tylko swoje konto („Moje konto”).
const adminOrSelf: Access = ({ req }) => {
  const u = req.user as Role;
  if (!u) return false;
  return u.role === "admin" ? true : { id: { equals: u.id } };
};

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Użytkownik", plural: "Użytkownicy" },
  admin: {
    useAsTitle: "email",
    group: "Ustawienia",
    description: "Osoby, które mogą logować się do panelu. Gdy ktoś zapomni hasła, ustaw mu nowe tutaj.",
    hidden: ({ user }) => (user as Role)?.role !== "admin",
  },
  access: { read: adminOrSelf, update: adminOrSelf, create: isAdmin, delete: isAdmin },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 30, // sesja 30 dni
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    cookies: { secure: process.env.NODE_ENV === "production", sameSite: "Lax" },
  },
  hooks: {
    // Pierwsze konto w panelu zawsze jest administratorem.
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (operation === "create") {
          const { totalDocs } = await req.payload.count({ collection: "users" });
          if (totalDocs === 0) return { ...data, role: "admin" };
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "role", label: "Rola", type: "select", required: true, defaultValue: "editor",
      access: { update: ({ req }) => (req.user as Role)?.role === "admin" },
      options: [
        { label: "Administrator", value: "admin" },
        { label: "Redaktor (artystka)", value: "editor" },
      ],
    },
  ],
};
