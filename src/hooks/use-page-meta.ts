import { useEffect } from "react";

/** Sets the browser title + meta description per route (better search snippets and shared links). */
export const usePageMeta = (title: string, description?: string) => {
  useEffect(() => {
    document.title = title;
    if (description) {
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!tag) { tag = document.createElement("meta"); tag.name = "description"; document.head.appendChild(tag); }
      tag.content = description;
    }
  }, [title, description]);
};
