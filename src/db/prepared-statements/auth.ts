import { eq, sql } from "drizzle-orm"

import { db } from "@/config/db"
import { users } from "@/db/schema"

export const psLinkOAuthAccount = db
  .update(users)
  .set({ emailVerified: new Date() })
  .where(eq(users.id, sql.placeholder("userId")))
  .prepare("psLinkOAuthAccount")
