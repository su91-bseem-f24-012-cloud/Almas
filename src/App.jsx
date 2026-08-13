import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Search, User, Heart, ShoppingBag, Menu, X, Star, ChevronDown,
  ChevronRight, ChevronLeft, Check, Truck, ShieldCheck, Award,
  Sparkles, Scissors, Instagram, Facebook, MessageCircle, MapPin,
  Phone, Mail, Plus, Minus, SlidersHorizontal, ArrowRight, RotateCcw
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/* TOKENS                                                                  */
/* ---------------------------------------------------------------------- */
const C = {
  cream: "#F8F4EA",
  creamDeep: "#F1EADA",
  charcoal: "#1C1A17",
  charcoalSoft: "#37332C",
  beige: "#E9DFC8",
  beigeLine: "#D9CBA9",
  gold: "#A9812F",
  goldLight: "#CBA968",
  goldDeep: "#8A6B25",
  maroon: "#7A2331",
  white: "#FFFFFF",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Manrope:wght@400;500;600;700;800&display=swap');
`;

const fmt = (n) => "Rs. " + Math.round(n).toLocaleString("en-PK");

/* ---------------------------------------------------------------------- */
/* PRODUCT DATA                                                           */
/* ---------------------------------------------------------------------- */
const IMG = {
  menSuit: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=900&q=80",
  menKurta: "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=900&q=80",
  menShirt: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&q=80",
  menWaist: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=80",
  menTrouser: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=900&q=80",
  menUnstitched: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=900&q=80",
  ladiesLawn: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80",
  ladiesFormal: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80",
  ladiesParty: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&q=80",
  ladiesCasual: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a6?w=900&q=80",
  ladiesChiffon: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80",
  ladiesEmbroidered: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=900&q=80",
  cutPiece1: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&q=80",
  cutPiece2: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=900&q=80",
  cutPiece3: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=80",
  perfume1: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=900&q=80",
  perfume2: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&q=80",
  perfume3: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900&q=80",
  perfume4: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=900&q=80",
  hero1: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49889?w=1600&q=80",
  hero2: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80",
  promo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1600&q=80",
  catMen: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&q=80",
  catLadies: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80",
  catCut: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=80",
  catPerfume: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=900&q=80",
};
let _id = 1;
const P = (o) => ({ id: _id++, rating: 4.3 + Math.random() * 0.6, ...o });

const PRODUCTS = [
  P({ name: "Charcoal Tailored Waistcoat Suit", category: "men", sub: "Shalwar Kameez", price: 8990, orig: 11500, brand: "Almas Men", colors: ["Charcoal", "Navy"], sizes: ["S", "M", "L", "XL"], image: IMG.menSuit, tags: ["bestSeller"] }),
  P({ name: "Ivory Embroidered Kurta", category: "men", sub: "Kurta", price: 4590, brand: "Almas Men", colors: ["Ivory", "Black"], sizes: ["S", "M", "L", "XL", "XXL"], image: IMG.menKurta, tags: ["newArrival"] }),
  P({ name: "Oxford Slim-Fit Shirt", category: "men", sub: "Shirts", price: 3290, orig: 4200, brand: "Almas Men", colors: ["White", "Sky Blue"], sizes: ["S", "M", "L", "XL"], image: IMG.menShirt, tags: ["sale"] }),
  P({ name: "Classic Fit Formal Trouser", category: "men", sub: "Trousers", price: 3790, brand: "Almas Men", colors: ["Grey", "Black", "Beige"], sizes: ["30", "32", "34", "36"], image: IMG.menTrouser, tags: [] }),
  P({ name: "Wool-Blend Waistcoat", category: "men", sub: "Waistcoats", price: 5490, brand: "Almas Men", colors: ["Charcoal"], sizes: ["S", "M", "L"], image: IMG.menWaist, tags: ["bestSeller"] }),
  P({ name: "Premium Unstitched Karandi 2Pc", category: "men", sub: "Unstitched", price: 4990, orig: 6200, brand: "Almas Men", colors: ["Steel Grey"], sizes: ["Unstitched"], image: IMG.menUnstitched, tags: ["sale", "newArrival"] }),

  P({ name: "Blush Embroidered Lawn 3Pc", category: "ladies", sub: "Lawn", price: 6990, orig: 8990, brand: "Almas Ladies", colors: ["Blush", "Mint"], sizes: ["S", "M", "L"], image: IMG.ladiesLawn, tags: ["bestSeller", "sale"] }),
  P({ name: "Emerald Formal 3 Piece", category: "ladies", sub: "Formal", price: 12990, brand: "Almas Ladies", colors: ["Emerald", "Wine"], sizes: ["S", "M", "L", "XL"], image: IMG.ladiesFormal, tags: ["newArrival"] }),
  P({ name: "Midnight Chiffon Party Wear", category: "ladies", sub: "Party Wear", price: 15990, orig: 19990, brand: "Almas Ladies", colors: ["Midnight Blue", "Black"], sizes: ["S", "M", "L"], image: IMG.ladiesParty, tags: ["sale"] }),
  P({ name: "Everyday Cotton 2 Piece", category: "ladies", sub: "Casual", price: 4290, brand: "Almas Ladies", colors: ["Beige", "Rose"], sizes: ["S", "M", "L", "XL"], image: IMG.ladiesCasual, tags: [] }),
  P({ name: "Rose Georgette Chiffon Suit", category: "ladies", sub: "Chiffon", price: 9490, brand: "Almas Ladies", colors: ["Rose", "Ivory"], sizes: ["S", "M", "L"], image: IMG.ladiesChiffon, tags: ["newArrival"] }),
  P({ name: "Hand-Embroidered Festive 3Pc", category: "ladies", sub: "Embroidered", price: 17990, brand: "Almas Ladies", colors: ["Gold", "Maroon"], sizes: ["S", "M", "L", "XL"], image: IMG.ladiesEmbroidered, tags: ["bestSeller"] }),

  P({ name: "Printed Lawn Cut Piece", category: "cutpieces", sub: "Lawn", price: 2190, fabric: "Lawn", design: "Floral Print", length: "3 Metres", colors: ["Peach"], image: IMG.cutPiece1, tags: ["newArrival"] }),
  P({ name: "Embroidered Karandi Cut Piece", category: "cutpieces", sub: "Karandi", price: 3490, fabric: "Karandi", design: "Embroidered Panel", length: "3.5 Metres", colors: ["Steel Grey"], image: IMG.cutPiece2, tags: ["bestSeller"] }),
  P({ name: "Chiffon Digital Print Cut Piece", category: "cutpieces", sub: "Chiffon", price: 2790, fabric: "Chiffon", design: "Digital Print", length: "2.5 Metres", colors: ["Mint"], image: IMG.cutPiece3, tags: ["sale"], orig: 3400 }),

  P({ name: "Oud Al Sultan EDP", category: "perfumes", sub: "Men's Perfumes", price: 5990, brand: "Almas Parfum", size: "100ml", colors: [], image: IMG.perfume1, tags: ["bestSeller"] }),
  P({ name: "Noor Rose Musk EDP", category: "perfumes", sub: "Ladies Perfumes", price: 6490, brand: "Almas Parfum", size: "50ml", colors: [], image: IMG.perfume2, tags: ["newArrival"] }),
  P({ name: "Velvet Amber Unisex", category: "perfumes", sub: "Unisex Perfumes", price: 7290, orig: 8990, brand: "Almas Parfum", size: "100ml", colors: [], image: IMG.perfume3, tags: ["sale"] }),
  P({ name: "White Jasmine Eau De Toilette", category: "perfumes", sub: "Ladies Perfumes", price: 4590, brand: "Almas Parfum", size: "50ml", colors: [], image: IMG.perfume4, tags: ["bestSeller"] }),
];

const DESC = "Crafted from premium fabric with meticulous attention to finish and stitch quality. Designed in-house by the Almas atelier for a silhouette that feels as good as it looks, this piece is made for everyday elegance and special occasions alike.";

/* ---------------------------------------------------------------------- */
/* HELPERS / SMALL UI                                                     */
/* ---------------------------------------------------------------------- */
function Price({ price, orig }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
      <span style={{ fontWeight: 700, color: C.charcoal, fontSize: 15 }}>{fmt(price)}</span>
      {orig && <span style={{ textDecoration: "line-through", color: "#9C9282", fontSize: 13 }}>{fmt(orig)}</span>}
      {orig && (
        <span style={{ color: C.maroon, fontSize: 12, fontWeight: 700 }}>
          -{Math.round(((orig - price) / orig) * 100)}%
        </span>
      )}
    </div>
  );
}

function Stars({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={12} fill={i <= Math.round(rating) ? C.gold : "none"} color={C.gold} strokeWidth={1.5} />
      ))}
      <span style={{ fontSize: 11, color: "#8A8272", marginLeft: 2 }}>{rating.toFixed(1)}</span>
    </div>
  );
}

function StitchDivider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "0 auto", maxWidth: 1200, padding: "0 24px" }}>
      <div style={{ flex: 1, borderTop: `1px dashed ${C.beigeLine}` }} />
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.gold }}>
        <Scissors size={15} strokeWidth={1.5} style={{ transform: "rotate(90deg)" }} />
        {label && (
          <span style={{ fontFamily: "Manrope", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: C.goldDeep, fontWeight: 700 }}>
            {label}
          </span>
        )}
      </div>
      <div style={{ flex: 1, borderTop: `1px dashed ${C.beigeLine}` }} />
    </div>
  );
}

function ImgBox({ src, alt, ratio = "4/5", style }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: ratio, overflow: "hidden", background: C.beige, ...style }}>
      {!err ? (
        <img
          src={src}
          alt={alt}
          onError={() => setErr(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .6s ease" }}
          className="almas-img"
        />
      ) : (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.beige}, ${C.creamDeep})`, color: C.goldDeep, fontFamily: "Cormorant Garamond", fontSize: 18, textAlign: "center", padding: 12 }}>
          {alt}
        </div>
      )}
    </div>
  );
}
function Btn({ children, variant = "primary", onClick, style, full, size = "md", disabled, type = "button" }) {
  const base = {
    fontFamily: "Manrope",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontSize: size === "sm" ? 11 : 12.5,
    padding: size === "sm" ? "10px 18px" : "15px 30px",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "1px solid",
    transition: "all .25s ease",
    width: full ? "100%" : "auto",
    opacity: disabled ? 0.5 : 1,
  };
  const variants = {
    primary: { background: C.charcoal, color: C.cream, borderColor: C.charcoal },
    gold: { background: C.gold, color: C.white, borderColor: C.gold },
    outline: { background: "transparent", color: C.charcoal, borderColor: C.charcoal },
    outlineLight: { background: "transparent", color: C.cream, borderColor: C.cream },
    ghost: { background: "transparent", color: C.charcoal, border: "none", padding: 0, letterSpacing: "0.05em" },
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------------- */
/* NAV / HEADER                                                           */
/* ---------------------------------------------------------------------- */
const NAV_LINKS = [
  { key: "home", label: "Home" },
  { key: "men", label: "Men's" },
  { key: "ladies", label: "Ladies" },
  { key: "cutpieces", label: "Ladies Cut Pieces" },
  { key: "perfumes", label: "Perfumes" },
  { key: "newarrivals", label: "New Arrivals" },
  { key: "sale", label: "Sale" },
  { key: "about", label: "About Us" },
  { key: "contact", label: "Contact" },
];

function Header({ go, cartCount, wishCount, setSearchOpen, setCartOpen, setWishOpen, setMobileOpen, toast, currentPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 200, background: C.cream,
        borderBottom: `1px solid ${scrolled ? C.beigeLine : "transparent"}`,
        boxShadow: scrolled ? "0 4px 20px rgba(28,26,23,0.06)" : "none",
        transition: "all .3s ease",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: scrolled ? 66 : 84, transition: "height .3s ease" }}>
        <button onClick={() => setMobileOpen(true)} style={{ display: "none", background: "none", border: "none", cursor: "pointer" }} className="almas-hamburger">
          <Menu size={24} color={C.charcoal} />
        </button>

        <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
          <div style={{ fontFamily: "Cormorant Garamond", fontWeight: 700, fontSize: 30, letterSpacing: "0.12em", color: C.charcoal, lineHeight: 1 }}>ALMAS</div>
          <div style={{ fontFamily: "Manrope", fontSize: 8.5, letterSpacing: "0.35em", color: C.gold, textTransform: "uppercase", marginTop: 2 }}>House of Fashion</div>
        </button>

        <nav className="almas-navlinks" style={{ display: "flex", gap: 26 }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l.key}
              onClick={() => go(l.key)}
              style={{
                background: "none", border: "none", cursor: "pointer", fontFamily: "Manrope",
                fontSize: 12.5, letterSpacing: "0.05em", color: currentPage === l.key ? C.gold : C.charcoal,
                fontWeight: currentPage === l.key ? 700 : 500, padding: "6px 0", borderBottom: currentPage === l.key ? `1px solid ${C.gold}` : "1px solid transparent",
                whiteSpace: "nowrap",
              }}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <button onClick={() => setSearchOpen(true)} style={{ background: "none", border: "none", cursor: "pointer" }} aria-label="Search">
            <Search size={19} color={C.charcoal} />
          </button>
          <button onClick={() => toast("Account & sign-in need a backend — this storefront is front-end only for now.")} style={{ background: "none", border: "none", cursor: "pointer" }} className="almas-icon-hide-sm" aria-label="Account">
            <User size={19} color={C.charcoal} />
          </button>
          <button onClick={() => setWishOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }} aria-label="Wishlist">
            <Heart size={19} color={C.charcoal} />
            {wishCount > 0 && <Badge n={wishCount} />}
          </button>
          <button onClick={() => setCartOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }} aria-label="Cart">
            <ShoppingBag size={19} color={C.charcoal} />
            {cartCount > 0 && <Badge n={cartCount} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Badge({ n }) {
  return (
    <span style={{ position: "absolute", top: -7, right: -8, background: C.gold, color: C.white, fontSize: 9.5, fontWeight: 800, borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope" }}>
      {n}
    </span>
  );
}

function MobileMenu({ open, onClose, go, currentPage }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 400, display: "flex" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(28,26,23,0.5)" }} />
      <div style={{ position: "relative", width: "82%", maxWidth: 340, background: C.cream, height: "100%", padding: "28px 24px", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
          <div style={{ fontFamily: "Cormorant Garamond", fontWeight: 700, fontSize: 26, color: C.charcoal }}>ALMAS</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={22} color={C.charcoal} /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {NAV_LINKS.map((l) => (
            <button key={l.key} onClick={() => { go(l.key); onClose(); }} style={{ textAlign: "left", background: "none", border: "none", borderBottom: `1px solid ${C.beigeLine}`, padding: "16px 2px", fontFamily: "Manrope", fontSize: 15, color: currentPage === l.key ? C.gold : C.charcoal, fontWeight: currentPage === l.key ? 700 : 500, cursor: "pointer" }}>
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* CART / WISHLIST DRAWERS                                                */
/* ---------------------------------------------------------------------- */
function Drawer({ open, onClose, title, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, pointerEvents: open ? "auto" : "none" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(28,26,23,0.5)", opacity: open ? 1 : 0, transition: "opacity .3s ease" }} />
      <div style={{ position: "absolute", top: 0, right: 0, height: "100%", width: "min(420px, 92vw)", background: C.cream, transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform .35s cubic-bezier(.2,.8,.2,1)", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 22px 16px", borderBottom: `1px solid ${C.beigeLine}` }}>
          <span style={{ fontFamily: "Cormorant Garamond", fontSize: 22, fontWeight: 700, color: C.charcoal }}>{title}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} color={C.charcoal} /></button>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>{children}</div>
      </div>
    </div>
  );
}

function CartDrawer({ open, onClose, cart, updateQty, removeItem, go, setCartOpen }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = cart.length ? (subtotal > 5000 ? 0 : 250) : 0;
  return (
    <Drawer open={open} onClose={onClose} title={`Shopping Bag (${cart.length})`}>
      {cart.length === 0 ? (
        <div style={{ padding: 40, textAlign: "center" }}>
          <ShoppingBag size={36} color={C.beigeLine} style={{ margin: "0 auto 14px" }} />
          <p style={{ fontFamily: "Manrope", color: C.charcoalSoft, fontSize: 13.5 }}>Your bag is empty.</p>
          <div style={{ marginTop: 18 }}><Btn onClick={onClose}>Continue Shopping</Btn></div>
        </div>
      ) : (
        <>
          <div style={{ padding: "10px 20px" }}>
            {cart.map((item) => (
              <div key={item.key} style={{ display: "flex", gap: 12, padding: "16px 0", borderBottom: `1px solid ${C.beigeLine}` }}>
                <div style={{ width: 72 }}><ImgBox src={item.image} alt={item.name} ratio="4/5" /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Manrope", fontSize: 13, fontWeight: 700, color: C.charcoal }}>{item.name}</div>
                  <div style={{ fontFamily: "Manrope", fontSize: 11.5, color: "#8A8272", marginTop: 2 }}>{item.size !== "-" ? `Size: ${item.size}` : ""} {item.color !== "-" ? ` · ${item.color}` : ""}</div>
                  <div style={{ marginTop: 6 }}><Price price={item.price} /></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.beigeLine}` }}>
                      <button onClick={() => updateQty(item.key, -1)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 8px" }}><Minus size={11} /></button>
                      <span style={{ fontSize: 12, minWidth: 18, textAlign: "center", fontFamily: "Manrope" }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, 1)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 8px" }}><Plus size={11} /></button>
                    </div>
                    <button onClick={() => removeItem(item.key)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Manrope", fontSize: 11, color: C.maroon, textDecoration: "underline" }}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "18px 22px", borderTop: `1px solid ${C.beigeLine}` }}>
            <Row label="Subtotal" value={fmt(subtotal)} />
            <Row label="Delivery" value={delivery === 0 ? "Free" : fmt(delivery)} />
            <div style={{ borderTop: `1px dashed ${C.beigeLine}`, margin: "10px 0" }} />
            <Row label="Total" value={fmt(subtotal + delivery)} bold />
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <Btn full onClick={() => { setCartOpen(false); go("checkout"); }}>Proceed to Checkout</Btn>
              <Btn full variant="outline" onClick={onClose}>Continue Shopping</Btn>
            </div>
          </div>
        </>
      )}
    </Drawer>
  );
}
function Row({ label, value, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontFamily: "Manrope", fontSize: bold ? 14.5 : 13, fontWeight: bold ? 800 : 500, color: C.charcoal }}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}

function WishDrawer({ open, onClose, wishlist, products, toggleWish, addToCart, go, setSelected, setQuickView }) {
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <Drawer open={open} onClose={onClose} title={`Wishlist (${items.length})`}>
      {items.length === 0 ? (
        <div style={{ padding: 40, textAlign: "center" }}>
          <Heart size={36} color={C.beigeLine} style={{ margin: "0 auto 14px" }} />
          <p style={{ fontFamily: "Manrope", color: C.charcoalSoft, fontSize: 13.5 }}>Nothing saved yet.</p>
        </div>
      ) : (
        <div style={{ padding: "10px 20px" }}>
          {items.map((p) => (
            <div key={p.id} style={{ display: "flex", gap: 12, padding: "16px 0", borderBottom: `1px solid ${C.beigeLine}` }}>
              <div style={{ width: 72, cursor: "pointer" }} onClick={() => { onClose(); setSelected(p.id); go("product"); }}><ImgBox src={p.image} alt={p.name} ratio="4/5" /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Manrope", fontSize: 13, fontWeight: 700, color: C.charcoal }}>{p.name}</div>
                <div style={{ marginTop: 4 }}><Price price={p.price} orig={p.orig} /></div>
                <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                  <button onClick={() => setQuickView(p.id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Manrope", fontSize: 11, color: C.gold, fontWeight: 700 }}>Quick Add</button>
                  <button onClick={() => toggleWish(p.id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Manrope", fontSize: 11, color: C.maroon, textDecoration: "underline" }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
}

/* ---------------------------------------------------------------------- */
/* SEARCH OVERLAY                                                         */
/* ---------------------------------------------------------------------- */
function SearchOverlay({ open, onClose, products, go, setSelected }) {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 100); else setQ(""); }, [open]);
  const results = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return products.filter((p) =>
      p.name.toLowerCase().includes(s) || p.category.includes(s) || p.sub?.toLowerCase().includes(s) ||
      (p.brand || "").toLowerCase().includes(s) || (p.colors || []).some((c) => c.toLowerCase().includes(s))
    ).slice(0, 8);
  }, [q, products]);
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 600, background: "rgba(28,26,23,0.6)" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: C.cream, maxWidth: 720, margin: "70px auto 0", padding: 28, maxHeight: "80vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: `2px solid ${C.charcoal}`, paddingBottom: 12 }}>
          <Search size={20} color={C.charcoal} />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for products, categories, brands..."
            style={{ flex: 1, border: "none", outline: "none", background: "none", fontFamily: "Manrope", fontSize: 16, color: C.charcoal }} />
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} /></button>
        </div>
        {q.trim() && (
          <div style={{ marginTop: 18 }}>
            {results.length === 0 ? (
              <p style={{ fontFamily: "Manrope", color: "#8A8272", fontSize: 13 }}>No results for "{q}". Try "kurta", "lawn" or "perfume".</p>
            ) : (
              results.map((p) => (
                <button key={p.id} onClick={() => { setSelected(p.id); go("product"); onClose(); }} style={{ width: "100%", display: "flex", gap: 14, alignItems: "center", padding: "10px 4px", background: "none", border: "none", borderBottom: `1px solid ${C.beigeLine}`, cursor: "pointer", textAlign: "left" }}>
                  <div style={{ width: 48 }}><ImgBox src={p.image} alt={p.name} ratio="1/1" /></div>
                  <div>
                    <div style={{ fontFamily: "Manrope", fontSize: 13.5, fontWeight: 700, color: C.charcoal }}>{p.name}</div>
                    <div style={{ fontFamily: "Manrope", fontSize: 11.5, color: "#8A8272", textTransform: "capitalize" }}>{p.category} · {p.sub}</div>
                  </div>
                  <Price price={p.price} orig={p.orig} />
                </button>
              ))
            )}
          </div>
        )}
        {!q.trim() && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontFamily: "Manrope", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.gold, fontWeight: 700, marginBottom: 10 }}>Popular Searches</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Lawn 3Pc", "Kurta", "Cut Piece", "Perfume", "Party Wear", "Waistcoat"].map((t) => (
                <button key={t} onClick={() => setQ(t)} style={{ padding: "8px 14px", border: `1px solid ${C.beigeLine}`, background: "none", fontFamily: "Manrope", fontSize: 12, cursor: "pointer" }}>{t}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function ProductCard({ p, wishlist, toggleWish, go, setSelected, setQuickView }) {
  const isWish = wishlist.includes(p.id);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", overflow: "hidden" }} className="almas-card-img" onMouseEnter={(e) => { const im = e.currentTarget.querySelector("img"); if (im) im.style.transform = "scale(1.06)"; }} onMouseLeave={(e) => { const im = e.currentTarget.querySelector("img"); if (im) im.style.transform = "scale(1)"; }}>
        <div style={{ cursor: "pointer" }} onClick={() => { setSelected(p.id); go("product"); window.scrollTo(0, 0); }}>
          <ImgBox src={p.image} alt={p.name} />
        </div>
        {(p.tags?.includes("newArrival") || p.tags?.includes("sale")) && (
          <span style={{ position: "absolute", top: 10, left: 10, background: p.tags.includes("sale") ? C.maroon : C.charcoal, color: C.white, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em", padding: "5px 9px", fontFamily: "Manrope" }}>
            {p.tags.includes("sale") ? "SALE" : "NEW"}
          </span>
        )}
        <button onClick={() => toggleWish(p.id)} style={{ position: "absolute", top: 10, right: 10, background: C.white, border: "none", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Heart size={14} color={isWish ? C.maroon : C.charcoal} fill={isWish ? C.maroon : "none"} />
        </button>
        <button onClick={() => setQuickView(p.id)} style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(28,26,23,0.88)", color: C.cream, border: "none", padding: "10px 0", fontFamily: "Manrope", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", opacity: 0, transition: "opacity .25s ease" }} className="almas-quickview-btn">
          Quick View
        </button>
      </div>
      <div style={{ paddingTop: 12 }}>
        <Stars rating={p.rating} />
        <div onClick={() => { setSelected(p.id); go("product"); window.scrollTo(0, 0); }} style={{ fontFamily: "Manrope", fontSize: 13.5, fontWeight: 700, color: C.charcoal, marginTop: 5, cursor: "pointer" }}>{p.name}</div>
        <div style={{ marginTop: 5 }}><Price price={p.price} orig={p.orig} /></div>
      </div>
    </div>
  );
}

function QuickViewModal({ product, onClose, addToCart, wishlist, toggleWish, go, setSelected }) {
  const [size, setSize] = useState(product?.sizes?.[0] || "-");
  const [color, setColor] = useState(product?.colors?.[0] || "-");
  useEffect(() => { setSize(product?.sizes?.[0] || "-"); setColor(product?.colors?.[0] || "-"); }, [product]);
  if (!product) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 700, background: "rgba(28,26,23,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: C.cream, maxWidth: 780, width: "100%", display: "flex", maxHeight: "90vh", overflowY: "auto" }} className="almas-quickview-modal">
        <div style={{ flex: 1, minWidth: 260 }}><ImgBox src={product.image} alt={product.name} ratio="1/1" /></div>
        <div style={{ flex: 1, padding: 28, position: "relative" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer" }}><X size={20} /></button>
          <div style={{ fontFamily: "Manrope", fontSize: 11, letterSpacing: "0.15em", color: C.gold, textTransform: "uppercase", fontWeight: 700 }}>{product.brand || "Almas"}</div>
          <h3 style={{ fontFamily: "Cormorant Garamond", fontSize: 26, fontWeight: 600, color: C.charcoal, margin: "6px 0" }}>{product.name}</h3>
          <Stars rating={product.rating} />
          <div style={{ margin: "12px 0" }}><Price price={product.price} orig={product.orig} /></div>
          {product.colors?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: "Manrope", fontSize: 11.5, color: C.charcoalSoft, marginBottom: 6 }}>Color: {color}</div>
              <div style={{ display: "flex", gap: 8 }}>
                {product.colors.map((c) => (
                  <button key={c} onClick={() => setColor(c)} style={{ padding: "6px 12px", border: `1px solid ${color === c ? C.charcoal : C.beigeLine}`, background: color === c ? C.charcoal : "none", color: color === c ? C.cream : C.charcoal, fontFamily: "Manrope", fontSize: 11.5, cursor: "pointer" }}>{c}</button>
                ))}
              </div>
            </div>
          )}
          {product.sizes?.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontFamily: "Manrope", fontSize: 11.5, color: C.charcoalSoft, marginBottom: 6 }}>Size: {size}</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} style={{ minWidth: 38, padding: "6px 10px", border: `1px solid ${size === s ? C.charcoal : C.beigeLine}`, background: size === s ? C.charcoal : "none", color: size === s ? C.cream : C.charcoal, fontFamily: "Manrope", fontSize: 11.5, cursor: "pointer" }}>{s}</button>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: 10 }}>
            <Btn onClick={() => { addToCart(product, size, color, 1); onClose(); }} style={{ flex: 1 }}>Add to Cart</Btn>
            <button onClick={() => toggleWish(product.id)} style={{ border: `1px solid ${C.beigeLine}`, background: "none", cursor: "pointer", padding: "0 16px" }}>
              <Heart size={17} color={wishlist.includes(product.id) ? C.maroon : C.charcoal} fill={wishlist.includes(product.id) ? C.maroon : "none"} />
            </button>
          </div>
          <button onClick={() => { setSelected(product.id); go("product"); onClose(); window.scrollTo(0, 0); }} style={{ marginTop: 14, background: "none", border: "none", cursor: "pointer", fontFamily: "Manrope", fontSize: 12, color: C.gold, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
            View full details <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
function Home({ go, wishlist, toggleWish, setSelected, setQuickView, toast }) {
  const [heroIdx, setHeroIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % 2), 4500);
    return () => clearInterval(t);
  }, []);
  const [email, setEmail] = useState("");
  const newArrivals = PRODUCTS.filter((p) => p.tags?.includes("newArrival")).slice(0, 8);
  const bestSellers = PRODUCTS.filter((p) => p.tags?.includes("bestSeller")).slice(0, 4);

  const categories = [
    { key: "men", title: "Men's", img: IMG.catMen },
    { key: "ladies", title: "Ladies", img: IMG.catLadies },
    { key: "cutpieces", title: "Ladies Cut Pieces", img: IMG.catCut },
    { key: "perfumes", title: "Perfumes", img: IMG.catPerfume },
  ];

  const reviews = [
    { name: "Ayesha Raza", city: "Lahore", rating: 5, text: "The fabric quality is honestly better than most branded stores in DHA. My 3-piece lawn suit fit perfectly and delivery was quick." },
    { name: "Hamza Tariq", city: "Karachi", rating: 5, text: "Ordered a waistcoat suit for a wedding — the stitching finish felt tailor-made, not off-the-rack. Will be a repeat customer." },
    { name: "Sana Malik", city: "Islamabad", rating: 4, text: "Loved the cut piece I ordered, the embroidery detail matched the photos exactly. COD made it easy to trust a new store." },
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{ position: "relative", height: "88vh", minHeight: 560, overflow: "hidden" }}>
        {[IMG.hero1, IMG.hero2].map((src, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, opacity: heroIdx === i ? 1 : 0, transition: "opacity 1.2s ease" }}>
            <ImgBox src={src} alt="Almas seasonal collection" ratio="auto" style={{ height: "100%" }} />
          </div>
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(28,26,23,0.55) 0%, rgba(28,26,23,0.15) 55%, rgba(28,26,23,0.05) 100%)" }} />
        {/* vertical signature tag */}
        <div style={{ position: "absolute", right: 26, top: "50%", transform: "translateY(-50%) rotate(180deg)", writingMode: "vertical-rl", fontFamily: "Manrope", fontSize: 11, letterSpacing: "0.35em", color: "rgba(248,244,234,0.85)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 10 }} className="almas-vert-tag">
          Est. Lahore — Tailored Since Day One
        </div>
        <div style={{ position: "relative", maxWidth: 1320, margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={{ fontFamily: "Manrope", fontSize: 12, letterSpacing: "0.3em", color: C.goldLight, textTransform: "uppercase", fontWeight: 700, marginBottom: 18 }}>Autumn / Winter Edit</span>
          <h1 style={{ fontFamily: "Cormorant Garamond", fontSize: "clamp(40px, 7vw, 82px)", fontWeight: 600, color: C.cream, lineHeight: 1.05, maxWidth: 680, margin: 0 }}>Style That<br />Defines You</h1>
          <p style={{ fontFamily: "Manrope", fontSize: 16, color: "rgba(248,244,234,0.85)", marginTop: 20, maxWidth: 440 }}>Discover premium fashion for every occasion — from everyday elegance to festive celebration.</p>
          <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
            <Btn variant="gold" onClick={() => go("men")}>Shop Men's</Btn>
            <Btn variant="outlineLight" onClick={() => go("ladies")}>Shop Ladies</Btn>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 40 }}>
            {[0, 1].map((i) => (
              <button key={i} onClick={() => setHeroIdx(i)} style={{ width: heroIdx === i ? 28 : 10, height: 3, background: heroIdx === i ? C.gold : "rgba(248,244,234,0.4)", border: "none", cursor: "pointer", transition: "all .3s ease" }} />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <Section eyebrow="Shop By Category" title="Curated For Every Wardrobe">
        <div className="almas-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {categories.map((c) => (
            <div key={c.key} style={{ position: "relative", cursor: "pointer", overflow: "hidden" }} onClick={() => go(c.key)}>
              <ImgBox src={c.img} alt={c.title} ratio="3/4" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(28,26,23,0.75), rgba(28,26,23,0) 55%)" }} />
              <div style={{ position: "absolute", left: 18, bottom: 18, right: 18 }}>
                <div style={{ fontFamily: "Cormorant Garamond", fontSize: 24, color: C.cream, fontWeight: 600 }}>{c.title}</div>
                <button style={{ marginTop: 8, background: "none", border: "none", color: C.goldLight, fontFamily: "Manrope", fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                  Shop Now <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <StitchDivider label="New This Week" />

      {/* NEW ARRIVALS */}
      <Section eyebrow="Just Landed" title="New Arrivals" action={<Btn variant="outline" size="sm" onClick={() => go("newarrivals")}>View All</Btn>}>
        <div className="almas-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          {newArrivals.map((p) => <ProductCard key={p.id} p={p} wishlist={wishlist} toggleWish={toggleWish} go={go} setSelected={setSelected} setQuickView={setQuickView} />)}
        </div>
      </Section>

      {/* BEST SELLERS */}
      <Section eyebrow="Customer Favourites" title="Best Sellers" bg={C.creamDeep}>
        <div className="almas-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          {bestSellers.map((p) => <ProductCard key={p.id} p={p} wishlist={wishlist} toggleWish={toggleWish} go={go} setSelected={setSelected} setQuickView={setQuickView} />)}
        </div>
      </Section>
      {/* PROMO BANNER */}
      <section style={{ position: "relative", height: 420, margin: "0 auto", maxWidth: 1320, padding: "0 24px 0" }}>
        <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
          <ImgBox src={IMG.promo} alt="Elevate your everyday style" ratio="auto" style={{ height: "100%" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(28,26,23,0.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 20 }}>
            <span style={{ fontFamily: "Manrope", fontSize: 11, letterSpacing: "0.3em", color: C.goldLight, textTransform: "uppercase", fontWeight: 700 }}>Limited Edit</span>
            <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "clamp(30px,5vw,48px)", color: C.cream, margin: "12px 0 22px", fontWeight: 600 }}>Elevate Your Everyday Style</h2>
            <Btn variant="gold" onClick={() => go("newarrivals")}>Shop Collection</Btn>
          </div>
        </div>
      </section>

      {/* WHY SHOP WITH US */}
      <Section eyebrow="The Almas Promise" title="Why Shop With Us">
        <div className="almas-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28 }}>
          {[
            { icon: Award, t: "Premium Quality", d: "Hand-checked fabric and finish on every piece." },
            { icon: ShieldCheck, t: "Original Products", d: "100% authentic, sourced directly from our atelier." },
            { icon: Sparkles, t: "Secure Payments", d: "COD, bank transfer or online — always protected." },
            { icon: Truck, t: "Fast Delivery", d: "2–5 business days across Pakistan." },
          ].map((f, i) => (
            <div key={i} style={{ textAlign: "center", padding: "10px 14px" }}>
              <f.icon size={26} color={C.gold} strokeWidth={1.4} style={{ margin: "0 auto 14px" }} />
              <div style={{ fontFamily: "Cormorant Garamond", fontSize: 19, fontWeight: 700, color: C.charcoal }}>{f.t}</div>
              <div style={{ fontFamily: "Manrope", fontSize: 12.5, color: "#8A8272", marginTop: 6 }}>{f.d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* REVIEWS */}
      <Section eyebrow="Kind Words" title="What Our Customers Say" bg={C.creamDeep}>
        <div className="almas-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {reviews.map((r, i) => (
            <div key={i} style={{ background: C.cream, padding: 26, border: `1px solid ${C.beigeLine}` }}>
              <Stars rating={r.rating} />
              <p style={{ fontFamily: "Cormorant Garamond", fontSize: 17, color: C.charcoalSoft, fontStyle: "italic", margin: "14px 0" }}>"{r.text}"</p>
              <div style={{ fontFamily: "Manrope", fontSize: 12.5, fontWeight: 700, color: C.charcoal }}>{r.name}</div>
              <div style={{ fontFamily: "Manrope", fontSize: 11, color: "#8A8272" }}>{r.city}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* INSTAGRAM GALLERY */}
      <Section eyebrow="@almas.pk" title="Follow Our Journey">
        <div className="almas-grid-6" style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }}>
          {[IMG.ladiesLawn, IMG.menKurta, IMG.ladiesParty, IMG.perfume2, IMG.ladiesChiffon, IMG.menSuit].map((src, i) => (
            <div key={i} style={{ position: "relative", cursor: "pointer" }}>
              <ImgBox src={src} alt="Almas on Instagram" ratio="1/1" />
              <div style={{ position: "absolute", inset: 0, background: "rgba(28,26,23,0)", transition: "background .25s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(28,26,23,0.35)"} onMouseLeave={(e) => e.currentTarget.style.background = "rgba(28,26,23,0)"}>
                <Instagram size={18} color={C.cream} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* NEWSLETTER */}
      <section style={{ background: C.charcoal, padding: "64px 24px", textAlign: "center" }}>
        <Sparkles size={22} color={C.gold} style={{ margin: "0 auto 14px" }} />
        <h3 style={{ fontFamily: "Cormorant Garamond", fontSize: "clamp(24px,4vw,34px)", color: C.cream, fontWeight: 600 }}>Stay Updated With Our Latest Collections</h3>
        <p style={{ fontFamily: "Manrope", fontSize: 13, color: "rgba(248,244,234,0.65)", marginTop: 8 }}>Be the first to know about new drops and exclusive offers.</p>
        <form onSubmit={(e) => { e.preventDefault(); if (/^\S+@\S+\.\S+$/.test(email)) { toast("Subscribed! Welcome to the Almas family."); setEmail(""); } else toast("Please enter a valid email address."); }} style={{ display: "flex", justifyContent: "center", gap: 0, marginTop: 26, maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" style={{ flex: 1, padding: "14px 16px", border: `1px solid ${C.beigeLine}`, background: "transparent", color: C.cream, fontFamily: "Manrope", fontSize: 13, outline: "none" }} />
          <Btn type="submit" variant="gold" style={{ borderRadius: 0 }}>Subscribe</Btn>
        </form>
      </section>
    </div>
  );
}

function Section({ eyebrow, title, children, action, bg }) {
  return (
    <section style={{ background: bg || C.cream, padding: "64px 24px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 14 }}>
          <div>
            <div style={{ fontFamily: "Manrope", fontSize: 11.5, letterSpacing: "0.25em", color: C.gold, textTransform: "uppercase", fontWeight: 700 }}>{eyebrow}</div>
            <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 600, color: C.charcoal, margin: "6px 0 0" }}>{title}</h2>
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
      }
const CATEGORY_META = {
  men: { title: "Men's Collection", sub: "Modern styles designed for every occasion.", subcats: ["Shalwar Kameez", "Kurta", "Shirts", "Trousers", "Waistcoats", "Unstitched"], hero: IMG.hero1 },
  ladies: { title: "Ladies Collection", sub: "Elegant fashion crafted for every moment.", subcats: ["Unstitched", "Stitched", "2 Piece", "3 Piece", "Lawn", "Cotton", "Chiffon", "Embroidered", "Casual", "Formal", "Party Wear"], hero: IMG.hero2 },
  cutpieces: { title: "Ladies Cut Pieces", sub: "Premium fabric, cut and ready for your custom stitching.", subcats: ["Lawn", "Karandi", "Chiffon"], hero: IMG.cutPiece1 },
  perfumes: { title: "Perfumes", sub: "Signature fragrances for men, women and unisex wear.", subcats: ["Men's Perfumes", "Ladies Perfumes", "Unisex Perfumes"], hero: IMG.perfume3 },
  newarrivals: { title: "New Arrivals", sub: "Fresh off the atelier — this season's latest edit.", subcats: [], hero: IMG.hero1 },
  sale: { title: "Sale", sub: "Elevated style, exceptional prices.", subcats: [], hero: IMG.promo },
};

function ListingPage({ category, wishlist, toggleWish, go, setSelected, setQuickView }) {
  const meta = CATEGORY_META[category];
  const base = useMemo(() => {
    if (category === "newarrivals") return PRODUCTS.filter((p) => p.tags?.includes("newArrival"));
    if (category === "sale") return PRODUCTS.filter((p) => p.tags?.includes("sale"));
    return PRODUCTS.filter((p) => p.category === category);
  }, [category]);

  const [sub, setSub] = useState("All");
  const [sizeF, setSizeF] = useState([]);
  const [colorF, setColorF] = useState([]);
  const [priceF, setPriceF] = useState(null);
  const [sort, setSort] = useState("Featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => { setSub("All"); setSizeF([]); setColorF([]); setPriceF(null); setSort("Featured"); }, [category]);

  const allSizes = [...new Set(base.flatMap((p) => p.sizes || []))];
  const allColors = [...new Set(base.flatMap((p) => p.colors || []))];

  let list = base.filter((p) => sub === "All" || p.sub === sub);
  if (sizeF.length) list = list.filter((p) => p.sizes?.some((s) => sizeF.includes(s)));
  if (colorF.length) list = list.filter((p) => p.colors?.some((c) => colorF.includes(c)));
  if (priceF) list = list.filter((p) => p.price >= priceF[0] && p.price <= priceF[1]);
  if (sort === "Newest") list = [...list].sort((a, b) => b.id - a.id);
  if (sort === "Price Low to High") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "Price High to Low") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "Best Selling") list = [...list].sort((a, b) => (b.tags?.includes("bestSeller") ? 1 : 0) - (a.tags?.includes("bestSeller") ? 1 : 0));

  const toggle = (arr, set, v) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const priceRanges = [[0, 3000], [3000, 6000], [6000, 10000], [10000, 999999]];

  return (
    <div>
      <div style={{ position: "relative", height: 220 }}>
        <ImgBox src={meta.hero} alt={meta.title} ratio="auto" style={{ height: "100%" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(28,26,23,0.5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 16 }}>
          <h1 style={{ fontFamily: "Cormorant Garamond", fontSize: "clamp(30px,4vw,44px)", color: C.cream, fontWeight: 600 }}>{meta.title}</h1>
          <p style={{ fontFamily: "Manrope", fontSize: 13, color: "rgba(248,244,234,0.85)", marginTop: 8 }}>{meta.sub}</p>
        </div>
      </div>

      {category === "cutpieces" && (
        <div style={{ background: C.creamDeep, padding: "24px", textAlign: "center" }}>
          <p style={{ maxWidth: 760, margin: "0 auto", fontFamily: "Manrope", fontSize: 13, color: C.charcoalSoft, lineHeight: 1.7 }}>
            <strong>What are Cut Pieces?</strong> A cut piece is a fixed length of unstitched fabric — printed or embroidered — sold exactly as measured, so you can get it tailored to your own fit. Simply add your preferred cut piece to the cart, place your order, and take it to your tailor once delivered. Fabric type, design and length are listed on every product card.
          </p>
        </div>
      )}

      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "36px 24px 70px", display: "flex", gap: 32 }}>
        {/* FILTER SIDEBAR - desktop */}
        <aside className="almas-filter-sidebar" style={{ width: 230, flexShrink: 0 }}>
          <FilterPanel meta={meta} sub={sub} setSub={setSub} allSizes={allSizes} allColors={allColors} sizeF={sizeF} colorF={colorF} priceF={priceF} priceRanges={priceRanges} toggle={toggle} setSizeF={setSizeF} setColorF={setColorF} setPriceF={setPriceF} category={category} />
        </aside>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, flexWrap: "wrap", gap: 10 }}>
            <button onClick={() => setFiltersOpen(true)} className="almas-filter-btn-mobile" style={{ display: "none", alignItems: "center", gap: 6, border: `1px solid ${C.beigeLine}`, background: "none", padding: "9px 16px", fontFamily: "Manrope", fontSize: 12, cursor: "pointer" }}>
              <SlidersHorizontal size={14} /> Filters
            </button>
            <span style={{ fontFamily: "Manrope", fontSize: 12.5, color: "#8A8272" }}>{list.length} products</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ border: `1px solid ${C.beigeLine}`, background: C.cream, padding: "9px 12px", fontFamily: "Manrope", fontSize: 12.5, color: C.charcoal, cursor: "pointer" }}>
              {["Featured", "Newest", "Price Low to High", "Price High to Low", "Best Selling"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          {list.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <p style={{ fontFamily: "Manrope", color: "#8A8272" }}>No products match these filters.</p>
              <div style={{ marginTop: 14 }}><Btn variant="outline" onClick={() => { setSub("All"); setSizeF([]); setColorF([]); setPriceF(null); }}>Reset Filters</Btn></div>
            </div>
          ) : (
            <div className="almas-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              {list.map((p) => (
                <div key={p.id}>
                  <ProductCard p={p} wishlist={wishlist} toggleWish={toggleWish} go={go} setSelected={setSelected} setQuickView={setQuickView} />
                  {category === "cutpieces" && (
                    <div style={{ fontFamily: "Manrope", fontSize: 11.5, color: "#8A8272", marginTop: 4 }}>{p.fabric} · {p.design} · {p.length}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex", alignItems: "flex-end" }}>
          <div onClick={() => setFiltersOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(28,26,23,0.5)" }} />
          <div style={{ position: "relative", background: C.cream, width: "100%", maxHeight: "80vh", overflowY: "auto", padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontFamily: "Cormorant Garamond", fontSize: 20, fontWeight: 700 }}>Filters</span>
              <button onClick={() => setFiltersOpen(false)} style={{ background: "none", border: "none" }}><X size={20} /></button>
            </div>
            <FilterPanel meta={meta} sub={sub} setSub={setSub} allSizes={allSizes} allColors={allColors} sizeF={sizeF} colorF={colorF} priceF={priceF} priceRanges={priceRanges} toggle={toggle} setSizeF={setSizeF} setColorF={setColorF} setPriceF={setPriceF} category={category} />
            <Btn full onClick={() => setFiltersOpen(false)} style={{ marginTop: 16 }}>Show {list.length} Results</Btn>
          </div>
        </div>
      )}
    </div>
    );
}

function FilterPanel({ meta, sub, setSub, allSizes, allColors, sizeF, colorF, priceF, priceRanges, toggle, setSizeF, setColorF, setPriceF, category }) {
  return (
    <div>
      {meta.subcats.length > 0 && (
        <FilterGroup title="Category">
          {["All", ...meta.subcats].map((s) => (
            <button key={s} onClick={() => setSub(s)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "6px 0", fontFamily: "Manrope", fontSize: 12.5, color: sub === s ? C.gold : C.charcoalSoft, fontWeight: sub === s ? 700 : 500, cursor: "pointer" }}>{s}</button>
          ))}
        </FilterGroup>
      )}
      {allSizes.length > 0 && (
        <FilterGroup title="Size">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {allSizes.map((s) => (
              <button key={s} onClick={() => toggle(sizeF, setSizeF, s)} style={{ padding: "5px 10px", border: `1px solid ${sizeF.includes(s) ? C.charcoal : C.beigeLine}`, background: sizeF.includes(s) ? C.charcoal : "none", color: sizeF.includes(s) ? C.cream : C.charcoal, fontFamily: "Manrope", fontSize: 11, cursor: "pointer" }}>{s}</button>
            ))}
          </div>
        </FilterGroup>
      )}
      {allColors.length > 0 && (
        <FilterGroup title={category === "cutpieces" ? "Color" : "Color"}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {allColors.map((c) => (
              <label key={c} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "Manrope", fontSize: 12.5, color: C.charcoalSoft, cursor: "pointer" }}>
                <input type="checkbox" checked={colorF.includes(c)} onChange={() => toggle(colorF, setColorF, c)} /> {c}
              </label>
            ))}
          </div>
        </FilterGroup>
      )}
      <FilterGroup title="Price">
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {priceRanges.map((r, i) => (
            <label key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "Manrope", fontSize: 12.5, color: C.charcoalSoft, cursor: "pointer" }}>
              <input type="radio" name="price" checked={priceF === r} onChange={() => setPriceF(r)} />
              {r[1] === 999999 ? `Above ${fmt(r[0])}` : `${fmt(r[0])} – ${fmt(r[1])}`}
            </label>
          ))}
          {priceF && <button onClick={() => setPriceF(null)} style={{ background: "none", border: "none", color: C.maroon, fontFamily: "Manrope", fontSize: 11, textAlign: "left", cursor: "pointer", marginTop: 4 }}>Clear price</button>}
        </div>
      </FilterGroup>
      <FilterGroup title="Availability">
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "Manrope", fontSize: 12.5, color: C.charcoalSoft }}>
          <input type="checkbox" defaultChecked disabled /> In Stock Only
        </label>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div style={{ borderBottom: `1px solid ${C.beigeLine}`, padding: "16px 0" }}>
      <div style={{ fontFamily: "Manrope", fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, color: C.charcoal, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}
function ProductDetail({ productId, go, addToCart, wishlist, toggleWish, setSelected, toast }) {
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState(product.sizes?.[0] || "-");
  const [color, setColor] = useState(product.colors?.[0] || "-");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("desc");
  useEffect(() => { setImgIdx(0); setSize(product.sizes?.[0] || "-"); setColor(product.colors?.[0] || "-"); setQty(1); window.scrollTo(0, 0); }, [productId]);

  const gallery = [product.image, IMG.ladiesFormal, IMG.menKurta].slice(0, 3);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div style={{ maxWidth: 1320, margin: "0 auto", padding: "36px 24px 70px" }}>
      <div style={{ fontFamily: "Manrope", fontSize: 11.5, color: "#8A8272", marginBottom: 22 }}>
        <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer", color: "#8A8272" }}>Home</button> /{" "}
        <button onClick={() => go(product.category)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8A8272", textTransform: "capitalize" }}>{product.category}</button> /{" "}
        <span style={{ color: C.charcoal }}>{product.name}</span>
      </div>

      <div className="almas-pd-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        <div>
          <div className="almas-zoom-wrap" style={{ overflow: "hidden" }}>
            <ImgBox src={gallery[imgIdx]} alt={product.name} ratio="4/5" />
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            {gallery.map((g, i) => (
              <button key={i} onClick={() => setImgIdx(i)} style={{ width: 70, border: `2px solid ${imgIdx === i ? C.gold : "transparent"}`, padding: 0, background: "none", cursor: "pointer" }}>
                <ImgBox src={g} alt="thumb" ratio="1/1" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "Manrope", fontSize: 11.5, letterSpacing: "0.15em", color: C.gold, textTransform: "uppercase", fontWeight: 700 }}>{product.brand || "Almas"}</div>
          <h1 style={{ fontFamily: "Cormorant Garamond", fontSize: "clamp(28px,3.5vw,38px)", fontWeight: 600, color: C.charcoal, margin: "8px 0" }}>{product.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Stars rating={product.rating} />
            <span style={{ fontFamily: "Manrope", fontSize: 11.5, color: "#8A8272" }}>({Math.floor(product.rating * 30)} reviews)</span>
          </div>
          <div style={{ margin: "16px 0" }}><Price price={product.price} orig={product.orig} /></div>

          {product.category === "cutpieces" && (
            <div style={{ display: "flex", gap: 24, marginBottom: 16, fontFamily: "Manrope", fontSize: 12.5, color: C.charcoalSoft }}>
              <div><strong>Fabric:</strong> {product.fabric}</div>
              <div><strong>Design:</strong> {product.design}</div>
              <div><strong>Length:</strong> {product.length}</div>
            </div>
          )}
          {product.category === "perfumes" && (
            <div style={{ marginBottom: 16, fontFamily: "Manrope", fontSize: 12.5, color: C.charcoalSoft }}><strong>Size:</strong> {product.size}</div>
          )}

          {product.colors?.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontFamily: "Manrope", fontSize: 12, color: C.charcoalSoft, marginBottom: 8 }}>Color: <strong style={{ color: C.charcoal }}>{color}</strong></div>
              <div style={{ display: "flex", gap: 8 }}>
                {product.colors.map((c) => (
                  <button key={c} onClick={() => setColor(c)} style={{ padding: "8px 16px", border: `1px solid ${color === c ? C.charcoal : C.beigeLine}`, background: color === c ? C.charcoal : "none", color: color === c ? C.cream : C.charcoal, fontFamily: "Manrope", fontSize: 12, cursor: "pointer" }}>{c}</button>
                ))}
              </div>
            </div>
          )}
          {product.sizes?.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "Manrope", fontSize: 12, color: C.charcoalSoft, marginBottom: 8 }}>Size: <strong style={{ color: C.charcoal }}>{size}</strong></div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} style={{ minWidth: 44, padding: "9px 12px", border: `1px solid ${size === s ? C.charcoal : C.beigeLine}`, background: size === s ? C.charcoal : "none", color: size === s ? C.cream : C.charcoal, fontFamily: "Manrope", fontSize: 12, cursor: "pointer" }}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <span style={{ fontFamily: "Manrope", fontSize: 12, color: C.charcoalSoft }}>Quantity</span>
            <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.beigeLine}` }}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ background: "none", border: "none", padding: "8px 14px", cursor: "pointer" }}><Minus size={13} /></button>
              <span style={{ minWidth: 26, textAlign: "center", fontFamily: "Manrope" }}>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} style={{ background: "none", border: "none", padding: "8px 14px", cursor: "pointer" }}><Plus size={13} /></button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <Btn variant="outline" style={{ flex: 1 }} onClick={() => { addToCart(product, size, color, qty); toast("Added to cart."); }}>Add to Cart</Btn>
            <Btn variant="primary" style={{ flex: 1 }} onClick={() => { addToCart(product, size, color, qty); go("checkout"); }}>Buy Now</Btn>
            <button onClick={() => toggleWish(product.id)} style={{ border: `1px solid ${C.beigeLine}`, background: "none", cursor: "pointer", padding: "0 16px" }}>
              <Heart size={18} color={wishlist.includes(product.id) ? C.maroon : C.charcoal} fill={wishlist.includes(product.id) ? C.maroon : "none"} />
            </button>
          </div>

          <div style={{ display: "flex", gap: 22, marginTop: 22, borderTop: `1px solid ${C.beigeLine}`, paddingTop: 18 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <Truck size={16} color={C.gold} style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontFamily: "Manrope", fontSize: 12, fontWeight: 700, color: C.charcoal }}>Delivery</div>
                <div style={{ fontFamily: "Manrope", fontSize: 11.5, color: "#8A8272" }}>2–5 business days across Pakistan</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <RotateCcw size={16} color={C.gold} style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontFamily: "Manrope", fontSize: 12, fontWeight: 700, color: C.charcoal }}>Returns</div>
                <div style={{ fontFamily: "Manrope", fontSize: 11.5, color: "#8A8272" }}>7-day easy exchange</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 30 }}>
            <div style={{ display: "flex", gap: 22, borderBottom: `1px solid ${C.beigeLine}` }}>
              {["desc", "specs", "reviews"].map((t) => (
                <button key={t} onClick={() => setTab(t)} style={{ background: "none", border: "none", padding: "10px 0", fontFamily: "Manrope", fontSize: 12.5, textTransform: "capitalize", color: tab === t ? C.gold : C.charcoalSoft, fontWeight: tab === t ? 700 : 500, borderBottom: tab === t ? `2px solid ${C.gold}` : "none", cursor: "pointer" }}>
                  {t === "desc" ? "Description" : t === "specs" ? "Specifications" : "Reviews"}
                </button>
              ))}
            </div>
            <div style={{ padding: "18px 0", fontFamily: "Manrope", fontSize: 13, color: C.charcoalSoft, lineHeight: 1.75 }}>
              {tab === "desc" && <p>{DESC}</p>}
              {tab === "specs" && (
                <ul style={{ paddingLeft: 18 }}>
                  <li>Brand: {product.brand || "Almas"}</li>
                  <li>Fabric care: Dry clean recommended</li>
                  <li>Origin: Made in Pakistan</li>
                  <li>Category: {product.sub}</li>
                </ul>
              )}
              {tab === "reviews" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[{ n: "Zainab K.", t: "True to size and the colour is exactly as shown. Very happy." }, { n: "Ali Hassan", t: "Great value for the price point, fast delivery to Karachi." }].map((r, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <strong style={{ fontSize: 12.5, color: C.charcoal }}>{r.n}</strong>
                        <Stars rating={4.6} />
                      </div>
                      <p style={{ marginTop: 4 }}>{r.t}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: 70 }}>
          <div style={{ fontFamily: "Manrope", fontSize: 11.5, letterSpacing: "0.25em", color: C.gold, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>You May Also Like</div>
          <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: 28, fontWeight: 600, color: C.charcoal, marginBottom: 26 }}>Related Products</h2>
          <div className="almas-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {related.map((p) => <ProductCard key={p.id} p={p} wishlist={wishlist} toggleWish={toggleWish} go={go} setSelected={setSelected} setQuickView={() => {}} />)}
          </div>
        </div>
      )}

      <div className="almas-sticky-cta" style={{ display: "none" }}>
        <Btn full onClick={() => { addToCart(product, size, color, qty); toast("Added to cart."); }} style={{ flex: 1 }}>Add to Cart</Btn>
        <Btn full variant="gold" onClick={() => { addToCart(product, size, color, qty); go("checkout"); }} style={{ flex: 1 }}>Buy Now</Btn>
      </div>
    </div>
  );
}
function CartPage({ cart, updateQty, removeItem, go }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = cart.length ? (subtotal > 5000 ? 0 : 250) : 0;
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "50px 24px 90px" }}>
      <h1 style={{ fontFamily: "Cormorant Garamond", fontSize: 34, fontWeight: 600, color: C.charcoal, marginBottom: 30 }}>Shopping Cart</h1>
      {cart.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <ShoppingBag size={40} color={C.beigeLine} style={{ margin: "0 auto 16px" }} />
          <p style={{ fontFamily: "Manrope", color: "#8A8272", marginBottom: 20 }}>Your cart is empty.</p>
          <Btn onClick={() => go("home")}>Continue Shopping</Btn>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 40 }} className="almas-cart-grid">
          <div style={{ flex: 2 }}>
            {cart.map((item) => (
              <div key={item.key} style={{ display: "flex", gap: 16, padding: "20px 0", borderBottom: `1px solid ${C.beigeLine}` }}>
                <div style={{ width: 100 }}><ImgBox src={item.image} alt={item.name} ratio="4/5" /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Manrope", fontSize: 14, fontWeight: 700, color: C.charcoal }}>{item.name}</div>
                  <div style={{ fontFamily: "Manrope", fontSize: 12, color: "#8A8272", marginTop: 4 }}>{item.size !== "-" ? `Size: ${item.size}` : ""} {item.color !== "-" ? ` · Color: ${item.color}` : ""}</div>
                  <div style={{ marginTop: 8 }}><Price price={item.price} /></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.beigeLine}` }}>
                      <button onClick={() => updateQty(item.key, -1)} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px 10px" }}><Minus size={12} /></button>
                      <span style={{ fontSize: 13, minWidth: 22, textAlign: "center", fontFamily: "Manrope" }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, 1)} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px 10px" }}><Plus size={12} /></button>
                    </div>
                    <button onClick={() => removeItem(item.key)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Manrope", fontSize: 12, color: C.maroon, textDecoration: "underline" }}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <Btn variant="outline" onClick={() => go("home")} style={{ marginTop: 20 }}>Continue Shopping</Btn>
          </div>
          <div style={{ flex: 1, background: C.creamDeep, padding: 26, height: "fit-content" }}>
            <div style={{ fontFamily: "Cormorant Garamond", fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Order Summary</div>
            <Row label="Subtotal" value={fmt(subtotal)} />
            <Row label="Delivery" value={delivery === 0 ? "Free" : fmt(delivery)} />
            <div style={{ borderTop: `1px dashed ${C.beigeLine}`, margin: "10px 0" }} />
            <Row label="Total" value={fmt(subtotal + delivery)} bold />
            <Btn full onClick={() => go("checkout")} style={{ marginTop: 16 }}>Proceed to Checkout</Btn>
          </div>
        </div>
      )}
    </div>
  );
}
const PK_CITIES = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala", "Hyderabad", "Bahawalpur"];
const PK_PROVINCES = ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Gilgit-Baltistan", "Islamabad Capital Territory", "Azad Jammu & Kashmir"];

function CheckoutPage({ cart, go, placeOrder, toast }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = cart.length ? (subtotal > 5000 ? 0 : 250) : 0;
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "Lahore", province: "Punjab", postal: "", notes: "", payment: "cod" });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Full name is required.";
    if (!/^(\+92|0)3\d{9}$/.test(form.phone.replace(/[\s-]/g, ""))) err.phone = "Enter a valid Pakistani mobile e.g. 03XX-XXXXXXX.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email address.";
    if (!form.address.trim()) err.address = "Address is required.";
    if (!form.postal.trim()) err.postal = "Postal code is required.";
    setErrors(err);
    if (Object.keys(err).length === 0) {
      if (cart.length === 0) { toast("Your cart is empty."); return; }
      placeOrder(form, subtotal + delivery);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "70px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "Manrope", color: "#8A8272", marginBottom: 20 }}>Your cart is empty — add something you love first.</p>
        <Btn onClick={() => go("home")}>Continue Shopping</Btn>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "50px 24px 100px" }}>
      <h1 style={{ fontFamily: "Cormorant Garamond", fontSize: 32, fontWeight: 600, color: C.charcoal, marginBottom: 30 }}>Checkout</h1>
      <form onSubmit={submit} style={{ display: "flex", gap: 40 }} className="almas-cart-grid">
        <div style={{ flex: 2 }}>
          <FieldGroup title="Contact & Delivery Details">
            <Field label="Full Name *" value={form.name} onChange={(v) => set("name", v)} error={errors.name} />
            <div style={{ display: "flex", gap: 14 }} className="almas-field-row">
              <Field label="Phone Number *" placeholder="03XX-XXXXXXX" value={form.phone} onChange={(v) => set("phone", v)} error={errors.phone} />
              <Field label="Email" placeholder="optional" value={form.email} onChange={(v) => set("email", v)} error={errors.email} />
            </div>
            <Field label="Complete Address *" value={form.address} onChange={(v) => set("address", v)} error={errors.address} textarea />
            <div style={{ display: "flex", gap: 14 }} className="almas-field-row">
              <SelectField label="City" value={form.city} onChange={(v) => set("city", v)} options={PK_CITIES} />
              <SelectField label="Province" value={form.province} onChange={(v) => set("province", v)} options={PK_PROVINCES} />
            </div>
            <Field label="Postal Code *" value={form.postal} onChange={(v) => set("postal", v)} error={errors.postal} />
            <Field label="Order Notes" value={form.notes} onChange={(v) => set("notes", v)} textarea placeholder="Delivery instructions, gift note, etc. (optional)" />
          </FieldGroup>

          <FieldGroup title="Payment Method">
            {[
              { k: "cod", t: "Cash on Delivery", d: "Pay when your order arrives." },
              { k: "bank", t: "Bank Transfer", d: "Transfer details sent after order confirmation." },
              { k: "online", t: "Online Payment", d: "Pay securely via card or wallet." },
            ].map((o) => (
              <label key={o.k} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px", border: `1px solid ${form.payment === o.k ? C.charcoal : C.beigeLine}`, marginBottom: 10, cursor: "pointer" }}>
                <input type="radio" name="payment" checked={form.payment === o.k} onChange={() => set("payment", o.k)} style={{ marginTop: 3 }} />
                <div>
                  <div style={{ fontFamily: "Manrope", fontSize: 13, fontWeight: 700, color: C.charcoal }}>{o.t}</div>
                  <div style={{ fontFamily: "Manrope", fontSize: 11.5, color: "#8A8272" }}>{o.d}</div>
                </div>
              </label>
            ))}
          </FieldGroup>
        </div>

        <div style={{ flex: 1, height: "fit-content" }}>
          <div style={{ background: C.creamDeep, padding: 26 }}>
            <div style={{ fontFamily: "Cormorant Garamond", fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Order Summary</div>
            {cart.map((item) => (
              <div key={item.key} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 50 }}><ImgBox src={item.image} alt={item.name} ratio="4/5" /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Manrope", fontSize: 12, fontWeight: 700 }}>{item.name}</div>
                  <div style={{ fontFamily: "Manrope", fontSize: 11, color: "#8A8272" }}>Qty {item.qty}{item.size !== "-" ? ` · ${item.size}` : ""}</div>
                </div>
                <div style={{ fontFamily: "Manrope", fontSize: 12, fontWeight: 700 }}>{fmt(item.price * item.qty)}</div>
              </div>
            ))}
            <div style={{ borderTop: `1px dashed ${C.beigeLine}`, margin: "10px 0" }} />
            <Row label="Subtotal" value={fmt(subtotal)} />
            <Row label="Delivery" value={delivery === 0 ? "Free" : fmt(delivery)} />
            <div style={{ borderTop: `1px dashed ${C.beigeLine}`, margin: "10px 0" }} />
            <Row label="Total" value={fmt(subtotal + delivery)} bold />
            <Btn full type="submit" style={{ marginTop: 18 }}>Place Order</Btn>
          </div>
        </div>
      </form>
    </div>
  );
}

function FieldGroup({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontFamily: "Cormorant Garamond", fontSize: 20, fontWeight: 700, color: C.charcoal, marginBottom: 14 }}>{title}</div>
      {children}
    </div>
  );
}
function Field({ label, value, onChange, error, textarea, placeholder }) {
  return (
    <div style={{ marginBottom: 14, flex: 1 }}>
      <label style={{ display: "block", fontFamily: "Manrope", fontSize: 11.5, color: C.charcoalSoft, marginBottom: 5 }}>{label}</label>
      {textarea ? (
        <textarea value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} rows={3} style={{ width: "100%", border: `1px solid ${error ? C.maroon : C.beigeLine}`, padding: "10px 12px", fontFamily: "Manrope", fontSize: 13, outline: "none", resize: "vertical", background: C.cream }} />
      ) : (
        <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", border: `1px solid ${error ? C.maroon : C.beigeLine}`, padding: "10px 12px", fontFamily: "Manrope", fontSize: 13, outline: "none", background: C.cream }} />
      )}
      {error && <div style={{ fontFamily: "Manrope", fontSize: 11, color: C.maroon, marginTop: 4 }}>{error}</div>}
    </div>
  );
}
function SelectField({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 14, flex: 1 }}>
      <label style={{ display: "block", fontFamily: "Manrope", fontSize: 11.5, color: C.charcoalSoft, marginBottom: 5 }}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", border: `1px solid ${C.beigeLine}`, padding: "10px 12px", fontFamily: "Manrope", fontSize: 13, background: C.cream, cursor: "pointer" }}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* ORDER CONFIRMATION                                                     */
/* ---------------------------------------------------------------------- */
function OrderConfirmation({ order, go }) {
  if (!order) return (
    <div style={{ textAlign: "center", padding: "90px 24px" }}>
      <p style={{ fontFamily: "Manrope", color: "#8A8272" }}>No recent order found.</p>
      <div style={{ marginTop: 16 }}><Btn onClick={() => go("home")}>Return Home</Btn></div>
    </div>
  );
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "70px 24px 100px", textAlign: "center" }}>
      <div style={{ width: 62, height: 62, borderRadius: "50%", background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px" }}>
        <Check size={30} color={C.white} />
      </div>
      <h1 style={{ fontFamily: "Cormorant Garamond", fontSize: 34, fontWeight: 600, color: C.charcoal }}>Thank You For Your Order!</h1>
      <p style={{ fontFamily: "Manrope", fontSize: 13.5, color: "#8A8272", marginTop: 10 }}>A confirmation has been noted against order <strong style={{ color: C.charcoal }}>{order.number}</strong>.</p>

      <div style={{ background: C.creamDeep, padding: 26, marginTop: 30, textAlign: "left" }}>
        <Row label="Order Number" value={order.number} bold />
        <Row label="Customer" value={order.form.name} />
        <Row label="Delivery Address" value={`${order.form.address}, ${order.form.city}`} />
        <Row label="Payment Method" value={order.form.payment === "cod" ? "Cash on Delivery" : order.form.payment === "bank" ? "Bank Transfer" : "Online Payment"} />
        <div style={{ borderTop: `1px dashed ${C.beigeLine}`, margin: "12px 0" }} />
        {order.items.map((i) => (
          <Row key={i.key} label={`${i.name} × ${i.qty}`} value={fmt(i.price * i.qty)} />
        ))}
        <div style={{ borderTop: `1px dashed ${C.beigeLine}`, margin: "12px 0" }} />
        <Row label="Total Amount" value={fmt(order.total)} bold />
        <Row label="Estimated Delivery" value="3–5 business days" />
      </div>

      <div style={{ marginTop: 30 }}><Btn onClick={() => go("home")}>Continue Shopping</Btn></div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* ABOUT / CONTACT                                                        */
/* ---------------------------------------------------------------------- */
function AboutPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "70px 24px 90px" }}>
      <div style={{ fontFamily: "Manrope", fontSize: 11.5, letterSpacing: "0.25em", color: C.gold, textTransform: "uppercase", fontWeight: 700 }}>Our Story</div>
      <h1 style={{ fontFamily: "Cormorant Garamond", fontSize: 40, fontWeight: 600, color: C.charcoal, margin: "10px 0 24px" }}>Crafted In Lahore, Worn Across Pakistan</h1>
      <ImgBox src={IMG.hero2} alt="Almas atelier" ratio="16/7" />
      <p style={{ fontFamily: "Manrope", fontSize: 14.5, color: C.charcoalSoft, lineHeight: 1.9, marginTop: 26 }}>
        Almas began as a small tailoring studio with one belief: that everyday clothing should feel considered. Today we design menswear, womenswear, unstitched fabric and fragrance for customers across Pakistan, without compromising on the fit, fabric and finish that first defined us. Every piece passes through our own quality checks before it reaches your door.
      </p>
      <div className="almas-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 40 }}>
        {[{ n: "8+", l: "Years Tailoring" }, { n: "50k+", l: "Happy Customers" }, { n: "4", l: "Cities With Studios" }].map((s, i) => (
          <div key={i} style={{ textAlign: "center", border: `1px solid ${C.beigeLine}`, padding: 24 }}>
            <div style={{ fontFamily: "Cormorant Garamond", fontSize: 32, color: C.gold, fontWeight: 700 }}>{s.n}</div>
            <div style={{ fontFamily: "Manrope", fontSize: 12, color: "#8A8272", marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPage({ toast }) {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "70px 24px 90px" }}>
      <div style={{ fontFamily: "Manrope", fontSize: 11.5, letterSpacing: "0.25em", color: C.gold, textTransform: "uppercase", fontWeight: 700 }}>Get In Touch</div>
      <h1 style={{ fontFamily: "Cormorant Garamond", fontSize: 36, fontWeight: 600, color: C.charcoal, margin: "10px 0 30px" }}>Contact Us</h1>
      <div style={{ display: "flex", gap: 40 }} className="almas-cart-grid">
        <form onSubmit={(e) => { e.preventDefault(); if (f.name && /^\S+@\S+\.\S+$/.test(f.email) && f.message) { toast("Message sent — we'll respond within 24 hours."); setF({ name: "", email: "", message: "" }); } else toast("Please fill all fields with a valid email."); }} style={{ flex: 1.4 }}>
          <Field label="Full Name" value={f.name} onChange={(v) => setF({ ...f, name: v })} />
          <Field label="Email" value={f.email} onChange={(v) => setF({ ...f, email: v })} />
          <Field label="Message" value={f.message} onChange={(v) => setF({ ...f, message: v })} textarea />
          <Btn type="submit" style={{ marginTop: 6 }}>Send Message</Btn>
        </form>
        <div style={{ flex: 1 }}>
          {[{ icon: MapPin, t: "Visit Us", d: "12-C, MM Alam Road, Gulberg III, Lahore" }, { icon: Phone, t: "Call Us", d: "+92 300 1234567" }, { icon: Mail, t: "Email Us", d: "care@almas.pk" }].map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 22 }}>
              <c.icon size={18} color={C.gold} style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontFamily: "Manrope", fontSize: 12.5, fontWeight: 700, color: C.charcoal }}>{c.t}</div>
                <div style={{ fontFamily: "Manrope", fontSize: 12.5, color: "#8A8272" }}>{c.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
              }
function Footer({ go }) {
  return (
    <footer style={{ background: C.charcoal, color: C.cream, padding: "56px 24px 24px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div className="almas-grid-4" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 32, paddingBottom: 36 }}>
          <div>
            <div style={{ fontFamily: "Cormorant Garamond", fontSize: 26, fontWeight: 700 }}>ALMAS</div>
            <p style={{ fontFamily: "Manrope", fontSize: 12.5, color: "rgba(248,244,234,0.65)", marginTop: 12, lineHeight: 1.7, maxWidth: 280 }}>Premium Pakistani fashion — menswear, womenswear, unstitched fabric and fragrance, made for everyday elegance.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: C.cream }}><Instagram size={17} /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: C.cream }}><Facebook size={17} /></a>
            </div>
          </div>
          <FooterCol title="Quick Links" links={[["Men's", "men"], ["Ladies", "ladies"], ["Cut Pieces", "cutpieces"], ["Perfumes", "perfumes"]]} go={go} />
          <FooterCol title="Help" links={[["About Us", "about"], ["Contact", "contact"], ["New Arrivals", "newarrivals"], ["Sale", "sale"]]} go={go} />
          <div>
            <div style={{ fontFamily: "Manrope", fontSize: 11.5, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, color: C.goldLight, marginBottom: 14 }}>Contact</div>
            <div style={{ fontFamily: "Manrope", fontSize: 12.5, color: "rgba(248,244,234,0.75)", lineHeight: 2 }}>
              MM Alam Road, Lahore<br />+92 300 1234567<br />care@almas.pk
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(248,244,234,0.15)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 18, fontFamily: "Manrope", fontSize: 11.5, color: "rgba(248,244,234,0.6)", flexWrap: "wrap" }}>
            <span style={{ cursor: "pointer" }}>Privacy Policy</span><span style={{ cursor: "pointer" }}>Terms & Conditions</span><span style={{ cursor: "pointer" }}>Return Policy</span>
          </div>
          <div style={{ fontFamily: "Manrope", fontSize: 11.5, color: "rgba(248,244,234,0.5)" }}>© 2026 Almas. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, links, go }) {
  return (
    <div>
      <div style={{ fontFamily: "Manrope", fontSize: 11.5, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, color: C.goldLight, marginBottom: 14 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {links.map(([label, key]) => (
          <button key={key} onClick={() => go(key)} style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "Manrope", fontSize: 12.5, color: "rgba(248,244,234,0.75)" }}>{label}</button>
        ))}
      </div>
    </div>
  );
}

function WhatsAppButton() {
  return (
    <button onClick={() => window.open("https://wa.me/923001234567", "_blank")} style={{ position: "fixed", bottom: 22, right: 22, zIndex: 300, width: 54, height: 54, borderRadius: "50%", background: "#25D366", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(0,0,0,0.25)" }} aria-label="Chat on WhatsApp">
      <MessageCircle size={24} color="#fff" fill="#fff" />
    </button>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{ position: "fixed", bottom: 90, left: "50%", transform: "translateX(-50%)", zIndex: 800, background: C.charcoal, color: C.cream, padding: "13px 22px", fontFamily: "Manrope", fontSize: 13, boxShadow: "0 6px 20px rgba(0,0,0,0.25)", maxWidth: "88vw", textAlign: "center" }}>
      {message}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* APP                                                                    */
/* ---------------------------------------------------------------------- */
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickViewId, setQuickViewId] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [lastOrder, setLastOrder] = useState(null);

  const toast = (msg) => { setToastMsg(msg); clearTimeout(window.__almasToastTimer); window.__almasToastTimer = setTimeout(() => setToastMsg(""), 3200); };
  const go = (p) => { setPage(p); window.scrollTo(0, 0); };

  const addToCart = (product, size, color, qty) => {
    setCart((c) => {
      const key = `${product.id}-${size}-${color}`;
      const found = c.find((i) => i.key === key);
      if (found) return c.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...c, { key, productId: product.id, name: product.name, image: product.image, price: product.price, size: size || "-", color: color || "-", qty }];
    });
    toast(`${product.name} added to your bag.`);
  };
  const updateQty = (key, delta) => setCart((c) => c.map((i) => (i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i)).filter((i) => i.qty > 0));
  const removeItem = (key) => setCart((c) => c.filter((i) => i.key !== key));
  const toggleWish = (id) => setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  const placeOrder = (form, total) => {
    const number = "ALM-" + Math.floor(100000 + Math.random() * 900000);
    setLastOrder({ number, form, total, items: cart });
    setCart([]);
    go("confirmation");
  };

  const quickViewProduct = PRODUCTS.find((p) => p.id === quickViewId);

  return (
    <div style={{ fontFamily: "Manrope, sans-serif", background: C.cream, minHeight: "100vh" }}>
      <style>{`
        ${FONTS}
        * { box-sizing: border-box; }
        body { margin: 0; }
        button { font-family: Manrope, sans-serif; }
        input, textarea, select { font-family: Manrope, sans-serif; }
        .almas-card-img:hover .almas-quickview-btn { opacity: 1; }
        ::selection { background: ${C.gold}; color: white; }

        @media (max-width: 1024px) {
          .almas-navlinks { display: none !important; }
          .almas-hamburger { display: block !important; }
          .almas-grid-4 { grid-template-columns: repeat(2,1fr) !important; }
          .almas-grid-3 { grid-template-columns: repeat(2,1fr) !important; }
          .almas-grid-6 { grid-template-columns: repeat(3,1fr) !important; }
          .almas-pd-grid { grid-template-columns: 1fr !important; }
          .almas-cart-grid { flex-direction: column !important; }
          .almas-filter-sidebar { display: none !important; }
          .almas-filter-btn-mobile { display: flex !important; }
          .almas-vert-tag { display: none !important; }
          .almas-field-row { flex-direction: column !important; gap: 0 !important; }
        }
        @media (max-width: 640px) {
          .almas-grid-4 { grid-template-columns: repeat(2,1fr) !important; gap: 14px !important; }
          .almas-grid-3 { grid-template-columns: repeat(2,1fr) !important; gap: 14px !important; }
          .almas-grid-6 { grid-template-columns: repeat(3,1fr) !important; }
          .almas-icon-hide-sm { display: none !important; }
        }
      `}</style>

      <Header go={go} cartCount={cart.reduce((s, i) => s + i.qty, 0)} wishCount={wishlist.length} setSearchOpen={setSearchOpen} setCartOpen={setCartOpen} setWishOpen={setWishOpen} setMobileOpen={setMobileOpen} toast={toast} currentPage={page} />

      <main>
        {page === "home" && <Home go={go} wishlist={wishlist} toggleWish={toggleWish} setSelected={setSelectedProduct} setQuickView={setQuickViewId} toast={toast} />}
        {["men", "ladies", "cutpieces", "perfumes", "newarrivals", "sale"].includes(page) && (
          <ListingPage category={page} wishlist={wishlist} toggleWish={toggleWish} go={go} setSelected={setSelectedProduct} setQuickView={setQuickViewId} />
        )}
        {page === "product" && <ProductDetail productId={selectedProduct} go={go} addToCart={addToCart} wishlist={wishlist} toggleWish={toggleWish} setSelected={setSelectedProduct} toast={toast} />}
        {page === "cart" && <CartPage cart={cart} updateQty={updateQty} removeItem={removeItem} go={go} />}
        {page === "checkout" && <CheckoutPage cart={cart} go={go} placeOrder={placeOrder} toast={toast} />}
        {page === "confirmation" && <OrderConfirmation order={lastOrder} go={go} />}
        {page === "about" && <AboutPage />}
        {page === "contact" && <ContactPage toast={toast} />}
      </main>

      <Footer go={go} />
      <WhatsAppButton />
      <Toast message={toastMsg} />

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} go={go} currentPage={page} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} products={PRODUCTS} go={go} setSelected={setSelectedProduct} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} updateQty={updateQty} removeItem={removeItem} go={go} setCartOpen={setCartOpen} />
      <WishDrawer open={wishOpen} onClose={() => setWishOpen(false)} wishlist={wishlist} products={PRODUCTS} toggleWish={toggleWish} addToCart={addToCart} go={go} setSelected={setSelectedProduct} setQuickView={setQuickViewId} />
      {quickViewProduct && <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewId(null)} addToCart={addToCart} wishlist={wishlist} toggleWish={toggleWish} go={go} setSelected={setSelectedProduct} />}
    </div>
  );
                                                                                        }
