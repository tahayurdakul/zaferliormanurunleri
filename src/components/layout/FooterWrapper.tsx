import { getSiteSettings } from "@/lib/data";
import { Footer } from "./Footer";

export async function FooterWrapper() {
  const settings = await getSiteSettings();
  return <Footer settings={settings} />;
}
