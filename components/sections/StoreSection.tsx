import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { productImage, store } from "@/lib/content";

export function StoreSection() {
  return (
    <section aria-labelledby="store-eyebrow" className="@container">
      <Eyebrow id="store-eyebrow">{store.eyebrow}</Eyebrow>

      <div className="mt-4 flex flex-col gap-2 @3xl:flex-row @3xl:items-end @3xl:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="type-section">{store.heading}</h2>
          <p className="type-body max-w-[46ch]">{store.body}</p>
        </div>
        <Link
          href={store.cta.href}
          className="inline-flex min-h-11 items-center gap-2 self-start text-[0.9375rem] text-blue underline underline-offset-4 @3xl:self-auto"
        >
          {store.cta.label}
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
        </Link>
      </div>

      <ul className="mt-5 -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 @3xl:mx-0 @3xl:grid @3xl:grid-cols-4 @3xl:overflow-visible @3xl:px-0">
        {store.products.map((product) => (
          <li
            key={product.id}
            className="w-[58%] shrink-0 snap-start @3xl:w-auto @3xl:shrink"
          >
            <Link href={store.cta.href} className="flex flex-col gap-3">
              <Image
                src={productImage(product.name)}
                alt={`${product.name} from the ARRS store`}
                width={480}
                height={600}
                sizes="(min-width: 768px) 25vw, 58vw"
                className="w-full rounded-[var(--radius-card)] border border-hairline"
              />
              <span className="type-card">{product.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
