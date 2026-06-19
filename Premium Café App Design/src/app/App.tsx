import { useState, useRef } from "react";
import {
  Home, Search, Heart, ShoppingBag, User, Star,
  ChevronLeft, Plus, Minus, X, CheckCircle,
  Calendar, CreditCard, Smartphone, Banknote,
  Clock, MapPin, Bell, ArrowRight, SlidersHorizontal,
  ChevronRight, Award, Check, Coffee,
} from "lucide-react";

// ─── PALETTE ────────────────────────────────────────────────────────────────
const P = {
  bg: "#F7F3EE",
  surface: "#FFFFFF",
  text: "#1F1F1F",
  muted: "#6B7280",
  brown: "#5C4635",
  gold: "#B08D57",
  border: "#E7E1D8",
  soft: "#F0EBE3",
};

// ─── TYPES ───────────────────────────────────────────────────────────────────
type Screen =
  | "landing" | "home" | "menu" | "category" | "product"
  | "favorites" | "cart" | "checkout" | "tracking" | "profile" | "reservation";

interface Item {
  id: number; name: string; cat: string; desc: string;
  price: number; rating: number; reviews: number;
  cal: number; time: string; img: string; tags: string[];
  featured?: boolean; trending?: boolean; ingredients?: string;
}

interface CartEntry { item: Item; qty: number; size: "S" | "M" | "L"; addons: string[]; }

// ─── DATA ────────────────────────────────────────────────────────────────────
const MENU: Item[] = [
  { id:1,  name:"Espresso",           cat:"coffee",    desc:"Pure, concentrated with rich crema and bold volcanic character.", price:3.50, rating:4.9, reviews:1240, cal:5,   time:"3 min",  img:"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&h=500&fit=crop&auto=format", tags:["Popular","Quick"], featured:true, ingredients:"Single-origin Ethiopian beans, filtered water" },
  { id:2,  name:"Cappuccino",         cat:"coffee",    desc:"Velvety steamed milk meets fine espresso — a morning essential.", price:5.50, rating:4.8, reviews:980,  cal:120, time:"5 min",  img:"https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&h=500&fit=crop&auto=format", tags:["Bestseller"], featured:true, trending:true, ingredients:"Espresso, whole milk, steamed foam" },
  { id:3,  name:"Oat Milk Latte",     cat:"coffee",    desc:"Smooth espresso with creamy oat milk — our most-loved ritual.", price:6.00, rating:4.7, reviews:2100, cal:150, time:"5 min",  img:"https://images.unsplash.com/photo-1561882468-9110d70d0b8d?w=500&h=500&fit=crop&auto=format", tags:["Vegan","Bestseller"], featured:true, ingredients:"Espresso, organic oat milk, hint of vanilla" },
  { id:4,  name:"Cold Brew",          cat:"coffee",    desc:"18-hour steep. Silky, naturally sweet, with low acidity.", price:6.50, rating:4.9, reviews:870,  cal:10,  time:"1 min",  img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop&auto=format", tags:["Cold","Popular"], trending:true, ingredients:"Coarse-ground Kenyan beans, cold-filtered water" },
  { id:5,  name:"Flat White",         cat:"coffee",    desc:"Double ristretto with microfoam — intense coffee, compact form.", price:5.50, rating:4.8, reviews:650,  cal:110, time:"4 min",  img:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop&auto=format", tags:["Strong"], ingredients:"Double ristretto, steamed microfoam milk" },
  { id:6,  name:"Americano",          cat:"coffee",    desc:"Espresso diluted with hot water. Bold, clean, endlessly drinkable.", price:4.00, rating:4.6, reviews:540,  cal:15,  time:"3 min",  img:"https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=500&h=500&fit=crop&auto=format", tags:["Classic"], ingredients:"Double espresso, hot water" },
  { id:7,  name:"Midnight Mocha",     cat:"signature", desc:"Dark chocolate ganache, double espresso, Madagascar vanilla cream.", price:8.50, rating:4.9, reviews:1560, cal:280, time:"7 min",  img:"https://images.unsplash.com/photo-1713919956905-918a8d14bf4a?w=500&h=500&fit=crop&auto=format", tags:["Signature","Rich"], featured:true, ingredients:"Valrhona 70% ganache, espresso, vanilla bean cream" },
  { id:8,  name:"Lune Affogato",      cat:"signature", desc:"House espresso over Madagascan vanilla gelato with salted caramel.", price:9.00, rating:4.9, reviews:890,  cal:320, time:"5 min",  img:"https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&h=500&fit=crop&auto=format", tags:["Signature","Dessert"], featured:true, trending:true, ingredients:"Espresso, vanilla gelato, salted caramel drizzle" },
  { id:9,  name:"Hazelnut Dream",     cat:"signature", desc:"Toasted hazelnut praline, single-origin espresso, blonde oat foam.", price:8.00, rating:4.8, reviews:720,  cal:240, time:"6 min",  img:"https://images.unsplash.com/photo-1770123024506-e24e3e55db31?w=500&h=500&fit=crop&auto=format", tags:["Signature","Nutty"], ingredients:"Hazelnut praline, espresso, oat milk, nutmeg" },
  { id:10, name:"Vanilla Bean Latte", cat:"signature", desc:"Whole vanilla bean–infused milk, signature blend, cinnamon dusted.", price:7.50, rating:4.7, reviews:630,  cal:210, time:"6 min",  img:"https://images.unsplash.com/photo-1762657440603-2afa5580eaf8?w=500&h=500&fit=crop&auto=format", tags:["Signature","Sweet"], ingredients:"Espresso, vanilla bean–steeped milk, cinnamon" },
  { id:11, name:"Butter Croissant",   cat:"bakery",    desc:"72 layers of laminated dough, baked golden each morning.", price:4.50, rating:4.8, reviews:1890, cal:290, time:"Ready", img:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=500&fit=crop&auto=format", tags:["Fresh","Popular"], featured:true, trending:true, ingredients:"Butter, flour, yeast, salt, egg wash" },
  { id:12, name:"Almond Croissant",   cat:"bakery",    desc:"Twice-baked with almond frangipane and toasted sliced almonds.", price:5.50, rating:4.9, reviews:1240, cal:380, time:"Ready", img:"https://images.unsplash.com/photo-1623334044303-241021148842?w=500&h=500&fit=crop&auto=format", tags:["Bestseller","Nutty"], trending:true, ingredients:"Croissant, almond cream, toasted almonds, powdered sugar" },
  { id:13, name:"Cinnamon Roll",      cat:"bakery",    desc:"Soft-baked with brown butter icing and Vietnamese cinnamon.", price:5.00, rating:4.7, reviews:760,  cal:410, time:"Ready", img:"https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=500&h=500&fit=crop&auto=format", tags:["Warm","Sweet"], ingredients:"Brioche dough, cinnamon, brown butter, cream cheese icing" },
  { id:14, name:"Banana Bread",       cat:"bakery",    desc:"Moist loaf with roasted banana, dark chocolate, walnut crunch.", price:4.00, rating:4.6, reviews:430,  cal:340, time:"Ready", img:"https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=500&h=500&fit=crop&auto=format", tags:["Wholesome"], ingredients:"Banana, whole wheat flour, dark chocolate, walnuts" },
  { id:15, name:"Classic Cheesecake", cat:"desserts",  desc:"New York-style, baked slow with cream cheese, lemon, digestive crust.", price:7.50, rating:4.8, reviews:980,  cal:450, time:"Ready", img:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&h=500&fit=crop&auto=format", tags:["Classic","Popular"], featured:true, ingredients:"Cream cheese, eggs, lemon zest, digestive biscuit crust" },
  { id:16, name:"Dark Chocolate Tart",cat:"desserts",  desc:"Valrhona 70% ganache in salted butter pastry shell with gold leaf.", price:8.50, rating:4.9, reviews:1120, cal:520, time:"Ready", img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=500&fit=crop&auto=format", tags:["Signature","Rich"], trending:true, ingredients:"Valrhona chocolate, butter, cream, sea salt, gold leaf" },
  { id:17, name:"Tiramisu",           cat:"desserts",  desc:"Espresso-soaked ladyfingers with mascarpone, dusted with cacao.", price:8.00, rating:4.9, reviews:1450, cal:480, time:"Ready", img:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=500&fit=crop&auto=format", tags:["Bestseller","Italian"], featured:true, ingredients:"Mascarpone, ladyfingers, espresso, Marsala, cacao" },
  { id:18, name:"Fudge Brownie",      cat:"desserts",  desc:"Dense, rich, barely-set with sea salt flakes and walnut pieces.", price:5.50, rating:4.7, reviews:870,  cal:380, time:"Ready", img:"https://images.unsplash.com/photo-1548365328-8c6db3220d4f?w=500&h=500&fit=crop&auto=format", tags:["Popular"], ingredients:"Dark chocolate, butter, eggs, walnuts, sea salt" },
  { id:19, name:"Mango Smoothie",     cat:"beverages", desc:"Alphonso mango, coconut yogurt, and a squeeze of fresh lime.", price:6.50, rating:4.6, reviews:540,  cal:180, time:"4 min",  img:"https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&h=500&fit=crop&auto=format", tags:["Fresh","Vegan"], ingredients:"Mango, coconut yogurt, lime, agave" },
  { id:20, name:"Citrus Lemonade",    cat:"beverages", desc:"Freshly squeezed lemon, yuzu, sparkling water with mint.", price:5.50, rating:4.7, reviews:680,  cal:90,  time:"3 min",  img:"https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500&h=500&fit=crop&auto=format", tags:["Refreshing"], ingredients:"Lemon, yuzu, sparkling water, mint, cane sugar" },
  { id:21, name:"Peach Iced Tea",     cat:"beverages", desc:"Cold-steeped Darjeeling with white peach and honeysuckle syrup.", price:5.00, rating:4.5, reviews:320,  cal:70,  time:"2 min",  img:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&h=500&fit=crop&auto=format", tags:["Cold","Light"], ingredients:"Darjeeling tea, white peach, honeysuckle, ice" },
  { id:22, name:"Avocado Toast",      cat:"meals",     desc:"Toasted sourdough with smashed avocado, poached egg, chilli flakes.", price:12.00, rating:4.7, reviews:760, cal:380, time:"8 min",  img:"https://images.unsplash.com/photo-1603046891746-5adbf5a71b13?w=500&h=500&fit=crop&auto=format", tags:["Healthy","Popular"], featured:true, ingredients:"Sourdough, avocado, egg, lemon, microgreens" },
  { id:23, name:"Truffle Pasta",      cat:"meals",     desc:"Fresh tagliatelle with black truffle cream, parmesan, fresh herbs.", price:16.00, rating:4.8, reviews:540, cal:520, time:"15 min", img:"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&h=500&fit=crop&auto=format", tags:["Premium"], ingredients:"Tagliatelle, black truffle, cream, parmesan, thyme" },
  { id:24, name:"Caesar Salad",       cat:"meals",     desc:"Romaine, house caesar dressing, anchovy croutons, aged parmesan.", price:13.00, rating:4.6, reviews:430, cal:320, time:"10 min", img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop&auto=format", tags:["Light","Classic"], ingredients:"Romaine, parmesan, anchovy dressing, croutons" },
];

const CATS = [
  { id:"all",       label:"All",       emoji:"✨" },
  { id:"coffee",    label:"Coffee",    emoji:"☕" },
  { id:"signature", label:"Signature", emoji:"⭐" },
  { id:"bakery",    label:"Bakery",    emoji:"🥐" },
  { id:"desserts",  label:"Desserts",  emoji:"🍰" },
  { id:"beverages", label:"Drinks",    emoji:"🍹" },
  { id:"meals",     label:"Meals",     emoji:"🍝" },
];

const SIZE_LABEL: Record<string, string> = { S: "Small", M: "Medium", L: "Large" };
const SIZE_PRICE: Record<string, number> = { S: 0, M: 0.5, L: 1.0 };
const ADDONS = [
  "Extra Shot +$0.75", "Almond Milk +$0.50", "Oat Milk +$0.50",
  "Whipped Cream +$0.50", "Soy Milk +$0.50", "Extra Sugar free",
];

// ─── SHARED UI ───────────────────────────────────────────────────────────────
function Stars({ rating, size: sz = 10 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={sz}
          fill={i <= Math.round(rating) ? P.gold : "none"}
          stroke={i <= Math.round(rating) ? P.gold : "#C9BAA5"}
        />
      ))}
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium"
      style={{ background: P.soft, color: P.brown }}>
      {label}
    </span>
  );
}

function StatusBar({ light = false }: { light?: boolean }) {
  const col = light ? "white" : P.text;
  const borderCol = light ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.55)";
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 flex-shrink-0">
      <span className="text-[13px] font-semibold tracking-tight" style={{ color: col }}>9:41</span>
      {/* Dynamic island pill */}
      <div className="w-[120px] h-[34px] rounded-full flex items-center justify-center"
        style={{ background: "#000" }} />
      <div className="flex items-center gap-1" style={{ color: col }}>
        {/* Signal */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <rect x="0"    y="7"   width="2.5" height="4"   rx="0.4" fill={col} />
          <rect x="3.5"  y="4.5" width="2.5" height="6.5" rx="0.4" fill={col} />
          <rect x="7"    y="2"   width="2.5" height="9"   rx="0.4" fill={col} />
          <rect x="10.5" y="0"   width="2.5" height="11"  rx="0.4" fill={col} />
        </svg>
        {/* WiFi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <circle cx="7.5" cy="9.5" r="1.2" fill={col} />
          <path d="M4.8 6.8C5.6 6 6.5 5.5 7.5 5.5s1.9.5 2.7 1.3" stroke={col} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          <path d="M2 4C3.7 2.3 5.5 1.3 7.5 1.3s3.8 1 5.5 2.7" stroke={col} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        </svg>
        {/* Battery */}
        <div className="flex items-center gap-[1px]">
          <div className="relative w-[22px] h-[11px] rounded-[2.5px]"
            style={{ border: `1.5px solid ${borderCol}` }}>
            <div className="absolute inset-[1px] rounded-[1.5px]"
              style={{ width: "80%", background: col }} />
          </div>
          <div className="w-[2px] h-[5px] rounded-r-[1px]"
            style={{ background: borderCol }} />
        </div>
      </div>
    </div>
  );
}

function HomeIndicator() {
  return (
    <div className="flex justify-center py-2 flex-shrink-0">
      <div className="w-[130px] h-[5px] rounded-full" style={{ background: "rgba(0,0,0,0.18)" }} />
    </div>
  );
}

// FavBtn is always standalone — never placed inside another <button>
function FavBtn({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={e => { e.stopPropagation(); onToggle(); }}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90"
      style={{ background: active ? "#FFF1F1" : P.soft }}>
      <Heart size={16} fill={active ? "#E85D5D" : "none"} stroke={active ? "#E85D5D" : P.muted} />
    </button>
  );
}

function BackBtn({ onPress }: { onPress: () => void }) {
  return (
    <button onClick={onPress}
      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)" }}>
      <ChevronLeft size={20} strokeWidth={2} color={P.text} />
    </button>
  );
}

// Uses div[role=button] so FavBtn (a <button>) inside is never nested in a <button>
function MenuCard({ item, onPress, fav, onFav }: {
  item: Item; onPress: () => void; fav: boolean; onFav: () => void;
}) {
  return (
    <div
      onClick={onPress}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onPress()}
      className="rounded-2xl overflow-hidden flex-shrink-0 transition-transform active:scale-[0.98] cursor-pointer select-none"
      style={{ background: P.surface, border: `1px solid ${P.border}`, width: 180 }}>
      <div className="relative" style={{ height: 140 }}>
        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          <FavBtn active={fav} onToggle={onFav} />
        </div>
        {item.tags[0] && (
          <div className="absolute bottom-2 left-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ background: "rgba(255,255,255,0.92)", color: P.brown }}>
              {item.tags[0]}
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="font-semibold text-[13px] leading-tight mb-0.5" style={{ color: P.text }}>{item.name}</p>
        <div className="flex items-center gap-1 mb-2">
          <Stars rating={item.rating} />
          <span className="text-[10px]" style={{ color: P.muted }}>{item.rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-[14px]" style={{ color: P.brown }}>${item.price.toFixed(2)}</span>
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: P.brown }}>
            <Plus size={14} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Uses div[role=button] so FavBtn inside is never nested in a <button>
function ListCard({ item, onPress, fav, onFav }: {
  item: Item; onPress: () => void; fav: boolean; onFav: () => void;
}) {
  return (
    <div
      onClick={onPress}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onPress()}
      className="flex items-center gap-3 w-full rounded-2xl p-3 transition-transform active:scale-[0.98] cursor-pointer select-none"
      style={{ background: P.surface, border: `1px solid ${P.border}` }}>
      <img src={item.img} alt={item.name} className="rounded-xl object-cover flex-shrink-0"
        style={{ width: 72, height: 72 }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 mb-0.5">
          {item.tags.slice(0, 1).map(t => <Chip key={t} label={t} />)}
        </div>
        <p className="font-semibold text-[14px] leading-tight" style={{ color: P.text }}>{item.name}</p>
        <p className="text-[12px] leading-snug mt-0.5 line-clamp-1" style={{ color: P.muted }}>{item.desc}</p>
        <div className="flex items-center gap-2 mt-1">
          <Stars rating={item.rating} />
          <span className="text-[10px]" style={{ color: P.muted }}>{item.reviews.toLocaleString()} reviews</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <FavBtn active={fav} onToggle={onFav} />
        <span className="font-bold text-[14px]" style={{ color: P.brown }}>${item.price.toFixed(2)}</span>
      </div>
    </div>
  );
}

// Uses div[role=button] so FavBtn inside is never nested in a <button>
function GridCard({ item, onPress, fav, onFav }: {
  item: Item; onPress: () => void; fav: boolean; onFav: () => void;
}) {
  return (
    <div
      onClick={onPress}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onPress()}
      className="rounded-2xl overflow-hidden transition-transform active:scale-[0.97] cursor-pointer select-none"
      style={{ background: P.surface, border: `1px solid ${P.border}` }}>
      <div className="relative" style={{ height: 130 }}>
        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          <FavBtn active={fav} onToggle={onFav} />
        </div>
      </div>
      <div className="p-3">
        <p className="font-semibold text-[13px] leading-tight mb-1" style={{ color: P.text }}>{item.name}</p>
        <div className="flex items-center gap-1 mb-1.5">
          <Stars rating={item.rating} />
          <span className="text-[10px]" style={{ color: P.muted }}>{item.rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-[14px]" style={{ color: P.brown }}>${item.price.toFixed(2)}</span>
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: P.soft }}>
            <Plus size={12} color={P.brown} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CatChip({ cat, active, onPress }: {
  cat: typeof CATS[0]; active: boolean; onPress: () => void;
}) {
  return (
    <button onClick={onPress}
      className="flex items-center gap-1.5 px-4 py-2 rounded-full flex-shrink-0 transition-all active:scale-95 text-[13px] font-medium"
      style={{
        background: active ? P.brown : P.surface,
        color: active ? "white" : P.text,
        border: `1px solid ${active ? P.brown : P.border}`,
      }}>
      <span>{cat.emoji}</span>
      <span>{cat.label}</span>
    </button>
  );
}

// ─── BOTTOM NAV ──────────────────────────────────────────────────────────────
function BottomNav({ active, nav, cartCount }: {
  active: string; nav: (s: Screen) => void; cartCount: number;
}) {
  const tabs = [
    { id: "home",      icon: Home,        label: "Home" },
    { id: "menu",      icon: Coffee,      label: "Menu" },
    { id: "favorites", icon: Heart,       label: "Saved" },
    { id: "cart",      icon: ShoppingBag, label: "Cart" },
    { id: "profile",   icon: User,        label: "Profile" },
  ];
  return (
    <div className="flex-shrink-0 flex items-center px-2 pt-2 pb-1"
      style={{ background: P.surface, borderTop: `1px solid ${P.border}` }}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        return (
          <button key={tab.id} onClick={() => nav(tab.id as Screen)}
            className="flex-1 flex flex-col items-center gap-1 py-1 relative">
            <div className="relative">
              <tab.icon
                size={22}
                strokeWidth={isActive ? 2.2 : 1.6}
                color={isActive ? P.brown : P.muted}
              />
              {tab.id === "cart" && cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-2 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                  style={{ background: P.gold }}>
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px]"
              style={{ color: isActive ? P.brown : P.muted, fontWeight: isActive ? 600 : 400 }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── SCREEN 1: LANDING ───────────────────────────────────────────────────────
function LandingScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="relative flex-1 flex flex-col">
      <div className="absolute inset-0 bg-stone-900">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=1000&fit=crop&auto=format"
          alt="LUNE café"
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg,rgba(0,0,0,0.2) 0%,rgba(0,0,0,0) 35%,rgba(0,0,0,0.75) 100%)"
        }} />
      </div>

      <StatusBar light />

      <div className="relative z-10 flex-1 flex flex-col justify-between px-7 pb-10 pt-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
          <Coffee size={18} color="white" />
        </div>

        <div>
          <p className="text-[10px] tracking-[0.35em] uppercase mb-3"
            style={{ color: "rgba(255,255,255,0.5)" }}>
            Artisan Café · Est. 2019
          </p>
          <h1 className="font-light mb-3 text-white"
            style={{ fontSize: 68, lineHeight: 0.92, letterSpacing: -3 }}>
            LUNE
          </h1>
          <p className="text-[17px] font-light leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.72)" }}>
            Coffee. Conversations.<br />Evenings.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => nav("home")}
              className="w-full py-[18px] rounded-2xl font-semibold text-[15px] tracking-wide transition-transform active:scale-[0.98]"
              style={{ background: P.surface, color: P.text }}>
              Explore Menu
            </button>
            <button
              onClick={() => nav("reservation")}
              className="w-full py-[18px] rounded-2xl font-medium text-[15px] transition-transform active:scale-[0.98] text-white"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.28)",
                backdropFilter: "blur(10px)",
              }}>
              Reserve a Table
            </button>
          </div>
        </div>
      </div>

      <HomeIndicator />
    </div>
  );
}

// ─── SCREEN 2: HOME FEED ─────────────────────────────────────────────────────
function HomeScreen({ nav, favorites, toggleFav }: {
  nav: (s: Screen, item?: Item) => void;
  favorites: Set<number>;
  toggleFav: (id: number) => void;
}) {
  const featured = MENU.filter(m => m.featured);
  const trending = MENU.filter(m => m.trending);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar" style={{ background: P.bg }}>
      <StatusBar />

      {/* Header */}
      <div className="px-5 pt-2 pb-4 flex items-center justify-between">
        <div>
          <p className="text-[12px] font-medium mb-0.5" style={{ color: P.muted }}>Good evening ✨</p>
          <h2 className="text-[22px] font-semibold leading-tight" style={{ color: P.text }}>
            What would you<br />like today?
          </h2>
        </div>
        <button className="relative w-11 h-11 rounded-full flex items-center justify-center"
          style={{ background: P.surface, border: `1px solid ${P.border}` }}>
          <Bell size={20} color={P.text} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full" style={{ background: P.gold }} />
        </button>
      </div>

      {/* Hero card */}
      <div className="mx-5 rounded-3xl overflow-hidden mb-5 relative" style={{ height: 182 }}>
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&h=400&fit=crop&auto=format"
          alt="LUNE interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(120deg,rgba(92,70,53,0.88) 0%,rgba(92,70,53,0.3) 60%,transparent 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <span className="self-start px-3 py-1 rounded-full text-[11px] font-semibold text-white"
            style={{ background: P.gold }}>
            ⭐ Today&apos;s Special
          </span>
          <div>
            <p className="text-white font-bold text-[18px] leading-tight mb-1">Midnight Mocha</p>
            <p className="text-[12px] mb-3" style={{ color: "rgba(255,255,255,0.75)" }}>
              Dark chocolate · Double espresso
            </p>
            <button
              onClick={() => nav("product", MENU.find(m => m.id === 7)!)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold text-white"
              style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}>
              Order Now <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-[15px]" style={{ color: P.text }}>Categories</p>
          <button onClick={() => nav("menu")} className="text-[12px] font-medium" style={{ color: P.brown }}>
            See all
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {CATS.slice(1).map(cat => (
            <button key={cat.id} onClick={() => nav("category")}
              className="flex flex-col items-center gap-1.5 py-3 rounded-2xl transition-transform active:scale-95"
              style={{ background: P.surface, border: `1px solid ${P.border}` }}>
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-[10px] font-medium" style={{ color: P.text }}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      <div className="mb-5">
        <div className="flex items-center justify-between px-5 mb-3">
          <p className="font-semibold text-[15px]" style={{ color: P.text }}>Featured</p>
          <button className="text-[12px] font-medium" style={{ color: P.brown }}>See all</button>
        </div>
        <div className="flex gap-3 px-5 overflow-x-auto pb-1 no-scrollbar">
          {featured.map(item => (
            <MenuCard key={item.id} item={item}
              onPress={() => nav("product", item)}
              fav={favorites.has(item.id)}
              onFav={() => toggleFav(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className="px-5 mb-6">
        <p className="font-semibold text-[15px] mb-3" style={{ color: P.text }}>Trending Now 🔥</p>
        <div className="flex flex-col gap-3">
          {trending.slice(0, 3).map(item => (
            <ListCard key={item.id} item={item}
              onPress={() => nav("product", item)}
              fav={favorites.has(item.id)}
              onFav={() => toggleFav(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Reserve banner */}
      <div className="mx-5 mb-8 rounded-3xl overflow-hidden relative" style={{ height: 116 }}>
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700&h=300&fit=crop&auto=format"
          alt="LUNE dining" className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(31,20,12,0.65)" }} />
        <div className="absolute inset-0 flex items-center justify-between px-5">
          <div>
            <p className="text-white font-bold text-[16px]">Reserve Your Table</p>
            <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.7)" }}>Book the perfect evening</p>
          </div>
          <button onClick={() => nav("reservation")}
            className="px-4 py-2.5 rounded-full text-[13px] font-semibold text-white"
            style={{ background: P.gold }}>
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 3: MENU EXPLORER ─────────────────────────────────────────────────
function MenuScreen({ nav, favorites, toggleFav }: {
  nav: (s: Screen, item?: Item) => void;
  favorites: Set<number>;
  toggleFav: (id: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = MENU.filter(m => {
    const matchCat = activeCat === "all" || m.cat === activeCat;
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: P.bg }}>
      <StatusBar />

      <div className="px-5 pt-1 pb-3 flex-shrink-0">
        <h2 className="text-[22px] font-semibold mb-3" style={{ color: P.text }}>Our Menu</h2>
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl"
            style={{ background: P.surface, border: `1px solid ${P.border}` }}>
            <Search size={16} color={P.muted} />
            <input
              ref={inputRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search menu..."
              className="flex-1 bg-transparent text-[14px] outline-none"
              style={{ color: P.text }}
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={14} color={P.muted} />
              </button>
            )}
          </div>
          <button className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: P.brown }}>
            <SlidersHorizontal size={18} color="white" />
          </button>
        </div>
      </div>

      {/* Category strip */}
      <div className="flex gap-2 px-5 pb-3 overflow-x-auto flex-shrink-0 no-scrollbar">
        {CATS.map(cat => (
          <CatChip key={cat.id} cat={cat} active={activeCat === cat.id}
            onPress={() => setActiveCat(cat.id)} />
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 no-scrollbar">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Coffee size={40} color={P.border} />
            <p className="text-[15px] font-medium" style={{ color: P.muted }}>No items found</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 pt-1">
            {filtered.map(item => (
              <ListCard key={item.id} item={item}
                onPress={() => nav("product", item)}
                fav={favorites.has(item.id)}
                onFav={() => toggleFav(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SCREEN 4: CATEGORY VIEW ─────────────────────────────────────────────────
function CategoryScreen({ nav, goBack, favorites, toggleFav }: {
  nav: (s: Screen, item?: Item) => void;
  goBack: () => void;
  favorites: Set<number>;
  toggleFav: (id: number) => void;
}) {
  const [activeCat, setActiveCat] = useState("coffee");
  const [sort, setSort] = useState("popular");

  const items = MENU.filter(m => m.cat === activeCat);
  const sorted = [...items].sort((a, b) => {
    if (sort === "price_asc")  return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    if (sort === "newest")     return b.id - a.id;
    return b.reviews - a.reviews;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: P.bg }}>
      <StatusBar />

      <div className="px-5 pt-1 pb-3 flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <BackBtn onPress={goBack} />
          <h2 className="text-[20px] font-semibold" style={{ color: P.text }}>Browse</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CATS.slice(1).map(cat => (
            <CatChip key={cat.id} cat={cat} active={activeCat === cat.id}
              onPress={() => setActiveCat(cat.id)} />
          ))}
        </div>
      </div>

      {/* Sort chips */}
      <div className="flex gap-2 px-5 pb-3 overflow-x-auto flex-shrink-0 no-scrollbar">
        {[
          { id: "popular",    label: "Popular" },
          { id: "newest",     label: "Newest" },
          { id: "price_asc",  label: "Price ↑" },
          { id: "price_desc", label: "Price ↓" },
        ].map(s => (
          <button key={s.id} onClick={() => setSort(s.id)}
            className="px-4 py-1.5 rounded-full text-[12px] font-medium flex-shrink-0 transition-all"
            style={{
              background: sort === s.id ? P.gold : P.surface,
              color:      sort === s.id ? "white" : P.muted,
              border:    `1px solid ${sort === s.id ? P.gold : P.border}`,
            }}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 no-scrollbar">
        <div className="grid grid-cols-2 gap-3 pt-1">
          {sorted.map(item => (
            <GridCard key={item.id} item={item}
              onPress={() => nav("product", item)}
              fav={favorites.has(item.id)}
              onFav={() => toggleFav(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 5: PRODUCT DETAIL ─────────────────────────────────────────────────
function ProductScreen({ item, goBack, favorites, toggleFav, addToCart, nav }: {
  item: Item | null;
  goBack: () => void;
  favorites: Set<number>;
  toggleFav: (id: number) => void;
  addToCart: (item: Item, s: "S"|"M"|"L", a: string[], q: number) => void;
  nav: (s: Screen) => void;
}) {
  const [size, setSize] = useState<"S"|"M"|"L">("M");
  const [addons, setAddons] = useState<string[]>([]);
  const [qty, setQty] = useState(1);

  if (!item) return null;

  const toggleAddon = (a: string) =>
    setAddons(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  const totalPrice = (item.price + SIZE_PRICE[size]) * qty;

  return (
    // relative so the absolute bottom bar positions against this element
    <div className="flex-1 flex flex-col overflow-hidden relative">
      {/* Hero image — fixed height */}
      <div className="flex-shrink-0 relative" style={{ height: 300 }}>
        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0.38) 0%,transparent 50%,rgba(0,0,0,0.18) 100%)" }} />
        <div className="absolute top-0 left-0 right-0">
          <StatusBar light />
          <div className="flex items-center justify-between px-5 pt-1">
            <BackBtn onPress={goBack} />
            <FavBtn active={favorites.has(item.id)} onToggle={() => toggleFav(item.id)} />
          </div>
        </div>
        {item.tags[0] && (
          <div className="absolute bottom-4 left-5">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold text-white"
              style={{ background: P.gold }}>
              {item.tags[0]}
            </span>
          </div>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar rounded-t-3xl -mt-6 z-10 pb-28"
        style={{ background: P.surface }}>
        <div className="px-5 pt-5">
          {/* Title row */}
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-[22px] font-bold leading-tight flex-1 mr-4" style={{ color: P.text }}>
              {item.name}
            </h2>
            <span className="text-[22px] font-bold flex-shrink-0" style={{ color: P.brown }}>
              ${item.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Stars rating={item.rating} size={13} />
            <span className="text-[13px] font-semibold" style={{ color: P.text }}>{item.rating}</span>
            <span className="text-[12px]" style={{ color: P.muted }}>({item.reviews.toLocaleString()} reviews)</span>
          </div>

          <p className="text-[14px] leading-relaxed mb-5" style={{ color: P.muted }}>{item.desc}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { icon: "🔥", label: "Calories",  value: `${item.cal} kcal` },
              { icon: "⏱️", label: "Prep Time", value: item.time },
              { icon: "⭐", label: "Rating",    value: item.rating.toString() },
            ].map(stat => (
              <div key={stat.label} className="rounded-2xl p-3 text-center" style={{ background: P.soft }}>
                <p className="text-xl mb-1">{stat.icon}</p>
                <p className="text-[10px] mb-0.5" style={{ color: P.muted }}>{stat.label}</p>
                <p className="text-[12px] font-semibold" style={{ color: P.text }}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Ingredients */}
          {item.ingredients && (
            <div className="mb-5 p-4 rounded-2xl" style={{ background: P.soft }}>
              <p className="text-[12px] font-semibold mb-1" style={{ color: P.brown }}>Ingredients</p>
              <p className="text-[13px] leading-relaxed" style={{ color: P.muted }}>{item.ingredients}</p>
            </div>
          )}

          {/* Size */}
          <div className="mb-5">
            <p className="text-[15px] font-semibold mb-3" style={{ color: P.text }}>Size</p>
            <div className="flex gap-2">
              {(["S", "M", "L"] as const).map(s => (
                <button key={s} onClick={() => setSize(s)}
                  className="flex-1 py-3 rounded-2xl text-[13px] font-medium transition-all"
                  style={{
                    background: size === s ? P.brown : P.surface,
                    color:      size === s ? "white" : P.text,
                    border:    `1px solid ${size === s ? P.brown : P.border}`,
                  }}>
                  <span className="block">{SIZE_LABEL[s]}</span>
                  {s !== "S" && (
                    <span className="block text-[10px] opacity-70 mt-0.5">+${SIZE_PRICE[s].toFixed(2)}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div className="mb-5">
            <p className="text-[15px] font-semibold mb-3" style={{ color: P.text }}>Add-ons</p>
            <div className="flex flex-col gap-2">
              {ADDONS.map(a => {
                const selected = addons.includes(a);
                const [name, priceStr] = a.split(" +");
                return (
                  <button key={a} onClick={() => toggleAddon(a)}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl transition-all"
                    style={{
                      background: selected ? P.soft : P.surface,
                      border:    `1px solid ${selected ? P.brown : P.border}`,
                    }}>
                    <span className="text-[13px]" style={{ color: P.text }}>{name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[12px]" style={{ color: P.muted }}>
                        {priceStr ? `+$${priceStr}` : "free"}
                      </span>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: selected ? P.brown : P.border }}>
                        {selected && <Check size={11} color="white" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom bar — positions relative to the outer relative div */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-5 pb-6 pt-3 z-20"
        style={{ background: P.surface, borderTop: `1px solid ${P.border}` }}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl flex-shrink-0"
          style={{ background: P.soft }}>
          <button onClick={() => setQty(q => Math.max(1, q - 1))}
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: P.surface }}>
            <Minus size={13} color={P.text} />
          </button>
          <span className="text-[15px] font-semibold w-5 text-center" style={{ color: P.text }}>{qty}</span>
          <button onClick={() => setQty(q => q + 1)}
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: P.brown }}>
            <Plus size={13} color="white" />
          </button>
        </div>
        <button
          onClick={() => { addToCart(item, size, addons, qty); nav("cart"); }}
          className="flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold text-[15px] transition-transform active:scale-[0.98]"
          style={{ background: P.brown, color: "white" }}>
          <ShoppingBag size={17} />
          Add to Cart · ${totalPrice.toFixed(2)}
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN 6: FAVORITES ─────────────────────────────────────────────────────
function FavoritesScreen({ nav, favorites, toggleFav }: {
  nav: (s: Screen, item?: Item) => void;
  favorites: Set<number>;
  toggleFav: (id: number) => void;
}) {
  const items = MENU.filter(m => favorites.has(m.id));

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: P.bg }}>
      <StatusBar />
      <div className="px-5 pt-2 pb-4 flex-shrink-0">
        <h2 className="text-[22px] font-semibold" style={{ color: P.text }}>Saved Items</h2>
        <p className="text-[13px]" style={{ color: P.muted }}>{items.length} items in your collection</p>
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 pb-20">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: P.soft }}>
            <Heart size={36} color={P.border} />
          </div>
          <p className="text-[16px] font-semibold" style={{ color: P.text }}>Nothing saved yet</p>
          <p className="text-[13px] text-center px-10" style={{ color: P.muted }}>
            Tap the heart on any item to save it here
          </p>
          <button onClick={() => nav("menu")}
            className="px-6 py-3 rounded-full text-[14px] font-semibold text-white"
            style={{ background: P.brown }}>
            Explore Menu
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-5 pb-6 no-scrollbar">
          <div className="flex flex-col gap-3">
            {items.map(item => (
              // Outer div is not a button — the remove heart and the nav click are separate
              <div key={item.id} className="rounded-3xl overflow-hidden relative"
                style={{ background: P.surface, border: `1px solid ${P.border}` }}>
                {/* Tappable area (not a button so the heart button inside is valid) */}
                <div
                  onClick={() => nav("product", item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === "Enter" && nav("product", item)}
                  className="flex cursor-pointer">
                  <img src={item.img} alt={item.name} className="object-cover flex-shrink-0"
                    style={{ width: 100, height: 110 }} />
                  <div className="flex-1 p-4 min-w-0">
                    <div className="flex flex-wrap gap-1 mb-1">
                      {item.tags.slice(0, 2).map(t => <Chip key={t} label={t} />)}
                    </div>
                    <p className="font-bold text-[15px] mb-0.5 truncate" style={{ color: P.text }}>{item.name}</p>
                    <p className="text-[12px] mb-2 line-clamp-1" style={{ color: P.muted }}>{item.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[16px]" style={{ color: P.brown }}>${item.price.toFixed(2)}</span>
                      <Stars rating={item.rating} />
                    </div>
                  </div>
                </div>
                {/* Heart remove button — standalone, not inside any other button */}
                <button
                  onClick={() => toggleFav(item.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "#FFF1F1" }}>
                  <Heart size={15} fill="#E85D5D" stroke="#E85D5D" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SCREEN 7: CART ───────────────────────────────────────────────────────────
function CartScreen({ nav, cart, cartTotal, updateQty }: {
  nav: (s: Screen) => void;
  cart: CartEntry[];
  cartTotal: number;
  updateQty: (idx: number, delta: number) => void;
}) {
  const tax      = cartTotal * 0.08;
  const delivery = cart.length > 0 ? 1.50 : 0;
  const total    = cartTotal + tax + delivery;

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: P.bg }}>
      <StatusBar />
      <div className="px-5 pt-2 pb-3 flex-shrink-0">
        <h2 className="text-[22px] font-semibold" style={{ color: P.text }}>Your Cart</h2>
        <p className="text-[13px]" style={{ color: P.muted }}>{cart.length} item{cart.length !== 1 ? "s" : ""}</p>
      </div>

      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 pb-20">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: P.soft }}>
            <ShoppingBag size={36} color={P.border} />
          </div>
          <p className="text-[16px] font-semibold" style={{ color: P.text }}>Your cart is empty</p>
          <button onClick={() => nav("menu")}
            className="px-6 py-3 rounded-full text-[14px] font-semibold text-white"
            style={{ background: P.brown }}>
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-5 no-scrollbar">
            <div className="flex flex-col gap-3 pb-3">
              {cart.map((entry, idx) => (
                <div key={`${entry.item.id}-${entry.size}-${idx}`}
                  className="flex gap-3 p-3 rounded-2xl"
                  style={{ background: P.surface, border: `1px solid ${P.border}` }}>
                  <img src={entry.item.img} alt={entry.item.name}
                    className="rounded-xl object-cover flex-shrink-0" style={{ width: 72, height: 72 }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[14px]" style={{ color: P.text }}>{entry.item.name}</p>
                    <p className="text-[11px] mb-2" style={{ color: P.muted }}>
                      {SIZE_LABEL[entry.size]}
                      {entry.addons.length > 0 ? ` · ${entry.addons.length} add-on${entry.addons.length > 1 ? "s" : ""}` : ""}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(idx, -1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center"
                          style={{ background: P.soft }}>
                          <Minus size={12} color={P.text} />
                        </button>
                        <span className="text-[14px] font-semibold w-4 text-center" style={{ color: P.text }}>
                          {entry.qty}
                        </span>
                        <button onClick={() => updateQty(idx, 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center"
                          style={{ background: P.brown }}>
                          <Plus size={12} color="white" />
                        </button>
                      </div>
                      <span className="font-bold text-[14px]" style={{ color: P.brown }}>
                        ${((entry.item.price + SIZE_PRICE[entry.size]) * entry.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => updateQty(idx, -entry.qty)}
                    className="w-7 h-7 flex-shrink-0 self-start flex items-center justify-center rounded-full"
                    style={{ background: P.soft }}>
                    <X size={13} color={P.muted} />
                  </button>
                </div>
              ))}
            </div>

            {/* Promo */}
            <div className="flex items-center gap-3 p-4 rounded-2xl mb-3"
              style={{ background: P.soft, border: `1px dashed ${P.gold}` }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: P.gold }}>
                <Award size={15} color="white" />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold" style={{ color: P.text }}>Add promo code</p>
                <p className="text-[11px]" style={{ color: P.muted }}>Save on your next order</p>
              </div>
              <ChevronRight size={16} color={P.muted} />
            </div>

            {/* Summary */}
            <div className="p-4 rounded-2xl mb-4" style={{ background: P.surface, border: `1px solid ${P.border}` }}>
              <p className="text-[14px] font-semibold mb-3" style={{ color: P.text }}>Order Summary</p>
              {[
                { label: "Subtotal", val: cartTotal },
                { label: "Tax (8%)", val: tax },
                { label: "Delivery", val: delivery },
              ].map(row => (
                <div key={row.label} className="flex justify-between mb-2">
                  <span className="text-[13px]" style={{ color: P.muted }}>{row.label}</span>
                  <span className="text-[13px] font-medium" style={{ color: P.text }}>${row.val.toFixed(2)}</span>
                </div>
              ))}
              <div className="h-px my-2" style={{ background: P.border }} />
              <div className="flex justify-between">
                <span className="text-[15px] font-bold" style={{ color: P.text }}>Total</span>
                <span className="text-[15px] font-bold" style={{ color: P.brown }}>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 px-5 pb-6 pt-3"
            style={{ borderTop: `1px solid ${P.border}`, background: P.bg }}>
            <button onClick={() => nav("checkout")}
              className="w-full py-4 rounded-2xl font-semibold text-[16px] flex items-center justify-center gap-2 transition-transform active:scale-[0.98] text-white"
              style={{ background: P.brown }}>
              Proceed to Checkout · ${total.toFixed(2)}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── SCREEN 8: CHECKOUT ───────────────────────────────────────────────────────
function CheckoutScreen({ goBack, nav }: { goBack: () => void; nav: (s: Screen) => void }) {
  const [mode, setMode]       = useState<"dine" | "delivery">("dine");
  const [payment, setPayment] = useState("card");
  const [name, setName]       = useState("Alex Morgan");
  const [phone, setPhone]     = useState("+1 (555) 012-3456");
  const [table, setTable]     = useState("12");
  const [note, setNote]       = useState("");

  return (
    // relative so absolute bottom bar positions here
    <div className="flex-1 flex flex-col overflow-hidden relative" style={{ background: P.bg }}>
      <StatusBar />
      <div className="px-5 pt-2 pb-4 flex items-center gap-3 flex-shrink-0">
        <BackBtn onPress={goBack} />
        <h2 className="text-[20px] font-semibold" style={{ color: P.text }}>Checkout</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-32 no-scrollbar">
        {/* Dine / Delivery toggle */}
        <div className="flex p-1 rounded-2xl mb-5" style={{ background: P.surface, border: `1px solid ${P.border}` }}>
          {(["dine", "delivery"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-[14px] font-medium transition-all"
              style={{
                background: mode === m ? P.brown : "transparent",
                color:      mode === m ? "white" : P.muted,
              }}>
              {m === "dine" ? "🍽️ Dine In" : "📦 Delivery"}
            </button>
          ))}
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-3 mb-5">
          {[
            { label: "Full Name",                                       val: name,  set: setName,  type: "text" },
            { label: "Phone Number",                                    val: phone, set: setPhone, type: "tel" },
            { label: mode === "dine" ? "Table Number" : "Delivery Address", val: table, set: setTable, type: "text" },
          ].map(field => (
            <div key={field.label}>
              <label className="text-[12px] font-semibold mb-1.5 block" style={{ color: P.brown }}>
                {field.label}
              </label>
              <input
                value={field.val}
                onChange={e => field.set(e.target.value)}
                type={field.type}
                className="w-full px-4 py-3.5 rounded-2xl text-[14px] outline-none"
                style={{ background: P.surface, border: `1px solid ${P.border}`, color: P.text }}
              />
            </div>
          ))}
          <div>
            <label className="text-[12px] font-semibold mb-1.5 block" style={{ color: P.brown }}>
              Special Instructions
            </label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Any allergies or preferences?"
              rows={3}
              className="w-full px-4 py-3.5 rounded-2xl text-[14px] outline-none resize-none"
              style={{ background: P.surface, border: `1px solid ${P.border}`, color: P.text }}
            />
          </div>
        </div>

        {/* Payment */}
        <p className="text-[15px] font-semibold mb-3" style={{ color: P.text }}>Payment Method</p>
        <div className="flex flex-col gap-2 mb-5">
          {[
            { id: "card", Icon: CreditCard, label: "Credit / Debit Card",  sub: "•••• •••• •••• 4242" },
            { id: "upi",  Icon: Smartphone, label: "UPI / Digital Wallet", sub: "Pay instantly" },
            { id: "cash", Icon: Banknote,   label: "Cash on Delivery",     sub: "Pay at counter" },
          ].map(({ id, Icon, label, sub }) => (
            <button key={id} onClick={() => setPayment(id)}
              className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all"
              style={{
                background: payment === id ? P.soft : P.surface,
                border:    `1.5px solid ${payment === id ? P.brown : P.border}`,
              }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: payment === id ? P.brown : P.soft }}>
                <Icon size={18} color={payment === id ? "white" : P.brown} />
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-semibold" style={{ color: P.text }}>{label}</p>
                <p className="text-[11px]" style={{ color: P.muted }}>{sub}</p>
              </div>
              <div className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ border: `2px solid ${payment === id ? P.brown : P.border}` }}>
                {payment === id && (
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: P.brown }} />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 pt-4 z-10"
        style={{ background: P.bg, borderTop: `1px solid ${P.border}` }}>
        <button onClick={() => nav("tracking")}
          className="w-full py-4 rounded-2xl font-semibold text-[16px] transition-transform active:scale-[0.98] text-white"
          style={{ background: P.brown }}>
          Place Order
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN 9: ORDER TRACKING ─────────────────────────────────────────────────
function TrackingScreen({ goBack }: { goBack: () => void }) {
  const [step, setStep] = useState(2);

  const steps = [
    { id: 1, label: "Order Confirmed",   sub: "We received your order",              time: "9:41 AM" },
    { id: 2, label: "Preparing",         sub: "Your barista is crafting your order", time: "9:44 AM" },
    { id: 3, label: "Ready for Pickup",  sub: "Your order is ready at the counter",  time: "" },
    { id: 4, label: "Delivered",         sub: "Enjoy your LUNE experience!",         time: "" },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: P.bg }}>
      <StatusBar />
      <div className="px-5 pt-2 pb-4 flex items-center gap-3 flex-shrink-0">
        <BackBtn onPress={goBack} />
        <h2 className="text-[20px] font-semibold" style={{ color: P.text }}>Order Tracking</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 no-scrollbar">
        {/* Order banner */}
        <div className="rounded-3xl overflow-hidden mb-5 relative" style={{ height: 158 }}>
          <img
            src="https://images.unsplash.com/photo-1713919956905-918a8d14bf4a?w=700&h=350&fit=crop&auto=format"
            alt="Order" className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(92,70,53,0.78)" }} />
          <div className="absolute inset-0 flex flex-col justify-center px-6">
            <p className="text-[12px] mb-1" style={{ color: "rgba(255,255,255,0.65)" }}>Order #LUNE-2941</p>
            <p className="text-white text-[20px] font-bold mb-1">Midnight Mocha × 1</p>
            <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.65)" }}>Table 12 · Placed at 9:41 AM</p>
          </div>
        </div>

        {/* ETA chip */}
        <div className="flex items-center gap-3 p-4 rounded-2xl mb-5"
          style={{ background: P.soft, border: `1px solid ${P.border}` }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: P.gold }}>
            <Clock size={18} color="white" />
          </div>
          <div>
            <p className="text-[12px]" style={{ color: P.muted }}>Estimated Time</p>
            <p className="text-[18px] font-bold" style={{ color: P.text }}>~ 7 minutes</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-[12px]" style={{ color: P.muted }}>Status</p>
            <p className="text-[13px] font-semibold" style={{ color: P.gold }}>Preparing</p>
          </div>
        </div>

        {/* Progress timeline */}
        <div className="p-5 rounded-3xl mb-5" style={{ background: P.surface, border: `1px solid ${P.border}` }}>
          <p className="text-[15px] font-semibold mb-4" style={{ color: P.text }}>Order Progress</p>
          {steps.map((s, i) => {
            const done   = step > s.id;
            const active = step === s.id;
            const isLast = i === steps.length - 1;
            return (
              <div key={s.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: done ? P.brown : active ? P.gold : P.border,
                      outline:    active ? `3px solid ${P.brown}` : "none",
                      outlineOffset: "2px",
                    }}>
                    {done
                      ? <Check size={16} color="white" />
                      : active
                        ? <div className="w-3 h-3 rounded-full bg-white" />
                        : <div className="w-2.5 h-2.5 rounded-full" style={{ background: P.muted }} />
                    }
                  </div>
                  {!isLast && (
                    <div className="w-0.5 my-1" style={{ height: 28, background: done ? P.brown : P.border }} />
                  )}
                </div>
                <div className={isLast ? "" : "pb-4"}>
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-semibold"
                      style={{ color: done || active ? P.text : P.muted }}>
                      {s.label}
                    </p>
                    {s.time && (
                      <span className="text-[10px]" style={{ color: P.muted }}>{s.time}</span>
                    )}
                  </div>
                  <p className="text-[12px] mt-0.5" style={{ color: P.muted }}>{s.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simulate controls */}
        <div className="flex gap-2">
          <button onClick={() => setStep(s => Math.max(1, s - 1))}
            className="flex-1 py-3 rounded-2xl text-[13px] font-medium"
            style={{ background: P.surface, border: `1px solid ${P.border}`, color: P.text }}>
            ← Previous
          </button>
          <button onClick={() => setStep(s => Math.min(4, s + 1))}
            className="flex-1 py-3 rounded-2xl text-[13px] font-medium text-white"
            style={{ background: step < 4 ? P.brown : "#5CB85C" }}>
            {step < 4 ? "Next Step →" : "Completed ✓"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 10: PROFILE ───────────────────────────────────────────────────────
function ProfileScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: P.bg }}>
      <StatusBar />
      <div className="flex-1 overflow-y-auto pb-4 no-scrollbar">

        {/* Header */}
        <div className="px-5 pt-4 pb-5">
          <div className="flex items-center gap-4 mb-5">
            <div className="relative flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop&auto=format"
                alt="Profile"
                className="rounded-full object-cover"
                style={{ width: 64, height: 64 }}
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: P.gold, border: "2px solid white" }}>
                <Check size={9} color="white" />
              </div>
            </div>
            <div>
              <p className="text-[18px] font-bold" style={{ color: P.text }}>Alex Morgan</p>
              <p className="text-[13px] mb-1" style={{ color: P.muted }}>alex.morgan@email.com</p>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: P.soft, color: P.gold }}>
                ⭐ Gold Member
              </span>
            </div>
          </div>

          {/* Rewards card */}
          <div className="rounded-3xl p-5 relative overflow-hidden" style={{ background: P.brown }}>
            <div className="absolute right-0 top-0 w-44 h-44 rounded-full"
              style={{ background: P.gold, opacity: 0.12, transform: "translate(35%,-35%)" }} />
            <p className="text-[12px] mb-1" style={{ color: "rgba(255,255,255,0.65)" }}>LUNE Rewards</p>
            <p className="text-[32px] font-bold mb-0.5 text-white">2,840</p>
            <p className="text-[12px] mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>points available</p>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <div className="h-full rounded-full" style={{ width: "94.7%", background: P.gold }} />
                </div>
              </div>
              <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.7)" }}>94.7% to next</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 px-5 mb-5">
          {[
            { label: "Orders",      value: "48" },
            { label: "Saved Items", value: "12" },
            { label: "Reviews",     value: "9" },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl p-4 text-center"
              style={{ background: P.surface, border: `1px solid ${P.border}` }}>
              <p className="text-[22px] font-bold" style={{ color: P.brown }}>{stat.value}</p>
              <p className="text-[11px]" style={{ color: P.muted }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="px-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[15px] font-semibold" style={{ color: P.text }}>Recent Orders</p>
            <button className="text-[12px] font-medium" style={{ color: P.brown }}>See all</button>
          </div>
          {[
            { name: "Midnight Mocha + Tiramisu",    date: "Today, 9:41 AM",     total: "$16.50" },
            { name: "Oat Milk Latte × 2",           date: "Yesterday, 8:12 AM", total: "$12.00" },
            { name: "Lune Affogato + Croissant",    date: "Jun 16, 7:30 PM",    total: "$13.50" },
          ].map((order, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl mb-2"
              style={{ background: P.surface, border: `1px solid ${P.border}` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: P.soft }}>
                <Coffee size={18} color={P.brown} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold truncate" style={{ color: P.text }}>{order.name}</p>
                <p className="text-[11px]" style={{ color: P.muted }}>{order.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[13px] font-bold" style={{ color: P.brown }}>{order.total}</p>
                <p className="text-[10px] font-medium" style={{ color: "#5CB85C" }}>Delivered</p>
              </div>
            </div>
          ))}
        </div>

        {/* Account links */}
        <div className="px-5 mb-4">
          <p className="text-[15px] font-semibold mb-3" style={{ color: P.text }}>Account</p>
          {[
            { Icon: CreditCard, label: "Payment Methods" },
            { Icon: MapPin,     label: "Saved Addresses" },
            { Icon: Bell,       label: "Notifications" },
            { Icon: Award,      label: "Preferences" },
          ].map(({ Icon, label }) => (
            <button key={label}
              className="flex items-center gap-3 w-full p-4 rounded-2xl mb-2 text-left transition-colors active:opacity-70"
              style={{ background: P.surface, border: `1px solid ${P.border}` }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: P.soft }}>
                <Icon size={17} color={P.brown} />
              </div>
              <span className="flex-1 text-[14px] font-medium" style={{ color: P.text }}>{label}</span>
              <ChevronRight size={16} color={P.muted} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 11: RESERVATION ───────────────────────────────────────────────────
function ReservationScreen({ goBack }: { goBack: () => void }) {
  const [guests,    setGuests]    = useState(2);
  const [selDate,   setSelDate]   = useState(3);
  const [selTime,   setSelTime]   = useState("7:00 PM");
  const [occasion,  setOccasion]  = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const dates     = ["Mon 16","Tue 17","Wed 18","Thu 19","Fri 20","Sat 21","Sun 22"];
  const times     = ["10:00 AM","12:00 PM","2:00 PM","5:00 PM","7:00 PM","8:30 PM","9:30 PM"];
  const occasions = ["Birthday 🎂","Anniversary 💍","Business 💼","Date Night 🌹","Family 👨‍👩‍👧","Just visiting ☕"];

  if (confirmed) {
    return (
      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar" style={{ background: P.bg }}>
        <StatusBar />
        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-5">
          <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: P.soft }}>
            <CheckCircle size={48} color={P.brown} />
          </div>
          <div className="text-center">
            <p className="text-[24px] font-bold mb-2" style={{ color: P.text }}>Table Reserved!</p>
            <p className="text-[14px] leading-relaxed" style={{ color: P.muted }}>
              Your table for {guests} is confirmed for {dates[selDate]}, {selTime}.
              A confirmation will be sent to your phone.
            </p>
          </div>
          <div className="w-full p-5 rounded-3xl" style={{ background: P.surface, border: `1px solid ${P.border}` }}>
            {[
              { icon: "📅", label: "Date",     val: dates[selDate] },
              { icon: "⏰", label: "Time",     val: selTime },
              { icon: "👥", label: "Guests",   val: `${guests} people` },
              { icon: "✨", label: "Occasion", val: occasion || "No occasion" },
            ].map(r => (
              <div key={r.label} className="flex items-center gap-3 py-2.5"
                style={{ borderBottom: `1px solid ${P.border}` }}>
                <span className="text-lg">{r.icon}</span>
                <span className="flex-1 text-[13px]" style={{ color: P.muted }}>{r.label}</span>
                <span className="text-[13px] font-semibold" style={{ color: P.text }}>{r.val}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setConfirmed(false)}
            className="w-full py-4 rounded-2xl text-[15px] font-semibold"
            style={{ background: P.soft, color: P.brown }}>
            Make Another Reservation
          </button>
        </div>
      </div>
    );
  }

  return (
    // relative so absolute bottom bar positions here
    <div className="flex-1 flex flex-col overflow-hidden relative" style={{ background: P.bg }}>
      <StatusBar />
      <div className="px-5 pt-2 pb-3 flex items-center gap-3 flex-shrink-0">
        <BackBtn onPress={goBack} />
        <div>
          <h2 className="text-[20px] font-semibold leading-tight" style={{ color: P.text }}>Reserve Table</h2>
          <p className="text-[12px]" style={{ color: P.muted }}>Book the perfect evening</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-36 no-scrollbar">
        {/* Guest count */}
        <div className="p-4 rounded-2xl mb-4" style={{ background: P.surface, border: `1px solid ${P.border}` }}>
          <p className="text-[14px] font-semibold mb-3" style={{ color: P.text }}>Number of Guests</p>
          <div className="flex items-center justify-between">
            <button onClick={() => setGuests(g => Math.max(1, g - 1))}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: P.soft }}>
              <Minus size={16} color={P.text} />
            </button>
            <div className="text-center">
              <p className="text-[40px] font-bold leading-none" style={{ color: P.brown }}>{guests}</p>
              <p className="text-[12px] mt-1" style={{ color: P.muted }}>guests</p>
            </div>
            <button onClick={() => setGuests(g => Math.min(12, g + 1))}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: P.brown }}>
              <Plus size={16} color="white" />
            </button>
          </div>
        </div>

        {/* Date */}
        <p className="text-[14px] font-semibold mb-3" style={{ color: P.text }}>Select Date</p>
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1 no-scrollbar">
          {dates.map((d, i) => {
            const [day, num] = d.split(" ");
            return (
              <button key={d} onClick={() => setSelDate(i)}
                className="flex flex-col items-center px-3 py-3 rounded-2xl flex-shrink-0 min-w-[58px] transition-all"
                style={{
                  background: selDate === i ? P.brown : P.surface,
                  border:    `1px solid ${selDate === i ? P.brown : P.border}`,
                }}>
                <span className="text-[10px] font-medium"
                  style={{ color: selDate === i ? "rgba(255,255,255,0.65)" : P.muted }}>
                  {day}
                </span>
                <span className="text-[18px] font-bold"
                  style={{ color: selDate === i ? "white" : P.text }}>
                  {num}
                </span>
              </button>
            );
          })}
        </div>

        {/* Time */}
        <p className="text-[14px] font-semibold mb-3" style={{ color: P.text }}>Select Time</p>
        <div className="grid grid-cols-3 gap-2 mb-5">
          {times.map(t => (
            <button key={t} onClick={() => setSelTime(t)}
              className="py-3 rounded-2xl text-[13px] font-medium transition-all"
              style={{
                background: selTime === t ? P.gold : P.surface,
                color:      selTime === t ? "white" : P.text,
                border:    `1px solid ${selTime === t ? P.gold : P.border}`,
              }}>
              {t}
            </button>
          ))}
        </div>

        {/* Occasion */}
        <p className="text-[14px] font-semibold mb-3" style={{ color: P.text }}>Occasion (optional)</p>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {occasions.map(o => (
            <button key={o} onClick={() => setOccasion(occasion === o ? "" : o)}
              className="py-3 px-3 rounded-2xl text-[13px] font-medium text-left transition-all"
              style={{
                background: occasion === o ? P.soft : P.surface,
                color:      P.text,
                border:    `1.5px solid ${occasion === o ? P.brown : P.border}`,
              }}>
              {o}
            </button>
          ))}
        </div>

        {/* Summary */}
        <div className="p-4 rounded-2xl" style={{ background: P.soft }}>
          <p className="text-[12px] font-semibold mb-1" style={{ color: P.brown }}>Reservation Summary</p>
          <p className="text-[13px]" style={{ color: P.text }}>
            {guests} guest{guests !== 1 ? "s" : ""} · {dates[selDate]} · {selTime}
            {occasion ? ` · ${occasion}` : ""}
          </p>
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 pt-4 z-10"
        style={{ background: P.bg, borderTop: `1px solid ${P.border}` }}>
        <button onClick={() => setConfirmed(true)}
          className="w-full py-4 rounded-2xl font-semibold text-[16px] flex items-center justify-center gap-2 transition-transform active:scale-[0.98] text-white"
          style={{ background: P.brown }}>
          <Calendar size={18} />
          Confirm Reservation
        </button>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen,       setScreen]       = useState<Screen>("landing");
  const [prevTab,      setPrevTab]      = useState<Screen>("home");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [favorites,    setFavorites]    = useState<Set<number>>(new Set([2, 8, 11, 17]));
  const [cart,         setCart]         = useState<CartEntry[]>([]);

  const navigate = (s: Screen, item?: Item) => {
    const mainTabs: Screen[] = ["home","menu","favorites","cart","profile"];
    if (mainTabs.includes(screen)) setPrevTab(screen);
    if (item) setSelectedItem(item);
    setScreen(s);
  };

  const goBack = () => setScreen(prevTab);

  const toggleFav = (id: number) =>
    setFavorites(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const addToCart = (item: Item, s: "S"|"M"|"L", a: string[], q: number) =>
    setCart(prev => {
      const idx = prev.findIndex(e => e.item.id === item.id && e.size === s);
      if (idx >= 0) return prev.map((e, i) => i === idx ? { ...e, qty: e.qty + q } : e);
      return [...prev, { item, qty: q, size: s, addons: a }];
    });

  const updateQty = (idx: number, delta: number) =>
    setCart(prev =>
      prev.map((e, i) => i === idx ? { ...e, qty: Math.max(0, e.qty + delta) } : e)
          .filter(e => e.qty > 0)
    );

  const cartTotal = cart.reduce((sum, e) => sum + (e.item.price + SIZE_PRICE[e.size]) * e.qty, 0);
  const cartCount = cart.reduce((sum, e) => sum + e.qty, 0);

  const mainTabs: Screen[] = ["home","menu","favorites","cart","profile"];
  const showNav = mainTabs.includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case "landing":     return <LandingScreen nav={navigate} />;
      case "home":        return <HomeScreen nav={navigate} favorites={favorites} toggleFav={toggleFav} />;
      case "menu":        return <MenuScreen nav={navigate} favorites={favorites} toggleFav={toggleFav} />;
      case "category":    return <CategoryScreen nav={navigate} goBack={goBack} favorites={favorites} toggleFav={toggleFav} />;
      case "product":     return <ProductScreen nav={navigate} goBack={goBack} favorites={favorites} toggleFav={toggleFav} item={selectedItem} addToCart={addToCart} />;
      case "favorites":   return <FavoritesScreen nav={navigate} favorites={favorites} toggleFav={toggleFav} />;
      case "cart":        return <CartScreen nav={navigate} cart={cart} cartTotal={cartTotal} updateQty={updateQty} />;
      case "checkout":    return <CheckoutScreen goBack={goBack} nav={navigate} />;
      case "tracking":    return <TrackingScreen goBack={goBack} />;
      case "profile":     return <ProfileScreen nav={navigate} />;
      case "reservation": return <ReservationScreen goBack={() => navigate("home")} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: "#D9D0C4", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Warm vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 30%, rgba(176,141,87,0.18) 0%, transparent 60%)," +
            "radial-gradient(ellipse at 80% 70%, rgba(92,70,53,0.14) 0%, transparent 60%)",
        }}
      />

      {/* Top label */}
      <div className="absolute top-7 left-1/2 -translate-x-1/2 text-center z-10 select-none">
        <p className="text-[11px] tracking-[0.4em] uppercase font-medium" style={{ color: "#7A6B59" }}>
          LUNE · Mobile App
        </p>
      </div>

      {/* iPhone 16 Pro frame */}
      <div className="relative z-10 flex-shrink-0" style={{ width: 393, height: 852 }}>
        {/* Body */}
        <div className="absolute inset-0 rounded-[47px]"
          style={{
            background: "#1C1C1E",
            boxShadow:
              "0 60px 120px rgba(0,0,0,0.45)," +
              "0 0 0 1px rgba(255,255,255,0.1)," +
              "inset 0 0 0 1px rgba(255,255,255,0.06)",
          }}>
          {/* Screen */}
          <div className="absolute inset-[3px] rounded-[44px] overflow-hidden flex flex-col"
            style={{ background: P.bg }}>
            {renderScreen()}
            {showNav && (
              <>
                <BottomNav active={screen} nav={navigate} cartCount={cartCount} />
                <HomeIndicator />
              </>
            )}
          </div>
        </div>

        {/* Physical buttons */}
        <div className="absolute -left-[2px] top-[124px] w-[3px] h-[32px] rounded-l-sm" style={{ background: "#2C2C2E" }} />
        <div className="absolute -left-[2px] top-[168px] w-[3px] h-[64px] rounded-l-sm" style={{ background: "#2C2C2E" }} />
        <div className="absolute -left-[2px] top-[244px] w-[3px] h-[64px] rounded-l-sm" style={{ background: "#2C2C2E" }} />
        <div className="absolute -right-[2px] top-[180px] w-[3px] h-[96px] rounded-r-sm" style={{ background: "#2C2C2E" }} />
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center z-10 select-none">
        <p className="text-[10px] tracking-widest uppercase font-medium" style={{ color: "#8A7B69" }}>
          Interactive · All 10 screens
        </p>
      </div>

      {/* Global scrollbar hide */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
