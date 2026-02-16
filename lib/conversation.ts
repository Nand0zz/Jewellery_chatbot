export interface BotMessage {
  text: string;
  images?: string[];
  buttons?: Array<{ label: string; action: string }>;
}

export interface ConversationStep {
  [key: number]: BotMessage;
}

export const CONVERSATION_FLOW: ConversationStep = {
  0: {
    text: "Welcome to **Kalyani Fine Jewellery** ✨\n\nI'm delighted to assist you today. Please take your time — I'm here to help you find jewellery that truly complements your special moments.",
  },
  1: {
    text: "Certainly. May I know what kind of jewellery you're looking for today — something for daily wear, a small celebration, or a grand occasion such as a wedding?",
  },
  2: {
    text: "Congratulations on your wedding! 💐\n\nThat's a truly special milestone, and it would be my pleasure to help you choose something worthy of your big day.",
  },
  3: {
    text: "Is the jewellery for your wedding ceremony, reception, or one of the pre-wedding functions?",
  },
  4: {
    text: "Wonderful. For your wedding day, are you looking for a complete jewellery set — including necklace, earrings, and bangles — or would you like to start with a specific piece?",
  },
  5: {
    text: "An excellent choice.\n\nBridal necklaces define the entire look. May I know which style you're inclined towards — traditional kundan and polki, or diamond-style jewellery?",
    images: [
      "C:\\Users\\Vatsal\\Downloads\\jewellery\\jewellery\\B.jpg",
      "C:\\Users\\Vatsal\\Downloads\\jewellery\\jewellery\\F.jpg",
      "C:\\Users\\Vatsal\\Downloads\\jewellery\\jewellery\\H.jpg",
      "C:\\Users\\Vatsal\\Downloads\\jewellery\\jewellery\\I.jpg",
    ],
  },
  6: {
    text: "Kundan jewellery is a timeless bridal favourite — very elegant and rich in heritage.\n\nTo personalize this further, may I know what color your bridal outfit is?",
  },
  7: {
    text: "Maroon is a beautiful bridal color. It pairs exquisitely with ruby-toned kundan stones and warm gold finishes.\n\nBased on your preference, I would recommend this maroon kundan bridal necklace.",
    images: [
      "C:\\Users\\Vatsal\\Downloads\\jewellery\\jewellery\\D.jpg",
      "C:\\Users\\Vatsal\\Downloads\\jewellery\\jewellery\\E.jpg",
    ],
  },
  8: {
    text: "I suggested this piece because:\n\n• It's ideal for a wedding ceremony\n• The maroon gemstones complement your outfit\n• The kundan work adds a traditional, regal touch",
  },
  9: {
    text: "Of course.\n\nIf you'd prefer a diamond-style look in the same color palette, I'd recommend this option.",
    images: [
      "C:\\Users\\Vatsal\\Downloads\\jewellery\\jewellery\\B.jpg",
      "C:\\Users\\Vatsal\\Downloads\\jewellery\\jewellery\\K.jpg",
      "C:\\Users\\Vatsal\\Downloads\\jewellery\\jewellery\\C.jpg",
      "C:\\Users\\Vatsal\\Downloads\\jewellery\\jewellery\\O.png",
    ],
  },
  10: {
    text: "This design offers the brilliance of diamonds while maintaining a strong bridal presence.",
  },
  11: {
    text: "Certainly.\n\nI'll show you earrings that match the same maroon gemstone tone, so the set looks cohesive.",
    images: ["images/long_maroon_earrings.jpg"],
  },
  12: {
    text: "Absolutely — comfort is just as important as appearance.\n\nHere's a circular ruby earring that maintains a bridal feel without being too long.",
    images: ["C:\\Users\\nandi\\Downloads\\jewellery (2)\\jewellery\\jewellery\\iloveimg-converted\\1.jpg"],
  },
  13: {
    text: "Many brides prefer this style as it offers both elegance and ease throughout the day.",
  },
  14: {
    text: "I'm glad you liked them.\n\nYes, we do have bangles that complement this set beautifully.",
    images: ["C:\\Users\\nandi\\Downloads\\jewellery (2)\\jewellery\\jewellery\\iloveimg-converte\\DoublaeLayerRubyDiamonteBracelet_720x_42621f7f-47f2-4ba0-8775-e6cbe282ff87_1250x.jpg"],
  },
  15: {
    text: "Of course — please take your time.\n\nI've added the necklace and earrings to your cart. Do let me know if you'd like assistance with bangles or any other jewellery.\n\nThank you for visiting Kalyani Fine Jewellery 💖",
  },
};

export function getBotResponse(step: number): BotMessage | undefined {
  return CONVERSATION_FLOW[step];
}

export interface UserProfile {
  occasion: string | null;
  wedding_type: string | null;
  jewellery_type: string | null;
  metal: string | null;
  dress_color: string | null;
}

export function extractUserPreferences(input: string): Partial<UserProfile> {
  const preferences: Partial<UserProfile> = {};
  const text = input.toLowerCase();

  if (text.includes("wedding")) preferences.occasion = "wedding";
  if (text.includes("ceremony")) preferences.wedding_type = "ceremony";
  if (text.includes("reception")) preferences.wedding_type = "reception";

  if (text.includes("necklace")) preferences.jewellery_type = "necklace";
  if (text.includes("earring")) preferences.jewellery_type = "earring";
  if (text.includes("bangle") || text.includes("bracelet")) preferences.jewellery_type = "bangle";
  if (text.includes("ring")) preferences.jewellery_type = "ring";

  if (text.includes("kundan")) preferences.metal = "kundan";
  if (text.includes("diamond")) preferences.metal = "diamond";
  if (text.includes("gold")) preferences.metal = "gold";

  if (text.includes("maroon")) preferences.dress_color = "maroon";
  if (text.includes("red")) preferences.dress_color = "red";
  if (text.includes("green")) preferences.dress_color = "green";
  if (text.includes("gold")) preferences.dress_color = "gold";
  if (text.includes("wine")) preferences.dress_color = "wine";

  return preferences;
}
