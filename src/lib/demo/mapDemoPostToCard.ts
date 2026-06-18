import type { DemoPost } from "@/api/features/demo/demo.schema";

export type DemoPostCardModel = {
  headline: string;
  excerpt: string;
};

export function mapDemoPostToCard(dto: DemoPost): DemoPostCardModel {
  return {
    headline: dto.title,
    excerpt: dto.body,
  };
}
