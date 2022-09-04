import merge from "lodash-es/merge";
import sample from "lodash-es/sample";
import { observer } from "mobx-react-lite";
import type { NextSeoProps } from "rakkas-seo";
import { Seo as RakkasSEO } from "rakkas-seo";
import type { OpenGraph } from "rakkas-seo/esm/types";
import type { FC } from "react";

import { useInitialData, useThemeConfig } from "~/hooks/use-initial-data";
import { getRandomImage } from "~/utils/images";

import { useStore } from "../../../store";

type SEOProps = {
  title: string;
  description?: string;
  openGraph?: { type?: "website" | "article" } & OpenGraph;
} & NextSeoProps;

export const SEO: FC<SEOProps> = observer((props) => {
  const { title, description, openGraph, ...rest } = props;
  const { userStore } = useStore();
  const {
    url: { webUrl },
    seo,
    user,
  } = useInitialData();
  const Title = `${title} - ${seo.title}`;
  const themeConfig = useThemeConfig();
  const {
    site: { figure },
  } = themeConfig;

  return (
    <RakkasSEO
      {...{
        title,
        titleTemplate: `%s - ${seo.title}`,
        openGraph: merge(
          {
            profile: {
              username: user.name || user.username,
            },
            type: "article",
            locale: "zh-cn",
            site_name: seo.title || "",
            description:
              description || seo.description || userStore.introduce || "",
            article: {
              authors: [user.name || (userStore.name as string)],
            },
            title: Title,
            images: [
              {
                url: sample(figure) || getRandomImage()[0],
                alt: `${title} - ${seo.title}`,
              },
            ],
          } as OpenGraph,
          openGraph
        ),
        description:
          description ||
          seo.description ||
          user.introduce ||
          userStore.introduce ||
          "",
        twitter: {
          cardType: "summary",
          site: webUrl,
        },

        ...rest,
      }}
    />
  );
});

export const Seo = SEO;
