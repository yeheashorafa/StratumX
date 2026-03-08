import { generatePageMetadata } from "../utils/metadata";
import AboutClient from "./AboutClient";

export const metadata = generatePageMetadata({
  title: "About Us",
  path: "/about",
});

export default function AboutPage() {
  return <AboutClient />;
}
