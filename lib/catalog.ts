export interface Jewellery {
  id: string;
  name: string;
  type: "necklace" | "earring" | "bangle" | "ring";
  style: string;
  occasion: string;
  metal: "kundan" | "diamond" | "gold" | "silver";
  stones: string[];
  primary_color: string;
  secondary_color: string;
  accent?: string;
  weight: "light" | "medium" | "medium-heavy" | "heavy";
  dress_match: string[];
  vibe: string;
  image: string;
  description: string;
  price?: number;
}

export const CATALOG: Jewellery[] = [
  {
    id: "new_diamond_ring_1",
    name: "Solitaire Diamond Engagement Ring",
    type: "ring",
    style: "solitaire",
    occasion: "wedding",
    metal: "diamond",
    stones: ["diamond"],
    primary_color: "silver",
    secondary_color: "transparent",
    weight: "light",
    dress_match: ["all"],
    vibe: "elegant, classic",
    image: "/R1.webp",
    description: "A classic solitaire diamond ring, perfect for engagements and special promises.",
  },
  {
    id: "new_diamond_ring_2",
    name: "Halo Cut Diamond Ring",
    type: "ring",
    style: "halo",
    occasion: "wedding",
    metal: "diamond",
    stones: ["diamond"],
    primary_color: "silver",
    secondary_color: "transparent",
    weight: "medium",
    dress_match: ["all"],
    vibe: "glamorous, modern",
    image: "/R2.webp",
    description: "A stunning halo cut diamond ring that maximizes sparkle and brilliance.",
  },
  {
    id: "modern_earring_1",
    name: "Crystal Drop Modern Earrings",
    type: "earring",
    style: "drop",
    occasion: "party",
    metal: "silver",
    stones: ["crystal"],
    primary_color: "silver",
    secondary_color: "transparent",
    weight: "light",
    dress_match: ["western", "modern"],
    vibe: "chic, modern",
    image: "/1.webp",
    description: "Contemporary crystal drop earrings for a chic, modern look.",
  },
  {
    id: "modern_earring_2",
    name: "Gold Plated Hoop Earrings",
    type: "earring",
    style: "hoop",
    occasion: "daily",
    metal: "gold",
    stones: [],
    primary_color: "gold",
    secondary_color: "none",
    weight: "light",
    dress_match: ["casual", "office"],
    vibe: "minimalist, classic",
    image: "/2.webp",
    description: "Classic gold plated hoops, a versatile essential for any jewelry collection.",
  },
  {
    id: "modern_earring_3",
    name: "Pearl Stud Earrings",
    type: "earring",
    style: "stud",
    occasion: "daily",
    metal: "gold",
    stones: ["pearl"],
    primary_color: "white",
    secondary_color: "gold",
    weight: "light",
    dress_match: ["formal", "casual"],
    vibe: "elegant, timeless",
    image: "/3.webp",
    description: "Timeless pearl stud earrings that add a touch of sophistication to any outfit.",
  },
  {
    id: "modern_earring_4",
    name: "Oxidized Silver Jhumkas",
    type: "earring",
    style: "jhumka",
    occasion: "festive",
    metal: "silver",
    stones: [],
    primary_color: "silver",
    secondary_color: "black",
    weight: "medium",
    dress_match: ["ethnic", "fusion"],
    vibe: "boho, traditional",
    image: "/4.webp",
    description: "Beautiful oxidized silver jhumkas perfect for festive and ethnic wear.",
  },
  {
    id: "modern_earring_5",
    name: "Ruby Emerald Statement Earrings",
    type: "earring",
    style: "chandbali",
    occasion: "wedding",
    metal: "gold",
    stones: ["ruby", "emerald"],
    primary_color: "gold",
    secondary_color: "multicolor",
    weight: "heavy",
    dress_match: ["traditional", "wedding"],
    vibe: "royal, statement",
    image: "/5.webp",
    description: "Grand statement earrings featuring ruby and emerald stones in a traditional setting.",
  },
  {
    id: "anjar_polki_emerald_necklace",
    name: "Anjar Polki Emerald Pearl Bridal Necklace Set",
    type: "necklace",
    style: "choker",
    occasion: "wedding",
    metal: "kundan",
    stones: ["polki"],
    primary_color: "green",
    secondary_color: "gold",
    accent: "pearls",
    weight: "heavy",
    dress_match: ["green", "beige", "gold", "ivory"],
    vibe: "traditional, royal, heritage",
    image: "/F.jpg",
    description: "A traditional polki kundan bridal necklace featuring emerald green drops and pearl hangings. Designed as a heavy statement piece, perfect for wedding ceremonies and grand bridal looks.",
  },
  {
    id: "ruby_diamond_bridal_choker",
    name: "Ruby Diamond-Look Bridal Choker Necklace",
    type: "necklace",
    style: "choker",
    occasion: "wedding",
    metal: "diamond",
    stones: ["diamond-look", "ruby"],
    primary_color: "maroon",
    secondary_color: "silver",
    accent: "crystal",
    weight: "heavy",
    dress_match: ["maroon", "wine", "red", "gold"],
    vibe: "luxury, bold, statement",
    image: "/A.jpg",
    description: "A heavy bridal choker featuring diamond-look stones and deep maroon ruby accents. Designed for wedding ceremonies and receptions, offering a bold and luxurious statement bridal look.",
  },
  {
    id: "ruby_layered_diamond_choker",
    name: "Ruby Diamond-Look Layered Bridal Choker",
    type: "necklace",
    style: "choker",
    occasion: "wedding",
    metal: "diamond",
    stones: ["diamond-look", "ruby"],
    primary_color: "maroon",
    secondary_color: "silver",
    weight: "heavy",
    dress_match: ["maroon", "wine", "red"],
    vibe: "glamorous, bold, bridal",
    image: "/B.jpg",
    description: "This layered ruby diamond-look choker is designed for brides who want a bold, high-impact look. Crafted with multiple rows of sparkling diamond-style stones and finished with deep maroon ruby drops, the choker creates a dramatic and luxurious bridal presence.",
  },
  {
    id: "floral_ruby_diamond_necklace",
    name: "Floral Ruby Diamond Bridal Necklace",
    type: "necklace",
    style: "necklace",
    occasion: "wedding",
    metal: "diamond",
    stones: ["ruby", "diamond-look"],
    primary_color: "maroon",
    secondary_color: "silver",
    weight: "medium-heavy",
    dress_match: ["maroon", "pink", "ivory"],
    vibe: "romantic, traditional, bridal",
    image: "/C.jpg",
    description: "Inspired by floral motifs, this ruby diamond-look bridal necklace offers a softer yet elegant take on traditional bridal jewellery. The maroon ruby stones are arranged in delicate floral patterns, accented with diamond-style detailing.",
  },
  {
    id: "afia_polki_emerald_double_layer",
    name: "Afia Polki Emerald Pearl Double-Layer Necklace",
    type: "necklace",
    style: "layered",
    occasion: "wedding",
    metal: "kundan",
    stones: ["polki", "emerald"],
    primary_color: "green",
    secondary_color: "gold",
    accent: "pearls",
    weight: "heavy",
    dress_match: ["green", "gold", "beige", "ivory"],
    vibe: "heritage, royal, traditional",
    image: "/D.jpg",
    description: "The Afia necklace is a classic example of traditional polki kundan craftsmanship. Designed with emerald green stones and finished with elegant pearl drops, this double-layer necklace adds depth and richness to any bridal look.",
  },
  {
    id: "aiza_polki_ruby_emerald_choker",
    name: "Aiza Polki Ruby Emerald Pearl Bridal Choker",
    type: "necklace",
    style: "choker",
    occasion: "wedding",
    metal: "kundan",
    stones: ["polki", "ruby", "emerald"],
    primary_color: "multicolor",
    secondary_color: "gold",
    accent: "pearls",
    weight: "heavy",
    dress_match: ["red", "green", "gold", "ivory"],
    vibe: "traditional, festive, bridal",
    image: "/E.jpg",
    description: "The Aiza necklace brings together ruby and emerald tones in a refined polki kundan setting, finished with soft pearl drops. This versatile bridal piece is perfect for brides who want a multi-colored necklace.",
  },
  {
    id: "kastur_kundan_emerald_choker",
    name: "Kastur Kundan Emerald Pearl Bridal Choker",
    type: "necklace",
    style: "choker",
    occasion: "wedding",
    metal: "kundan",
    stones: ["polki"],
    primary_color: "green",
    secondary_color: "gold",
    accent: "pearls",
    weight: "heavy",
    dress_match: ["green", "gold", "beige", "ivory"],
    vibe: "heritage, traditional, royal",
    image: "/L.jpg",
    description: "A traditional kundan-polki bridal choker featuring emerald green bead drops and pearl hangings. Designed for wedding ceremonies, this piece offers a rich heritage look.",
  },
  {
    id: "maharani_polki_emerald_ruby_necklace",
    name: "Maharani Polki Emerald Ruby Pearl Bridal Necklace",
    type: "necklace",
    style: "layered",
    occasion: "wedding",
    metal: "kundan",
    stones: ["polki", "ruby", "emerald"],
    primary_color: "multicolor",
    secondary_color: "gold",
    accent: "pearls",
    weight: "heavy",
    dress_match: ["red", "maroon", "green", "gold"],
    vibe: "royal, opulent, bridal",
    image: "/M.jpg",
    description: "A grand layered polki kundan bridal necklace featuring ruby and emerald accents with pearl drops. Designed for brides seeking a royal and opulent look.",
  },
  {
    id: "ruby_diamond_layered_choker",
    name: "Ruby Diamond-Look Layered Bridal Choker",
    type: "necklace",
    style: "choker",
    occasion: "wedding",
    metal: "diamond",
    stones: ["diamond-look", "ruby"],
    primary_color: "maroon",
    secondary_color: "silver",
    weight: "heavy",
    dress_match: ["maroon", "wine", "red", "pink"],
    vibe: "glamorous, modern, statement",
    image: "/N.jpg",
    description: "A layered diamond-look bridal choker accented with deep maroon ruby elements. Designed for brides who prefer a glamorous, modern aesthetic.",
  },
  {
    id: "emerald_diamond_layered_necklace",
    name: "Emerald Diamond-Look Layered Bridal Necklace",
    type: "necklace",
    style: "layered",
    occasion: "wedding",
    metal: "diamond",
    stones: ["diamond-look", "emerald"],
    primary_color: "green",
    secondary_color: "silver",
    weight: "heavy",
    dress_match: ["green", "emerald", "gold", "ivory"],
    vibe: "elegant, regal, bridal",
    image: "/jewellery/K.jpg",
    description: "This emerald diamond-look layered necklace is crafted for brides who prefer a refined yet impactful bridal look. Featuring sparkling diamond-style stones accented with deep emerald green highlights.",
  },
  {
    id: "emerald_diamond_floral_choker",
    name: "Emerald Diamond-Look Floral Bridal Choker",
    type: "necklace",
    style: "choker",
    occasion: "wedding",
    metal: "diamond",
    stones: ["diamond-look", "emerald"],
    primary_color: "green",
    secondary_color: "silver",
    weight: "heavy",
    dress_match: ["green", "emerald", "gold"],
    vibe: "modern, regal, bridal",
    image: "/O.jpg",
    description: "A striking diamond-look bridal choker featuring an emerald green floral centerpiece. The intricate lattice design and high-polish finish give this piece a modern yet royal aesthetic.",
  },
  {
    id: "long_maroon_earrings",
    name: "Long Maroon Pearl Drop Earrings",
    type: "earring",
    style: "jhumka",
    occasion: "wedding",
    metal: "kundan",
    stones: ["pearl", "ruby"],
    primary_color: "maroon",
    secondary_color: "gold",
    weight: "heavy",
    dress_match: ["maroon", "wine", "red"],
    vibe: "traditional, elegant",
    image: "/long_maroon_earrings.jpg",
    description: "Elegant long maroon pearl drop earrings that match the maroon gemstone tone for a cohesive bridal set.",
  },
  {
    id: "circular_ruby_earrings",
    name: "Circular Ruby Stud Earrings",
    type: "earring",
    style: "stud",
    occasion: "wedding",
    metal: "kundan",
    stones: ["ruby"],
    primary_color: "maroon",
    secondary_color: "gold",
    weight: "light",
    dress_match: ["maroon", "wine", "red"],
    vibe: "comfortable, elegant",
    image: "/circular_ruby_earrings.jpg",
    description: "Comfortable circular ruby stud earrings that maintain a bridal feel without being too long. Ideal for all-day comfort.",
  },
  {
    id: "ruby_diamond_bracelet",
    name: "Ruby Diamond-Look Double Layer Bracelet",
    type: "bangle",
    style: "bangle",
    occasion: "wedding",
    metal: "diamond",
    stones: ["diamond-look", "ruby"],
    primary_color: "maroon",
    secondary_color: "silver",
    weight: "heavy",
    dress_match: ["maroon", "wine", "red"],
    vibe: "glamorous, bold",
    image: "/ruby_diamond_bracelet.jpg",
    description: "Stunning double-layer ruby diamond-look bracelet that complements your bridal set beautifully.",
  },

  {
    id: "aarohi_ruby_cascade_earrings",
    name: "Aarohi Ruby Cascade Diamond-Style Earrings",
    type: "earring",
    style: "long",
    occasion: "wedding",
    metal: "diamond",
    stones: ["diamond-look", "ruby"],
    primary_color: "maroon",
    secondary_color: "silver",
    weight: "heavy",
    dress_match: ["maroon", "wine", "red"],
    vibe: "regal, statement",
    image: "/X.jpg",
    description: "Statement bridal earrings featuring cascading leaf motifs in a diamond-style finish, accented with deep ruby gemstones. Designed for brides who prefer a bold, elongated silhouette that adds grandeur to their wedding look."
  },

  {
    id: "kumudini_ruby_bloom_studs",
    name: "Kumudini Ruby Bloom Diamond Stud Earrings",
    type: "earring",
    style: "stud",
    occasion: "wedding",
    metal: "diamond",
    stones: ["diamond-look", "ruby"],
    primary_color: "maroon",
    secondary_color: "silver",
    weight: "medium",
    dress_match: ["maroon", "wine", "red"],
    vibe: "elegant, comfortable",
    image: "/Y.jpg",
    description: "Elegant circular stud earrings crafted with ruby-toned stones arranged in a floral pattern around a diamond-style center. Offers a rich bridal appearance while remaining comfortable for long wedding ceremonies."
  },

  {
    id: "vamika_ruby_prism_drops",
    name: "Vamika Ruby Prism Diamond Drop Earrings",
    type: "earring",
    style: "drop",
    occasion: "wedding",
    metal: "diamond",
    stones: ["diamond-look", "ruby"],
    primary_color: "maroon",
    secondary_color: "silver",
    weight: "heavy",
    dress_match: ["maroon", "wine", "red"],
    vibe: "luxurious, refined",
    image: "/W.jpg",
    description: "Refined bridal drop earrings showcasing structured ruby gemstones paired with diamond-style clusters. Designed to add movement and sparkle while maintaining a balanced, elegant length."
  },

  {
    id: "rajasi_ruby_heritage_earrings",
    name: "Rajasi Ruby Heritage Diamond Long Earrings",
    type: "earring",
    style: "long",
    occasion: "wedding",
    metal: "diamond",
    stones: ["diamond-look", "ruby"],
    primary_color: "maroon",
    secondary_color: "silver",
    weight: "heavy",
    dress_match: ["maroon", "wine", "red"],
    vibe: "traditional, royal",
    image: "/Z.jpg",
    description: "Heritage-inspired long earrings designed with symmetrical ruby placements and diamond-style detailing. Perfect for brides seeking a royal, traditional look that pairs beautifully with heavy bridal necklaces."
  }




];

export function filterProducts(
  profile: Record<string, any>,
  catalog: Jewellery[],
  productType?: string
): Jewellery[] {
  const results: Jewellery[] = [];

  for (const item of catalog) {
    // Filter by product type if specified
    if (productType && item.type !== productType) {
      continue;
    }

    // Filter by profile preferences
    let match = true;
    for (const [key, value] of Object.entries(profile)) {
      if (value && item[key as keyof Jewellery]) {
        const itemValue = item[key as keyof Jewellery];
        if (typeof itemValue === "string") {
          if (!itemValue.toLowerCase().includes(String(value).toLowerCase())) {
            match = false;
            break;
          }
        } else if (Array.isArray(itemValue)) {
          if (!itemValue.some((v) => String(v).toLowerCase().includes(String(value).toLowerCase()))) {
            match = false;
            break;
          }
        }
      }
    }

    if (match) {
      results.push(item);
    }
  }

  return results;
}

// Helper function to search by keyword
export function searchCatalog(query: string, catalog: Jewellery[] = CATALOG): Jewellery[] {
  const searchTerm = query.toLowerCase();
  return catalog.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.vibe.toLowerCase().includes(searchTerm) ||
      item.type.toLowerCase().includes(searchTerm) ||
      item.primary_color.toLowerCase().includes(searchTerm) ||
      item.secondary_color.toLowerCase().includes(searchTerm)
  );
}
