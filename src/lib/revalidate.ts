import { revalidatePath } from "next/cache";

/** Po zapisie w panelu odświeża całą stronę, żeby zmiana była widoczna od razu. */
export const revalidateSite = () => {
  try {
    revalidatePath("/", "layout");
  } catch {
    // poza serwerem Next (np. skrypt seed) nie ma czego odświeżać
  }
};

export const revalidateHooks = {
  afterChange: [({ doc }: { doc: unknown }) => { revalidateSite(); return doc; }],
  afterDelete: [({ doc }: { doc: unknown }) => { revalidateSite(); return doc; }],
};

export { siteUrl } from "./site-url";
