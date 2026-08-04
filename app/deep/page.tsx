import type { Metadata } from "next";
import { DeepScene } from "../components/DeepScene";

export const metadata: Metadata = {
  title: "更深层地下",
  description: "研究档案、经历与能力地图，以及关于我和联系方式。",
};

export default function DeepPage() {
  return <DeepScene />;
}
