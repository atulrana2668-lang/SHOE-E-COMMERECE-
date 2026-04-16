import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { getProductById } from "@/lib/store-data";
import { ProductDetailPage } from "@/components/product-detail-page";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = getProductById(params.id);
  if (!product) {
    return { title: "Product Not Found | GOAT" };
  }

  return {
    title: `${product.name} | GOAT`,
    description: product.story
  };
}

export default function ProductRoute({ params }: Props) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
