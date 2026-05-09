export interface CategoryDef {
  slug: string;
  label: string;
  search: string;
}

export const PRODUCT_CATEGORIES: CategoryDef[] = [
  { slug: "monitores",      label: "Monitores",        search: "IPS"      },
  { slug: "mouse",          label: "Mouse",             search: "logitech" },
  { slug: "diademas",       label: "Diademas",          search: "diadema"  },
  { slug: "motherboards",   label: "Motherboards",      search: "B550"     },
  { slug: "almacenamiento", label: "Almacenamiento",    search: "disco"    },
  { slug: "impresoras",     label: "Impresoras",        search: "epson"    },
  { slug: "hp",             label: "Portátil HP",       search: "HP"       },
  { slug: "asus",           label: "Portátil ASUS",     search: "ASUS"     },
  { slug: "tplink",         label: "Redes TP-Link",     search: "TP-LINK"  },
];

export function getCategoryBySlug(slug: string): CategoryDef | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}
