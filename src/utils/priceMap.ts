const priceMap: Record<string, { pcs?: number; বান্ডেল?: number }> = {
  "পাইপে রড ভরা": { বান্ডেল: 40 },
  "পাইপযুক্ত রড ভাঁজ করা": { বান্ডেল: 40 },
  "ভাঁজ করা রডের দুই প্রান্ত বাঁধা": { বান্ডেল: 40 },
  "গিটার বাঁধা": { pcs: 40 },
  "মেইন জালের বডি সেলাই": { pcs: 40 },
  "পকেট সেলাই": { বান্ডেল: 90 },
  "ক্রস সেলাই": { বান্ডেল: 90 },
  "লাস্ট-গেইট সেলাই": { pcs: 1 },
  "লেজের বডি সেলাই": { pcs: 5 },
  "রিংজাল তৈরি": { বান্ডেল: 200},
  "লেজের খাঁচি তৈরি": { pcs: 3 },
  "লেজ ফিটিং": { pcs: 5 },
  "দোয়াইর তৈরি": { pcs: 180 },
  "দোয়াইরের সাথে লেজের জয়েন দেওয়া": { pcs: 5 },
  "কম্প্রেস করে বাঁধা": { pcs: 5 },
  "প্যাকেজিং করা": { pcs: 5 },
};

export function calculateTaskPrice(
  itemName: string,
  quantity: number,
  unit: "pcs" | "বান্ডেল"
): number {
  const unitPrice = priceMap[itemName]?.[unit] ?? 0;
  return quantity * unitPrice;
}
