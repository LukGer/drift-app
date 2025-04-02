export const domain = {
  dev: "dev.drift.lukger.dev",
  prod: "drift.lukger.dev",
}[$app.stage]!;

export const zone = cloudflare.getZoneOutput({
  name: "lukger.dev",
});
