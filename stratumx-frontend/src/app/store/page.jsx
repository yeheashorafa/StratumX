import { generatePageMetadata } from "../utils/metadata";
import StoreClient from "./StoreClient";

export const metadata = generatePageMetadata({
  title: "Store",
  path: "/store",
});

export default function StorePage() {
  return <StoreClient />;
}
