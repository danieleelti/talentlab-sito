// genera-immagine.mjs — un'immagine con Gemini (gemini-3-pro-image, 2K), con immagini di riferimento.
// Uso: node tools/genera-immagine.mjs <uscita.png> <aspectRatio> <prompt.txt> [riferimento1 ...]
// Chiave Gemini: GOOGLE_GENERATIVE_AI_API_KEY nell'ambiente o nel .env del progetto (mai stampata). Costo ~0,15 $ a immagine.
import { readFileSync, writeFileSync } from 'node:fs';

const [out, ratio, promptFile, ...refs] = process.argv.slice(2);
// chiave: variabile d'ambiente, oppure riga GOOGLE_GENERATIVE_AI_API_KEY=... nel .env del progetto (mai in chat, mai su GitHub)
const envFile = new URL('../.env', import.meta.url);
let key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!key) { try { key = readFileSync(envFile, 'utf8').match(/^GOOGLE_GENERATIVE_AI_API_KEY=(.+)$/m)?.[1]?.trim(); } catch {} }
if (!key) throw new Error('chiave mancante');
const mime = (f) => (/\.png$/i.test(f) ? 'image/png' : /\.webp$/i.test(f) ? 'image/webp' : 'image/jpeg');
const parts = refs.map((f) => ({ inline_data: { mime_type: mime(f), data: readFileSync(f).toString('base64') } }));
parts.push({ text: readFileSync(promptFile, 'utf8') });
const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image:generateContent', {
  method: 'POST',
  headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
  body: JSON.stringify({
    contents: [{ role: 'user', parts }],
    generationConfig: { responseModalities: ['IMAGE', 'TEXT'], imageConfig: { aspectRatio: ratio, imageSize: '2K' } },
  }),
});
if (!res.ok) { console.error('HTTP', res.status, (await res.text()).slice(0, 300)); process.exit(1); }
const data = await res.json();
const cand = data.candidates?.[0];
const img = cand?.content?.parts?.find((p) => p.inlineData?.data)?.inlineData;
if (!img) {
  console.error('nessuna immagine', cand?.finishReason, data.promptFeedback?.blockReason, cand?.content?.parts?.find((p) => p.text)?.text?.slice(0, 200));
  process.exit(1);
}
writeFileSync(out, Buffer.from(img.data, 'base64'));
console.log('ok', out, img.mimeType, JSON.stringify(data.usageMetadata || {}));
