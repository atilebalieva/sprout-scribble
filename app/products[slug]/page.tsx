import ProductType from "@/components/products/product-type";
import { Separator } from "@/components/ui/separator";
import formatPrice from "@/lib/format-price";
import { db } from "@/server";
import { productVariants } from "@/server/schema";
import { eq } from "drizzle-orm";

export async function generateStaticParams() {
  const data = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
    },
    orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  });
  if (data) {
    const slugID = data.map((variant) => ({ slug: variant.id.toString() }));
    return slugID;
  }
  return [];
}

export default async function Page({ params }: { params: { slug: string } }) {
  const variant = await db.query.productVariants.findFirst({
    where: eq(productVariants.id, Number(params.slug)),
    with: {
      product: {
        with: {
          /*   reviews: true, */
          productVariants: {
            with: { variantImages: true, variantTags: true },
          },
        },
      },
    },
  });

  console.log(variant);
  return (
    <main>
      Product page
      {/*  <section>
        <div className="flex-1">
          <p>Image</p>
        </div>
        <div className="flex  flex-col flex-1">
          <h2 className="text-2xl font-bold">{variant?.product.title}</h2>
          <div>
            <ProductType variants={variant.product.productVariants} />
          </div>
          <Separator className="my-2" />
          <p className="text-2xl font-medium py-2">{formatPrice(variant.product.price)}</p>
          <div dangerouslySetInnerHTML={{ __html: variant.product.description }}></div>
          <p className="text-secondary-foreground font-medium my-2">Available Colors</p>
        </div>
      </section> */}
    </main>
  );
}
