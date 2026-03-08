import { generatePageMetadata } from "../utils/metadata";
import ServicesClient from "./ServicesClient";

export const metadata = generatePageMetadata({
  title: "Our Services",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesClient />;
}
