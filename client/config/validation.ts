import { z } from "zod"

export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,64}$/

export const username = z
  .string()
  .trim()
  .min(3, { message: "Username must be at least 3 character long." })
  .max(16, { message: "Username can't be longer than 16 characters.." })

export const password = z
  .string()
  .trim()
  .regex(
    PASSWORD_REGEX,
    "Password must be 8-64 long and must contain a number, uppercase, lowercase and special character.",
  )
