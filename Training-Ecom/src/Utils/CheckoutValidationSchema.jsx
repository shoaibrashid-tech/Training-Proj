import { z } from "zod";


export const customerSchema = z.object({

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address")
    .max(100, "Email cannot exceed 100 characters"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10,15}$/, "Phone number must be 10–15 digits"),
  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(120, "Address cannot exceed 120 characters"),

  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(60, "City cannot exceed 60 characters")
    .regex(/^[A-Za-z\s-]+$/, "City must contain only letters"),

  state: z
    .string()
    .trim()
    .min(2, "State is required")
    .max(60, "State cannot exceed 60 characters"),

  zipCode: z
    .string()
    .trim()
    .regex(/^\d{4,10}$/, "Zip code must be 4–10 digits"),
});




export const paymentSchema = z.object({

  cardName: z
    .string()
    .trim()
    .min(3, "Name on card must be at least 3 characters")
    .max(60, "Name on card cannot exceed 60 characters")
    .regex(/^[A-Za-z\s'-]+$/, "Card name must contain only letters"),

  cardNumber: z
    .string()
    .trim()
    .regex(/^\d{16}$/, "Card number must be exactly 16 digits"),

  expiry: z
    .string()
    .trim()
    .regex(
      /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      "Expiry must be in MM/YY format"
    ),

  cvv: z
    .string()
    .trim()
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),

  billingAddress: z
    .string()
    .trim()
    .min(5, "Billing address must be at least 5 characters")
    .max(120, "Billing address cannot exceed 120 characters"),

  billingZip: z
    .string()
    .trim()
    .regex(/^\d{4,10}$/, "Billing ZIP must be 4–10 digits"),
});




export const checkoutSchema = customerSchema.merge(paymentSchema);