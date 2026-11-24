import { getStore } from "@netlify/blobs";

export default async (req) => {
  if (req.method !== "POST") return new Response("Método no permitido", { status: 405 });
  let body;
  try { body = await req.json(); } catch { return new Response("JSON inválido", { status: 400 }); }
  const sub = body && body.subscription;
  if (!sub || typeof sub.endpoint !== "string" || !/^https:\/\//.test(sub.endpoint)) {
    return new Response("Suscripción inválida", { status: 400 });
  }
  const store = getStore("rutina-push");
  const subs = (await store.get("subs", { type: "json" })) || [];
  const others = subs.filter((s) => s.endpoint !== sub.endpoint);
  if (body.unsubscribe) {
    await store.setJSON("subs", others);
    return Response.json({ ok: true, total: others.length });
  }
  others.push({ endpoint: sub.endpoint, keys: sub.keys || null, at: new Date().toISOString() });
  await store.setJSON("subs", others.slice(-10));
  return Response.json({ ok: true, total: Math.min(others.length, 10) });
};

export const config = { path: "/api/subscribe" };
