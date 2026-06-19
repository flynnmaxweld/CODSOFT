import { useState } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  Home,
  Compass,
  ChevronRight,
  ChevronLeft,
  Star,
  Plus,
  Minus,
  MapPin,
  CreditCard,
  Check,
  ArrowRight,
  X,
  SlidersHorizontal,
  Truck,
  Package,
  Shield,
  Settings,
  Bell,
  Award,
  LogOut,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Screen =
  | "home"
  | "collections"
  | "explorer"
  | "product"
  | "story"
  | "wishlist"
  | "bag"
  | "checkout"
  | "tracking"
  | "profile";

interface Product {
  id: number;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  material: string;
  weight: string;
  dimensions: string;
}

interface BagItem {
  product: Product;
  quantity: number;
}

type NavigateFn = (screen: Screen, product?: Product) => void;

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Arc Ceramic Mug",
    tagline: "Handcrafted for morning rituals",
    description:
      "Each mug is individually thrown on a wheel from high-fire stoneware. The Arc's subtle asymmetry celebrates the human hand while remaining precise enough for daily use. Dishwasher safe, microwave ready.",
    price: 68,
    category: "Daily Carry",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=700&fit=crop&auto=format",
    ],
    rating: 4.9,
    reviews: 234,
    isNew: true,
    material: "High-fire stoneware",
    weight: "310 g",
    dimensions: "8.5 × 9.5 cm",
  },
  {
    id: 2,
    name: "Field Cardholder",
    tagline: "Vegetable-tanned leather, built to age",
    description:
      "Cut from a single piece of full-grain Horween leather. The Field Cardholder develops a rich patina with use. Holds six cards and a folded bill without compromising its 5mm profile.",
    price: 120,
    category: "Daily Carry",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=600&h=700&fit=crop&auto=format",
    ],
    rating: 4.8,
    reviews: 189,
    material: "Full-grain Horween leather",
    weight: "28 g",
    dimensions: "9.0 × 6.5 × 0.5 cm",
  },
  {
    id: 3,
    name: "Studio Headphones",
    tagline: "Precision audio for focused work",
    description:
      "Closed-back circumaural design with 40 mm custom drivers tuned for extended listening. The aluminum arc adjusts silently to fit any head shape. 36-hour battery life.",
    price: 389,
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=700&fit=crop&auto=format",
    ],
    rating: 4.9,
    reviews: 412,
    material: "Aluminum, memory foam, protein leather",
    weight: "290 g",
    dimensions: "19 × 17 × 8 cm",
  },
  {
    id: 4,
    name: "Linen Notebook",
    tagline: "140 gsm Japanese paper, thread-bound",
    description:
      "A5 format with 192 pages of 140 gsm Tomoe River paper. The thread-bound spine lies completely flat when open. Belgian linen cover in four seasonal tones.",
    price: 48,
    category: "Workspace",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=700&fit=crop&auto=format",
    ],
    rating: 4.7,
    reviews: 156,
    material: "Belgian linen, Tomoe River paper",
    weight: "240 g",
    dimensions: "21.0 × 14.8 × 1.2 cm",
  },
  {
    id: 5,
    name: "Meridian Watch",
    tagline: "Swiss movement, sapphire crystal",
    description:
      "A 38 mm case in brushed Grade 5 titanium. The sunray-finished dial shifts from warm morning light to cool evening shadow. Swiss automatic movement, 80-hour power reserve.",
    price: 890,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=600&h=700&fit=crop&auto=format",
    ],
    rating: 5.0,
    reviews: 78,
    isNew: true,
    material: "Grade 5 titanium, sapphire crystal",
    weight: "68 g",
    dimensions: "38 mm case · 9.4 mm height",
  },
  {
    id: 6,
    name: "Journey Pack",
    tagline: "Carry-on ready, always",
    description:
      "20 L daypack in 1000D Cordura with YKK zippers throughout. Internal organization designed for three days of thoughtful travel. Fits under any airline seat.",
    price: 265,
    category: "Travel",
    image:
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&h=700&fit=crop&auto=format",
    ],
    rating: 4.8,
    reviews: 203,
    material: "1000D Cordura, YKK zippers",
    weight: "680 g",
    dimensions: "46 × 28 × 16 cm · 20 L",
  },
  {
    id: 7,
    name: "Arch Desk Lamp",
    tagline: "Articulated light for deep work",
    description:
      "CNC-machined 6061-T6 aluminum body with 2700–5500 K adjustable color temperature. Magnetic base, 360° rotation, touch dimmer. 50,000-hour LED lifespan.",
    price: 340,
    category: "Workspace",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=700&fit=crop&auto=format",
    ],
    rating: 4.6,
    reviews: 91,
    material: "6061-T6 aluminum, borosilicate diffuser",
    weight: "1.2 kg",
    dimensions: "42 cm arm · 18 cm base",
  },
  {
    id: 8,
    name: "Forma Earbuds",
    tagline: "Wireless audio, refined",
    description:
      "10 mm custom drivers with adaptive noise cancellation. The charging case is machined from a single billet of anodized aluminum. 8 + 32 hours battery life.",
    price: 299,
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=700&fit=crop&auto=format",
    ],
    rating: 4.8,
    reviews: 334,
    isNew: true,
    material: "Anodized aluminum case, silicone tips",
    weight: "5.4 g per earbud",
    dimensions: "Case: 6.5 × 4.5 × 3.0 cm",
  },
];

const COLLECTIONS = [
  {
    id: 1,
    name: "Daily Carry",
    description: "Objects for every hour of the day",
    count: 24,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "Travel",
    description: "Thoughtful companions for the journey",
    count: 18,
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Workspace",
    description: "A considered environment for deep work",
    count: 31,
    image:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: 4,
    name: "Audio",
    description: "Sound as it was meant to be heard",
    count: 12,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: 5,
    name: "Accessories",
    description: "The details that define your day",
    count: 27,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop&auto=format",
  },
];

const fmt = (price: number) => `$${price.toLocaleString()}`;

// ─── StatusBar ────────────────────────────────────────────────────────────────

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-7 pt-3 pb-1 flex-shrink-0">
      <span className="text-[13px] font-semibold text-[#1D1D1F] tracking-tight">9:41</span>
      <div className="flex items-center gap-2">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="#1D1D1F">
          <rect x="0" y="4" width="3" height="7" rx="0.8" />
          <rect x="4.5" y="2.5" width="3" height="8.5" rx="0.8" />
          <rect x="9" y="1" width="3" height="10" rx="0.8" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.8" opacity="0.3" />
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="#1D1D1F">
          <path d="M8 8.5a1.5 1.5 0 1 0 0 2.5 1.5 1.5 0 0 0 0-2.5z" />
          <path
            d="M8 5.5C5.8 5.5 3.8 6.5 2.4 8l1.3 1.3C4.7 8.2 6.3 7.3 8 7.3s3.3.9 4.3 2L13.6 8C12.2 6.5 10.2 5.5 8 5.5z"
            opacity="0.65"
          />
          <path
            d="M8 2C4.4 2 1.2 3.6-1 6.2l1.3 1.3C2.3 5.2 5 3.8 8 3.8s5.7 1.4 7.7 3.7L17 6.2C14.8 3.6 11.6 2 8 2z"
            opacity="0.3"
          />
        </svg>
        <div className="flex items-center gap-[2px]">
          <div className="w-[22px] h-[11px] rounded-[3px] border border-[#1D1D1F]/35 relative flex items-center px-[2px]">
            <div className="h-[7px] rounded-[1.5px] bg-[#1D1D1F]" style={{ width: "80%" }} />
          </div>
          <div className="w-[1.5px] h-[4px] rounded-full bg-[#1D1D1F] opacity-35" />
        </div>
      </div>
    </div>
  );
}

// ─── BottomNav ─────────────────────────────────────────────────────────────────

function BottomNav({
  current,
  onNav,
  bagCount,
}: {
  current: Screen;
  onNav: NavigateFn;
  bagCount: number;
}) {
  const tabs = [
    { id: "home" as Screen, Icon: Home, label: "Home" },
    { id: "collections" as Screen, Icon: Compass, label: "Discover" },
    { id: "explorer" as Screen, Icon: Search, label: "Search" },
    { id: "wishlist" as Screen, Icon: Heart, label: "Saved" },
    { id: "bag" as Screen, Icon: ShoppingBag, label: "Bag" },
  ];

  return (
    <div className="flex-shrink-0 border-t border-[#E5E5E7] bg-[#F5F5F7]/96 pb-5 pt-2">
      <div className="flex justify-around px-1">
        {tabs.map(({ id, Icon, label }) => {
          const active = current === id;
          return (
            <button
              key={id}
              onClick={() => onNav(id)}
              className="flex flex-col items-center gap-0.5 py-1 px-2.5 min-w-0"
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={active ? 2.2 : 1.5}
                  className={active ? "text-[#1D1D1F]" : "text-[#8E8E93]"}
                />
                {id === "bag" && bagCount > 0 && (
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#0071E3] rounded-full flex items-center justify-center">
                    <span className="text-white text-[9px] font-bold leading-none">{bagCount}</span>
                  </div>
                )}
              </div>
              <span
                className={`text-[10px] font-medium leading-none ${
                  active ? "text-[#1D1D1F]" : "text-[#8E8E93]"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── ProductCard ──────────────────────────────────────────────────────────────

function ProductCard({
  product,
  onPress,
  wishlisted,
  onWishlist,
}: {
  product: Product;
  onPress: () => void;
  wishlisted: boolean;
  onWishlist: () => void;
}) {
  return (
    <div className="flex flex-col cursor-pointer" onClick={onPress}>
      <div className="relative rounded-[20px] overflow-hidden bg-[#EBEBEB] aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlist();
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/85 rounded-full flex items-center justify-center"
        >
          <Heart
            size={13}
            strokeWidth={1.8}
            className={wishlisted ? "fill-[#1D1D1F] text-[#1D1D1F]" : "text-[#1D1D1F]"}
          />
        </button>
        {product.isNew && (
          <div className="absolute top-2.5 left-2.5 bg-[#0071E3] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
            New
          </div>
        )}
      </div>
      <div className="mt-2.5 px-0.5">
        <div className="text-[13px] font-semibold text-[#1D1D1F] leading-tight">{product.name}</div>
        <div className="text-[11px] text-[#6E6E73] leading-tight mt-0.5 line-clamp-1">{product.tagline}</div>
        <div className="text-[14px] font-bold text-[#1D1D1F] mt-1.5">{fmt(product.price)}</div>
      </div>
    </div>
  );
}

// ─── HomeScreen ───────────────────────────────────────────────────────────────

function HomeScreen({
  navigate,
  wishlist,
  toggleWishlist,
}: {
  navigate: NavigateFn;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
}) {
  const newArrivals = PRODUCTS.filter((p) => p.isNew);
  const curated = PRODUCTS.slice(1, 5);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#F5F5F7]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3">
        <span className="text-[26px] font-black text-[#1D1D1F] tracking-[-0.5px]">FORMA</span>
        <button className="w-9 h-9 flex items-center justify-center" onClick={() => navigate("explorer")}>
          <Search size={19} strokeWidth={1.6} className="text-[#1D1D1F]" />
        </button>
      </div>

      {/* Hero */}
      <div className="mx-4 rounded-[28px] overflow-hidden relative" style={{ height: 370 }}>
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=700&fit=crop&auto=format"
          alt="FORMA lifestyle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="text-white/65 text-[10px] font-semibold tracking-[0.15em] uppercase mb-2">
            Featured Collection
          </div>
          <h1 className="text-white text-[26px] font-bold leading-[1.15] mb-2 tracking-tight">
            Designed for<br />everyday life.
          </h1>
          <p className="text-white/75 text-[13px] leading-relaxed mb-4">
            Thoughtfully curated products for work,<br />travel and daily living.
          </p>
          <button
            onClick={() => navigate("collections")}
            className="inline-flex items-center gap-2 bg-white text-[#1D1D1F] text-[13px] font-semibold px-4 py-2.5 rounded-full"
          >
            Explore Collection
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* New Arrivals */}
      <div className="mt-8">
        <div className="flex items-center justify-between px-5 mb-4">
          <h2 className="text-[19px] font-bold text-[#1D1D1F] tracking-tight">New Arrivals</h2>
          <button
            onClick={() => navigate("explorer")}
            className="text-[#0071E3] text-[13px] font-medium"
          >
            See All
          </button>
        </div>
        <div className="flex gap-3.5 overflow-x-auto px-5 pb-1 scrollbar-hide">
          {newArrivals.map((p) => (
            <div key={p.id} className="flex-shrink-0 w-[148px]">
              <ProductCard
                product={p}
                onPress={() => navigate("product", p)}
                wishlisted={wishlist.includes(p.id)}
                onWishlist={() => toggleWishlist(p.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Collection Banner */}
      <div
        className="mx-4 mt-7 rounded-[28px] overflow-hidden relative cursor-pointer"
        style={{ height: 190 }}
        onClick={() => navigate("collections")}
      >
        <img
          src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=400&fit=crop&auto=format"
          alt="Workspace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          <div className="text-white/60 text-[10px] font-semibold tracking-[0.15em] uppercase mb-1">
            The Collection
          </div>
          <div className="text-white text-[22px] font-bold tracking-tight">Workspace</div>
          <div className="text-white/70 text-[13px] mt-0.5">31 curated objects</div>
        </div>
        <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <ArrowRight size={14} className="text-white" />
        </div>
      </div>

      {/* Curated Picks */}
      <div className="mt-8">
        <div className="flex items-center justify-between px-5 mb-4">
          <h2 className="text-[19px] font-bold text-[#1D1D1F] tracking-tight">Curated Picks</h2>
          <button
            onClick={() => navigate("explorer")}
            className="text-[#0071E3] text-[13px] font-medium"
          >
            Browse
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 px-4">
          {curated.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onPress={() => navigate("product", p)}
              wishlisted={wishlist.includes(p.id)}
              onWishlist={() => toggleWishlist(p.id)}
            />
          ))}
        </div>
      </div>

      {/* Product Story Teaser */}
      <div
        className="mx-4 mt-7 rounded-[28px] overflow-hidden relative cursor-pointer"
        style={{ height: 220 }}
        onClick={() => navigate("story")}
      >
        <img
          src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=450&fit=crop&auto=format"
          alt="Product story"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          <div className="text-white/60 text-[10px] font-semibold tracking-[0.15em] uppercase mb-1.5">
            Product Story
          </div>
          <div className="text-white text-[22px] font-bold leading-tight tracking-tight">
            Designed with<br />purpose.
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="text-white text-[13px] font-medium">Read the story</span>
            <ChevronRight size={14} className="text-white" />
          </div>
        </div>
      </div>

      {/* Collections */}
      <div className="mt-8">
        <div className="flex items-center justify-between px-5 mb-4">
          <h2 className="text-[19px] font-bold text-[#1D1D1F] tracking-tight">Collections</h2>
        </div>
        <div className="flex gap-2.5 overflow-x-auto px-5 pb-1 scrollbar-hide">
          {COLLECTIONS.map((col) => (
            <button
              key={col.id}
              onClick={() => navigate("collections")}
              className="flex-shrink-0 rounded-2xl overflow-hidden relative"
              style={{ width: 110, height: 74 }}
            >
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 flex items-end p-2.5">
                <span className="text-white text-[12px] font-semibold leading-tight">{col.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="mt-8 mb-6">
        <div className="flex items-center justify-between px-5 mb-4">
          <h2 className="text-[19px] font-bold text-[#1D1D1F] tracking-tight">Recently Viewed</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-1 scrollbar-hide">
          {PRODUCTS.slice(2, 7).map((p) => (
            <button
              key={p.id}
              onClick={() => navigate("product", p)}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 w-[72px]"
            >
              <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden bg-[#EBEBEB]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[10px] text-[#6E6E73] text-center leading-tight line-clamp-2">{p.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CollectionsScreen ────────────────────────────────────────────────────────

function CollectionsScreen({ navigate }: { navigate: NavigateFn }) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#F5F5F7]">
      <div className="px-5 pt-2 pb-5">
        <h1 className="text-[30px] font-black text-[#1D1D1F] tracking-[-0.5px]">Collections</h1>
        <p className="text-[14px] text-[#6E6E73] mt-1">Objects, organized by intention.</p>
      </div>

      <div className="px-4 flex flex-col gap-3 pb-6">
        {COLLECTIONS.map((col, i) => (
          <div
            key={col.id}
            onClick={() => navigate("explorer")}
            className="rounded-[28px] overflow-hidden relative cursor-pointer"
            style={{ height: i === 0 ? 280 : 180 }}
          >
            <img
              src={col.image}
              alt={col.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/15 to-transparent" />
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <div className="text-white/60 text-[10px] font-semibold tracking-[0.15em] uppercase mb-1.5">
                {col.count} Objects
              </div>
              <h2
                className="text-white font-bold leading-tight tracking-tight"
                style={{ fontSize: i === 0 ? 26 : 20 }}
              >
                {col.name}
              </h2>
              <p className="text-white/70 text-[13px] mt-1">{col.description}</p>
              <div className="flex items-center gap-1.5 mt-3">
                <span className="text-white text-[13px] font-medium">Explore</span>
                <ArrowRight size={13} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ExplorerScreen ───────────────────────────────────────────────────────────

function ExplorerScreen({
  navigate,
  wishlist,
  toggleWishlist,
}: {
  navigate: NavigateFn;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");

  const filters = ["All", "Daily Carry", "Audio", "Workspace", "Travel", "Accessories"];

  const filtered = PRODUCTS.filter((p) => {
    const q = query.toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q);
    const matchF = active === "All" || p.category === active;
    return matchQ && matchF;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#F5F5F7] overflow-hidden">
      {/* Sticky header */}
      <div className="flex-shrink-0 px-4 pt-2 pb-3 bg-[#F5F5F7]">
        <div className="flex items-center gap-2.5 bg-white rounded-2xl px-4 py-3 shadow-sm">
          <Search size={15} strokeWidth={1.8} className="text-[#8E8E93] flex-shrink-0" />
          <input
            className="flex-1 text-[15px] text-[#1D1D1F] bg-transparent outline-none placeholder-[#8E8E93]"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <X size={15} className="text-[#8E8E93]" />
            </button>
          )}
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                active === f ? "bg-[#1D1D1F] text-white" : "bg-white text-[#6E6E73]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] text-[#6E6E73]">{filtered.length} products</span>
          <button className="flex items-center gap-1.5 text-[13px] font-medium text-[#1D1D1F]">
            <SlidersHorizontal size={13} />
            Sort
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 pb-6">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onPress={() => navigate("product", p)}
              wishlisted={wishlist.includes(p.id)}
              onWishlist={() => toggleWishlist(p.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ProductDetailScreen ──────────────────────────────────────────────────────

function ProductDetailScreen({
  product,
  navigate,
  wishlist,
  toggleWishlist,
  addToBag,
}: {
  product: Product;
  navigate: NavigateFn;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  addToBag: (p: Product) => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [tab, setTab] = useState("Overview");
  const tabs = ["Overview", "Features", "Materials", "Reviews"];
  const wishlisted = wishlist.includes(product.id);

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Image */}
      <div className="relative flex-shrink-0" style={{ height: 360 }}>
        <img
          src={product.images[imgIdx] || product.image}
          alt={product.name}
          className="w-full h-full object-cover bg-[#EBEBEB]"
        />
        {/* Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <button
            onClick={() => navigate("explorer")}
            className="w-9 h-9 bg-white/82 rounded-full flex items-center justify-center"
          >
            <ChevronLeft size={18} strokeWidth={2} className="text-[#1D1D1F]" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className="w-9 h-9 bg-white/82 rounded-full flex items-center justify-center"
            >
              <Heart
                size={15}
                strokeWidth={1.8}
                className={wishlisted ? "fill-[#1D1D1F] text-[#1D1D1F]" : "text-[#1D1D1F]"}
              />
            </button>
          </div>
        </div>
        {/* Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`rounded-full transition-all ${
                  i === imgIdx
                    ? "w-5 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="p-5">
          {product.isNew && (
            <div className="text-[#0071E3] text-[11px] font-bold tracking-[0.12em] uppercase mb-2">
              New
            </div>
          )}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h1 className="text-[22px] font-bold text-[#1D1D1F] leading-tight tracking-tight">
                {product.name}
              </h1>
              <p className="text-[14px] text-[#6E6E73] mt-1">{product.tagline}</p>
            </div>
            <div className="text-[22px] font-bold text-[#1D1D1F] flex-shrink-0">
              {fmt(product.price)}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-[#1D1D1F] text-[#1D1D1F]"
                      : "text-[#E5E5E7]"
                  }
                />
              ))}
            </div>
            <span className="text-[12px] text-[#6E6E73]">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Tabs */}
          <div className="flex mt-5 border-b border-[#E5E5E7]">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-2.5 mr-5 text-[13px] font-semibold border-b-2 transition-colors ${
                  tab === t
                    ? "border-[#1D1D1F] text-[#1D1D1F]"
                    : "border-transparent text-[#8E8E93]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-4 pb-4">
            {tab === "Overview" && (
              <div>
                <p className="text-[14px] text-[#1D1D1F] leading-relaxed">{product.description}</p>
                <div className="mt-5 space-y-3">
                  {[
                    "Premium craftsmanship throughout",
                    "Built to outlast fast-fashion products",
                    "Thoughtfully designed for daily use",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#F5F5F7] flex items-center justify-center flex-shrink-0">
                        <Check size={10} strokeWidth={2.5} className="text-[#1D1D1F]" />
                      </div>
                      <span className="text-[13px] text-[#1D1D1F]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === "Features" && (
              <div className="space-y-4">
                {[
                  {
                    title: "Precision engineered",
                    desc: "Every tolerance specified to the tenth of a millimeter.",
                  },
                  {
                    title: "Sustainably sourced",
                    desc: "Materials selected for longevity and minimal environmental footprint.",
                  },
                  {
                    title: "Lifetime guarantee",
                    desc: "We stand behind every object we sell, unconditionally and forever.",
                  },
                ].map((f) => (
                  <div key={f.title} className="pb-4 border-b border-[#F0F0F0] last:border-0">
                    <div className="text-[14px] font-semibold text-[#1D1D1F] mb-1">{f.title}</div>
                    <div className="text-[13px] text-[#6E6E73] leading-relaxed">{f.desc}</div>
                  </div>
                ))}
              </div>
            )}
            {tab === "Materials" && (
              <div>
                {[
                  { label: "Material", value: product.material },
                  { label: "Weight", value: product.weight },
                  { label: "Dimensions", value: product.dimensions },
                  { label: "Origin", value: "Made in Japan" },
                  { label: "Warranty", value: "Lifetime" },
                  { label: "Care", value: "Refer to included card" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between py-3 border-b border-[#F0F0F0] last:border-0"
                  >
                    <span className="text-[13px] text-[#6E6E73]">{row.label}</span>
                    <span className="text-[13px] font-medium text-[#1D1D1F] text-right max-w-[55%]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {tab === "Reviews" && (
              <div>
                <div className="flex items-center gap-4 pb-4 border-b border-[#F0F0F0]">
                  <div className="text-[48px] font-black text-[#1D1D1F] leading-none">
                    {product.rating}
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className="fill-[#1D1D1F] text-[#1D1D1F]" />
                      ))}
                    </div>
                    <div className="text-[13px] text-[#6E6E73]">{product.reviews} reviews</div>
                  </div>
                </div>
                {[
                  {
                    name: "Alexandra M.",
                    rating: 5,
                    date: "2 weeks ago",
                    text: "Exceptional quality. Exactly as described, possibly better in person. It has become indispensable.",
                  },
                  {
                    name: "James T.",
                    rating: 5,
                    date: "1 month ago",
                    text: "Worth every penny. The craftsmanship is immediately apparent the moment you pick it up.",
                  },
                  {
                    name: "Mei L.",
                    rating: 4,
                    date: "6 weeks ago",
                    text: "Beautiful object. Packaging was equally considered — felt like opening something special.",
                  },
                ].map((r) => (
                  <div key={r.name} className="py-4 border-b border-[#F0F0F0] last:border-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[13px] font-semibold text-[#1D1D1F]">{r.name}</span>
                      <span className="text-[11px] text-[#8E8E93]">{r.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} size={11} className="fill-[#1D1D1F] text-[#1D1D1F]" />
                      ))}
                    </div>
                    <p className="text-[13px] text-[#6E6E73] leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add to Bag */}
      <div className="flex-shrink-0 border-t border-[#F0F0F0] p-4">
        <button
          onClick={() => {
            addToBag(product);
            navigate("bag");
          }}
          className="w-full bg-[#0071E3] text-white text-[15px] font-semibold py-4 rounded-2xl"
        >
          Add to Bag — {fmt(product.price)}
        </button>
      </div>
    </div>
  );
}

// ─── ProductStoryScreen ───────────────────────────────────────────────────────

function ProductStoryScreen({ navigate }: { navigate: NavigateFn }) {
  const sections = [
    {
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&auto=format",
      label: "Origins",
      headline: "Designed with purpose.",
      body: "Every FORMA object begins with a single question: what would this be if we removed everything unnecessary? The answer shapes everything that follows.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=500&fit=crop&auto=format",
      label: "Process",
      headline: "Built from premium materials.",
      body: "We work with a network of specialist makers — small ateliers in Japan, Portugal, and Scandinavia — who share our obsession with material honesty and precision.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=500&fit=crop&auto=format",
      label: "Philosophy",
      headline: "Crafted for daily use.",
      body: "Design is not decoration. A FORMA object should become invisible through use — so well-suited to its purpose that it disappears entirely into your day.",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#1C1C1E]">
      {/* Back */}
      <div className="sticky top-0 z-20 px-5 pt-3 pb-2">
        <button
          onClick={() => navigate("home")}
          className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center"
        >
          <ChevronLeft size={18} strokeWidth={2} className="text-white" />
        </button>
      </div>

      {sections.map((s, i) => (
        <div key={i}>
          <div className="relative" style={{ height: i === 0 ? 380 : 260 }}>
            <img
              src={s.image}
              alt={s.headline}
              className="w-full h-full object-cover bg-[#2C2C2E]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/20 to-transparent" />
          </div>
          <div className="px-6 pt-4 pb-8">
            <div className="text-[#6E6E73] text-[10px] font-semibold tracking-[0.18em] uppercase mb-3">
              {s.label}
            </div>
            <h2 className="text-white text-[26px] font-bold leading-tight tracking-tight mb-4">
              {s.headline}
            </h2>
            <p className="text-[#A1A1A6] text-[15px] leading-relaxed">{s.body}</p>
          </div>
          {i < sections.length - 1 && <div className="border-t border-white/8 mx-6" />}
        </div>
      ))}

      <div className="px-6 py-10 text-center">
        <div className="text-[#6E6E73] text-[13px] mb-4">Ready to explore?</div>
        <button
          onClick={() => navigate("collections")}
          className="bg-white text-[#1D1D1F] text-[15px] font-semibold px-8 py-3.5 rounded-2xl"
        >
          Browse Collections
        </button>
      </div>
    </div>
  );
}

// ─── WishlistScreen ───────────────────────────────────────────────────────────

function WishlistScreen({
  navigate,
  wishlist,
  toggleWishlist,
  addToBag,
}: {
  navigate: NavigateFn;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  addToBag: (p: Product) => void;
}) {
  const saved = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#F5F5F7]">
      <div className="px-5 pt-2 pb-5">
        <h1 className="text-[30px] font-black text-[#1D1D1F] tracking-[-0.5px]">Saved</h1>
        <p className="text-[14px] text-[#6E6E73] mt-1">
          {saved.length} {saved.length === 1 ? "item" : "items"}
        </p>
      </div>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <Heart size={36} className="text-[#E5E5E7] mb-4" strokeWidth={1.5} />
          <div className="text-[17px] font-semibold text-[#1D1D1F] mb-2">Nothing saved yet</div>
          <div className="text-[13px] text-[#6E6E73] mb-6">
            Items you save will appear here
          </div>
          <button
            onClick={() => navigate("explorer")}
            className="bg-[#0071E3] text-white text-[14px] font-semibold px-6 py-3 rounded-2xl"
          >
            Explore Products
          </button>
        </div>
      ) : (
        <div className="px-4 space-y-2.5 pb-6">
          {saved.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-[22px] overflow-hidden flex"
              style={{ height: 100 }}
            >
              <div
                className="w-24 flex-shrink-0 cursor-pointer bg-[#EBEBEB]"
                onClick={() => navigate("product", p)}
              >
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="text-[14px] font-semibold text-[#1D1D1F] line-clamp-1">{p.name}</div>
                  <div className="text-[12px] text-[#6E6E73] mt-0.5 line-clamp-1">{p.tagline}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-bold text-[#1D1D1F]">{fmt(p.price)}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleWishlist(p.id)}>
                      <Heart size={14} strokeWidth={1.8} className="fill-[#1D1D1F] text-[#1D1D1F]" />
                    </button>
                    <button
                      onClick={() => addToBag(p)}
                      className="bg-[#1D1D1F] text-white text-[11px] font-semibold px-3 py-1.5 rounded-xl"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── BagScreen ────────────────────────────────────────────────────────────────

function BagScreen({
  bag,
  updateQty,
  navigate,
}: {
  bag: BagItem[];
  updateQty: (id: number, delta: number) => void;
  navigate: NavigateFn;
}) {
  const subtotal = bag.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 12;
  const tax = Math.round(subtotal * 0.085);
  const total = subtotal + shipping + tax;

  return (
    <div className="flex-1 flex flex-col bg-[#F5F5F7] overflow-hidden">
      <div className="flex-shrink-0 px-5 pt-2 pb-4">
        <h1 className="text-[30px] font-black text-[#1D1D1F] tracking-[-0.5px]">Bag</h1>
        <p className="text-[14px] text-[#6E6E73] mt-1">
          {bag.reduce((s, i) => s + i.quantity, 0)} items
        </p>
      </div>

      {bag.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center pb-16 px-8 text-center">
          <ShoppingBag size={36} className="text-[#E5E5E7] mb-4" strokeWidth={1.5} />
          <div className="text-[17px] font-semibold text-[#1D1D1F] mb-2">Your bag is empty</div>
          <div className="text-[13px] text-[#6E6E73] mb-6">Add items from the store to get started</div>
          <button
            onClick={() => navigate("explorer")}
            className="bg-[#0071E3] text-white text-[14px] font-semibold px-6 py-3 rounded-2xl"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto scrollbar-hide px-4 space-y-2.5">
            {bag.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-[22px] overflow-hidden flex"
                style={{ height: 108 }}
              >
                <div className="w-28 flex-shrink-0 bg-[#EBEBEB]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <div className="text-[14px] font-semibold text-[#1D1D1F] line-clamp-1">
                      {item.product.name}
                    </div>
                    <div className="text-[11px] text-[#6E6E73] mt-0.5">{item.product.category}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-bold text-[#1D1D1F]">
                      {fmt(item.product.price * item.quantity)}
                    </span>
                    <div className="flex items-center bg-[#F5F5F7] rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQty(item.product.id, -1)}
                        className="w-7 h-7 flex items-center justify-center"
                      >
                        <Minus size={11} strokeWidth={2.5} className="text-[#1D1D1F]" />
                      </button>
                      <span className="text-[13px] font-bold text-[#1D1D1F] w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.product.id, 1)}
                        className="w-7 h-7 flex items-center justify-center"
                      >
                        <Plus size={11} strokeWidth={2.5} className="text-[#1D1D1F]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className="bg-white rounded-[22px] p-5 mt-1">
              <div className="text-[15px] font-bold text-[#1D1D1F] mb-4">Order Summary</div>
              {[
                { label: "Subtotal", value: fmt(subtotal) },
                { label: "Shipping", value: shipping === 0 ? "Free" : fmt(shipping) },
                { label: "Estimated tax", value: fmt(tax) },
              ].map((r) => (
                <div key={r.label} className="flex justify-between py-2">
                  <span className="text-[13px] text-[#6E6E73]">{r.label}</span>
                  <span className="text-[13px] font-medium text-[#1D1D1F]">{r.value}</span>
                </div>
              ))}
              <div className="border-t border-[#F0F0F0] pt-3 mt-1 flex justify-between">
                <span className="text-[15px] font-bold text-[#1D1D1F]">Total</span>
                <span className="text-[15px] font-bold text-[#1D1D1F]">{fmt(total)}</span>
              </div>
            </div>
            <div className="h-2" />
          </div>

          <div className="flex-shrink-0 border-t border-[#E5E5E7] p-4">
            <button
              onClick={() => navigate("checkout")}
              className="w-full bg-[#0071E3] text-white text-[15px] font-semibold py-4 rounded-2xl"
            >
              Checkout — {fmt(total)}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── CheckoutScreen ───────────────────────────────────────────────────────────

function CheckoutScreen({ navigate }: { navigate: NavigateFn }) {
  const [step, setStep] = useState(0);
  const steps = ["Shipping", "Payment", "Review"];

  return (
    <div className="flex-1 flex flex-col bg-[#F5F5F7] overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 flex items-center gap-2.5">
        <button onClick={() => navigate("bag")}>
          <ChevronLeft size={20} strokeWidth={2} className="text-[#0071E3]" />
        </button>
        <h1 className="text-[19px] font-bold text-[#1D1D1F]">Checkout</h1>
      </div>

      {/* Steps */}
      <div className="flex-shrink-0 px-5 pb-4">
        <div className="flex items-center">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold border-2 ${
                    i < step
                      ? "bg-[#0071E3] border-[#0071E3] text-white"
                      : i === step
                      ? "border-[#1D1D1F] text-[#1D1D1F]"
                      : "border-[#C7C7CC] text-[#C7C7CC]"
                  }`}
                >
                  {i < step ? <Check size={12} strokeWidth={2.5} /> : i + 1}
                </div>
                <span
                  className={`text-[11px] font-semibold ${
                    i <= step ? "text-[#1D1D1F]" : "text-[#C7C7CC]"
                  }`}
                >
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 mx-2 h-px ${i < step ? "bg-[#0071E3]" : "bg-[#E5E5E7]"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 space-y-3">
        {step === 0 && (
          <>
            <div className="bg-white rounded-[22px] p-5">
              <div className="text-[15px] font-bold text-[#1D1D1F] mb-4">Shipping Address</div>
              <div className="space-y-3">
                {[
                  { label: "Full name", ph: "Alexandra Moore" },
                  { label: "Address line 1", ph: "123 Design District" },
                  { label: "City", ph: "San Francisco" },
                  { label: "ZIP code", ph: "94102" },
                  { label: "Country", ph: "United States" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-[11px] text-[#6E6E73] font-semibold mb-1 block uppercase tracking-wide">
                      {f.label}
                    </label>
                    <input
                      className="w-full bg-[#F5F5F7] rounded-xl px-4 py-3 text-[14px] text-[#1D1D1F] outline-none"
                      placeholder={f.ph}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-[22px] p-5">
              <div className="text-[15px] font-bold text-[#1D1D1F] mb-4">Delivery Method</div>
              {[
                { label: "Standard", sub: "5–7 business days", price: "Free" },
                { label: "Express", sub: "2–3 business days", price: "$12" },
                { label: "Priority", sub: "Next business day", price: "$24" },
              ].map((opt, i) => (
                <div
                  key={opt.label}
                  className={`flex items-center gap-3 py-3.5 ${i > 0 ? "border-t border-[#F0F0F0]" : ""}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      i === 0 ? "border-[#0071E3]" : "border-[#C7C7CC]"
                    }`}
                  >
                    {i === 0 && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0071E3]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold text-[#1D1D1F]">{opt.label}</div>
                    <div className="text-[12px] text-[#6E6E73]">{opt.sub}</div>
                  </div>
                  <div className="text-[13px] font-semibold text-[#1D1D1F]">{opt.price}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <div className="bg-white rounded-[22px] p-5">
            <div className="text-[15px] font-bold text-[#1D1D1F] mb-4">Payment Method</div>
            <div className="flex items-center gap-3 bg-[#F0F8FF] rounded-xl p-4 mb-4">
              <div className="w-8 h-8 bg-[#0071E3] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[14px] font-bold"></span>
              </div>
              <span className="text-[14px] font-semibold text-[#1D1D1F]">Apple Pay</span>
              <div className="ml-auto w-5 h-5 rounded-full bg-[#0071E3] flex items-center justify-center">
                <Check size={11} strokeWidth={2.5} className="text-white" />
              </div>
            </div>
            <div className="text-[13px] text-[#6E6E73] text-center mb-4">or pay with card</div>
            {[
              { label: "Card number", ph: "**** **** **** 4242" },
              { label: "Expiry date", ph: "MM / YY" },
              { label: "CVV", ph: "•••" },
              { label: "Name on card", ph: "Alexandra Moore" },
            ].map((f) => (
              <div key={f.label} className="mb-3">
                <label className="text-[11px] text-[#6E6E73] font-semibold mb-1 block uppercase tracking-wide">
                  {f.label}
                </label>
                <input
                  className="w-full bg-[#F5F5F7] rounded-xl px-4 py-3 text-[14px] text-[#1D1D1F] outline-none"
                  placeholder={f.ph}
                />
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <>
            <div className="bg-white rounded-[22px] p-5">
              <div className="text-[15px] font-bold text-[#1D1D1F] mb-4">Order Summary</div>
              {[
                { label: "Studio Headphones × 1", value: "$389" },
                { label: "Shipping", value: "Free" },
                { label: "Tax", value: "$33.07" },
              ].map((r) => (
                <div key={r.label} className="flex justify-between py-2">
                  <span className="text-[13px] text-[#6E6E73]">{r.label}</span>
                  <span className="text-[13px] font-medium text-[#1D1D1F]">{r.value}</span>
                </div>
              ))}
              <div className="border-t border-[#F0F0F0] pt-3 mt-1 flex justify-between">
                <span className="text-[15px] font-bold text-[#1D1D1F]">Total</span>
                <span className="text-[15px] font-bold text-[#1D1D1F]">$422.07</span>
              </div>
            </div>
            <div className="bg-white rounded-[22px] p-5">
              <div className="text-[15px] font-bold text-[#1D1D1F] mb-3">Delivery to</div>
              <div className="text-[13px] text-[#6E6E73]">Alexandra Moore</div>
              <div className="text-[13px] text-[#6E6E73]">123 Design District</div>
              <div className="text-[13px] text-[#6E6E73]">San Francisco, CA 94102</div>
            </div>
            <div className="flex items-center gap-2 px-1 pb-2">
              <Shield size={13} className="text-[#8E8E93]" strokeWidth={1.6} />
              <span className="text-[11px] text-[#8E8E93]">
                256-bit SSL encryption. Your data is safe.
              </span>
            </div>
          </>
        )}
        <div className="h-2" />
      </div>

      <div className="flex-shrink-0 border-t border-[#E5E5E7] p-4">
        <button
          onClick={() => {
            if (step < 2) setStep(step + 1);
            else navigate("tracking");
          }}
          className="w-full bg-[#0071E3] text-white text-[15px] font-semibold py-4 rounded-2xl"
        >
          {step === 2 ? "Place Order" : "Continue"}
        </button>
      </div>
    </div>
  );
}

// ─── OrderTrackingScreen ──────────────────────────────────────────────────────

function OrderTrackingScreen({ navigate }: { navigate: NavigateFn }) {
  const milestones = [
    {
      label: "Order Confirmed",
      sub: "June 14, 2025 at 10:23 AM",
      done: true,
      active: false,
    },
    { label: "Preparing", sub: "June 14, 2025 at 11:00 AM", done: true, active: false },
    { label: "Packed", sub: "June 14, 2025 at 2:30 PM", done: true, active: false },
    { label: "Shipped", sub: "June 15, 2025 — In transit", done: false, active: true },
    { label: "Delivered", sub: "Estimated June 17, 2025", done: false, active: false },
  ];

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#F5F5F7]">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-2.5 flex-shrink-0">
        <button onClick={() => navigate("profile")}>
          <ChevronLeft size={20} strokeWidth={2} className="text-[#0071E3]" />
        </button>
        <h1 className="text-[19px] font-bold text-[#1D1D1F]">Order Tracking</h1>
      </div>

      {/* Hero card */}
      <div className="mx-4 bg-white rounded-[28px] overflow-hidden mb-4">
        <div className="relative" style={{ height: 150 }}>
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=300&fit=crop&auto=format"
            alt="Order"
            className="w-full h-full object-cover bg-[#EBEBEB]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/72 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <div className="text-white/60 text-[10px] font-semibold uppercase tracking-widest">
              Order #FM-2847
            </div>
            <div className="text-white text-[17px] font-bold mt-0.5">Studio Headphones</div>
          </div>
        </div>
        <div className="px-5 py-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#6E6E73] uppercase tracking-wider font-semibold mb-0.5">
              Estimated delivery
            </div>
            <div className="text-[16px] font-bold text-[#1D1D1F]">Tuesday, June 17</div>
          </div>
          <div className="bg-[#EDF4FF] text-[#0071E3] text-[12px] font-bold px-3.5 py-1.5 rounded-xl">
            In Transit
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mx-4 bg-white rounded-[28px] p-5 mb-4">
        <div className="text-[15px] font-bold text-[#1D1D1F] mb-5">Tracking Timeline</div>
        {milestones.map((m, i) => (
          <div key={m.label} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  m.done
                    ? "bg-[#1D1D1F] border-[#1D1D1F]"
                    : m.active
                    ? "border-[#0071E3] bg-white"
                    : "border-[#E5E5E7] bg-white"
                }`}
              >
                {m.done && <Check size={10} strokeWidth={2.5} className="text-white" />}
                {m.active && <div className="w-2 h-2 rounded-full bg-[#0071E3]" />}
              </div>
              {i < milestones.length - 1 && (
                <div
                  className={`w-px my-1 flex-1 ${m.done ? "bg-[#1D1D1F]" : "bg-[#E5E5E7]"}`}
                  style={{ minHeight: 28 }}
                />
              )}
            </div>
            <div className="flex-1 pb-5 last:pb-0">
              <div
                className={`text-[14px] font-semibold ${
                  m.done || m.active ? "text-[#1D1D1F]" : "text-[#C7C7CC]"
                }`}
              >
                {m.label}
              </div>
              <div
                className={`text-[12px] mt-0.5 ${
                  m.done || m.active ? "text-[#6E6E73]" : "text-[#C7C7CC]"
                }`}
              >
                {m.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carrier */}
      <div className="mx-4 bg-white rounded-[28px] p-5 mb-6">
        <div className="text-[15px] font-bold text-[#1D1D1F] mb-4">Carrier Information</div>
        {[
          { Icon: Truck, label: "Carrier", value: "DHL Express" },
          { Icon: Package, label: "Tracking #", value: "1Z999AA10123456784" },
          { Icon: MapPin, label: "Destination", value: "San Francisco, CA 94102" },
        ].map(({ Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-3 py-3 border-b border-[#F0F0F0] last:border-0"
          >
            <Icon size={15} strokeWidth={1.6} className="text-[#8E8E93] flex-shrink-0" />
            <span className="text-[13px] text-[#6E6E73] w-20 flex-shrink-0">{label}</span>
            <span className="text-[13px] font-medium text-[#1D1D1F] flex-1 truncate">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ProfileScreen ────────────────────────────────────────────────────────────

function ProfileScreen({ navigate }: { navigate: NavigateFn }) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#F5F5F7]">
      {/* Avatar + info */}
      <div className="bg-white px-5 pt-4 pb-5">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8E8E93] to-[#48484A] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[24px] font-bold">A</span>
          </div>
          <div>
            <div className="text-[19px] font-bold text-[#1D1D1F]">Alexandra Moore</div>
            <div className="text-[13px] text-[#6E6E73]">Member since 2022 · Gold</div>
          </div>
        </div>
        <div className="flex bg-[#F5F5F7] rounded-2xl overflow-hidden">
          {[
            { val: "12", label: "Orders" },
            { val: "24", label: "Saved" },
            { val: "Gold", label: "Status" },
          ].map(({ val, label }, i) => (
            <div
              key={label}
              className={`flex-1 py-3.5 text-center ${i > 0 ? "border-l border-[#E5E5E7]" : ""}`}
            >
              <div className="text-[17px] font-bold text-[#1D1D1F]">{val}</div>
              <div className="text-[11px] text-[#6E6E73] mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Loyalty card */}
      <div className="mx-4 mt-4 bg-[#1C1C1E] rounded-[22px] p-5">
        <div className="flex items-center gap-2 mb-2.5">
          <Award size={15} strokeWidth={1.8} className="text-[#FFD700]" />
          <span className="text-white text-[14px] font-bold">FORMA Gold</span>
        </div>
        <div className="text-[#A1A1A6] text-[12px] mb-3">1,240 points · 260 to Platinum</div>
        <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
          <div className="h-full bg-[#FFD700] rounded-full" style={{ width: "82%" }} />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-white/35 text-[10px] font-medium">Gold</span>
          <span className="text-white/35 text-[10px] font-medium">Platinum at 1,500</span>
        </div>
      </div>

      {/* Menu */}
      {[
        {
          title: "Activity",
          items: [
            { Icon: Package, label: "My Orders", action: () => navigate("tracking") },
            { Icon: Heart, label: "Saved Items", action: () => navigate("wishlist") },
          ],
        },
        {
          title: "Account",
          items: [
            { Icon: MapPin, label: "Addresses", action: () => {} },
            { Icon: CreditCard, label: "Payment Methods", action: () => {} },
            { Icon: Bell, label: "Notifications", action: () => {} },
            { Icon: Settings, label: "Settings", action: () => {} },
          ],
        },
      ].map((section) => (
        <div key={section.title} className="mx-4 mt-4">
          <div className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-[0.1em] px-1 mb-2">
            {section.title}
          </div>
          <div className="bg-white rounded-[22px] overflow-hidden">
            {section.items.map(({ Icon, label, action }, i) => (
              <button
                key={label}
                onClick={action}
                className={`w-full flex items-center gap-3 px-5 py-4 text-left ${
                  i > 0 ? "border-t border-[#F5F5F7]" : ""
                }`}
              >
                <Icon size={17} strokeWidth={1.6} className="text-[#6E6E73] flex-shrink-0" />
                <span className="flex-1 text-[14px] text-[#1D1D1F]">{label}</span>
                <ChevronRight size={14} strokeWidth={1.8} className="text-[#C7C7CC]" />
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="mx-4 mt-4 mb-6">
        <div className="bg-white rounded-[22px] overflow-hidden">
          <button className="w-full flex items-center gap-3 px-5 py-4">
            <LogOut size={17} strokeWidth={1.6} className="text-[#FF3B30] flex-shrink-0" />
            <span className="text-[14px] font-medium text-[#FF3B30]">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [wishlist, setWishlist] = useState<number[]>([1, 3]);
  const [bag, setBag] = useState<BagItem[]>([{ product: PRODUCTS[2], quantity: 1 }]);

  const navigate: NavigateFn = (newScreen, product) => {
    if (product) setSelectedProduct(product);
    setScreen(newScreen);
  };

  const toggleWishlist = (id: number) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const addToBag = (product: Product) =>
    setBag((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      return [...prev, { product, quantity: 1 }];
    });

  const updateQty = (id: number, delta: number) =>
    setBag((prev) =>
      prev
        .map((i) =>
          i.product.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
        )
        .filter((i) => i.quantity > 0)
    );

  const bagCount = bag.reduce((s, i) => s + i.quantity, 0);
  const mainNavScreens: Screen[] = ["home", "collections", "explorer", "wishlist", "bag"];
  const showNav = mainNavScreens.includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return (
          <HomeScreen navigate={navigate} wishlist={wishlist} toggleWishlist={toggleWishlist} />
        );
      case "collections":
        return <CollectionsScreen navigate={navigate} />;
      case "explorer":
        return (
          <ExplorerScreen
            navigate={navigate}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        );
      case "product":
        return (
          <ProductDetailScreen
            product={selectedProduct}
            navigate={navigate}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            addToBag={addToBag}
          />
        );
      case "story":
        return <ProductStoryScreen navigate={navigate} />;
      case "wishlist":
        return (
          <WishlistScreen
            navigate={navigate}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            addToBag={addToBag}
          />
        );
      case "bag":
        return <BagScreen bag={bag} updateQty={updateQty} navigate={navigate} />;
      case "checkout":
        return <CheckoutScreen navigate={navigate} />;
      case "tracking":
        return <OrderTrackingScreen navigate={navigate} />;
      case "profile":
        return <ProfileScreen navigate={navigate} />;
    }
  };

  return (
    <div
      className="min-h-screen flex items-start justify-center py-8"
      style={{ background: "linear-gradient(135deg, #DCDCE0 0%, #C8C8CC 100%)" }}
    >
      {/* Phone frame */}
      <div className="relative flex-shrink-0" style={{ width: 393, height: 852 }}>
        {/* Titanium outer */}
        <div
          className="absolute inset-0 rounded-[54px]"
          style={{
            background:
              "linear-gradient(145deg, #3A3A3C 0%, #2C2C2E 40%, #1C1C1E 100%)",
            boxShadow:
              "0 50px 100px rgba(0,0,0,0.5), 0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        />
        {/* Bezel ring */}
        <div
          className="absolute inset-[1.5px] rounded-[53px]"
          style={{
            background: "linear-gradient(145deg, #2C2C2E 0%, #1C1C1E 100%)",
          }}
        />
        {/* Screen glass */}
        <div
          className="absolute inset-[10px] rounded-[44px] overflow-hidden flex flex-col"
          style={{ background: "#F5F5F7" }}
        >
          {/* Dynamic Island */}
          <div className="relative flex-shrink-0 h-[50px] flex justify-center items-center">
            <div
              className="w-[120px] h-[34px] bg-black rounded-full z-10"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.05)" }}
            />
          </div>

          {/* Status bar */}
          <StatusBar />

          {/* Screen area */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {renderScreen()}
          </div>

          {/* Bottom nav or home indicator */}
          {showNav ? (
            <BottomNav current={screen} onNav={navigate} bagCount={bagCount} />
          ) : (
            <div className="flex-shrink-0 flex justify-center pb-2 pt-1 bg-inherit">
              <div className="w-32 h-1 bg-black/20 rounded-full" />
            </div>
          )}
        </div>

        {/* Side buttons */}
        <div className="absolute left-[-2.5px] top-[145px] w-[2.5px] h-[30px] bg-[#3A3A3C] rounded-l-sm" />
        <div className="absolute left-[-2.5px] top-[196px] w-[2.5px] h-[58px] bg-[#3A3A3C] rounded-l-sm" />
        <div className="absolute left-[-2.5px] top-[264px] w-[2.5px] h-[58px] bg-[#3A3A3C] rounded-l-sm" />
        <div className="absolute right-[-2.5px] top-[190px] w-[2.5px] h-[78px] bg-[#3A3A3C] rounded-r-sm" />
      </div>
    </div>
  );
}
