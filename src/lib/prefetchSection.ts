// Warms a section's media (images/videos) so anchor navigation feels instant.
// Decodes off-screen <img>s and triggers <video> preload inside the target.
const warmed = new Set<string>();

export function prefetchSection(id: string) {
  if (typeof document === "undefined") return;
  if (warmed.has(id)) return;
  warmed.add(id);
  const root = document.getElementById(id);
  if (!root) return;
  // Decode images in parallel.
  root.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
    if (img.decode) img.decode().catch(() => {});
    if (!img.loading || img.loading === "lazy") img.loading = "eager";
  });
  root.querySelectorAll<HTMLVideoElement>("video").forEach((v) => {
    try {
      v.preload = "auto";
      v.load();
    } catch {}
  });
}

export function prefetchSections(ids: string[]) {
  ids.forEach(prefetchSection);
}