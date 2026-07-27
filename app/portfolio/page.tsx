import type { Metadata } from "next";
import { UndergroundScene } from "../components/UndergroundScene";

export const metadata: Metadata = {
  title: "地下作品集",
  description: "互联网产品、硬件产品与产品研究案例。",
};

export default function PortfolioPage() {
  return <UndergroundScene />;
}
