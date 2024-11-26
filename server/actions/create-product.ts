"use server";

import { ProductSchema } from "@/types/products-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { products } from "../schema";

const action = createSafeActionClient();

export const createProduct = action(ProductSchema, async ({ description, price, id, title }) => {
  try {
    if (id) {
      const currentProduct = db.query.products.findFirst({
        where: eq(products.id, id),
      });

      if (!currentProduct) return { error: "Product not found" };

      const editedProduct = await db
        .update(products)
        .set({ description, title, price })
        .where(eq(products.id, id))
        .returning();

      return { success: `Product ${editedProduct[0]}has been created` };
    }
    if (!id) {
      const newProduct = await db.insert(products).values({ description, price, title }).returning();
      /*   revalidatePath("/dashboard/products"); */
      return { success: `Product ${newProduct[0].title} has been created` };
    }
  } catch (err) {
    return { error: "Failed to create product" };
  }
});
