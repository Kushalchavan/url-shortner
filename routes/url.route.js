import express from "express";
import { shortenPostRequestBodySchema } from "../validation/request.validation.js";
import { nanoid } from "nanoid";
import db from "../db/index.js";
import { urlsTable } from "../models/index.js";
import { ensureAuthencaticated } from "../middleware/auth.middleware.js";
import { eq } from "drizzle-orm";

const router = express.Router();

router.post("/shorten", ensureAuthencaticated, async function (req, res) {
  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }

  const { url, code } = validationResult.data;

  const shortCode = code ?? nanoid(6);

  const [result] = await db
    .insert(urlsTable)
    .values({
      shortCode,
      targetUrl: url,
      userId: req.user.id,
    })
    .returning({
      id: urlsTable.id,
      shortCode: urlsTable.shortCode,
      targetUrl: urlsTable.targetUrl,
    });

  return res.status(201).json({
    id: result.id,
    shortcode: result.shortCode,
    targetUrl: result.targetUrl,
  });
});

router.get("/:shortCode", async function (req, res) {
  const code = req.params.shortCode;
  const [result] = await db
    .select({ targetUrl: urlsTable.targetUrl })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, code));

    if(!result) {
      return res.status(404).json({error: "Invalid url"})
    }
     return res.redirect(result.targetUrl)
});

export default router;
