import { z } from '@builder.io/qwik-city';
import { NewsInputType } from '~/models/news.models';

export const newsInputSchema = {
  components: z.array(z.object({
    title: z.string().min(3, "The title must have 3 characters or more.").optional(),
    type: z.nativeEnum(NewsInputType),
    subtitle: z.string().optional(),
    content: z.string().min(10, "The content must have 10 characters or more.").optional(),
    bannerImage: z.string().optional(),
    images: z.string().optional(),
    videos: z.string().optional(),
  })),
}
