import { RequestHandler } from "express";
import {
  GenerateStoryRequest,
  GenerateStoryResponse,
  StoryScene,
} from "@shared/api";

function titleCase(s: string) {
  return s
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export const handleGenerateStory: RequestHandler = (req, res) => {
  const body = (req.body || {}) as Partial<GenerateStoryRequest>;
  const idea = (body.idea || "An untold idea").toString().trim();
  const scenesCount = Math.max(1, Math.min(10, body.scenes ?? 4));
  const genre = body.genre ?? "Fantasy";
  const tone = body.tone ?? "Lighthearted";
  const audience = body.audience ?? "Kids";

  const baseTitle = titleCase(idea.slice(0, 60));
  const scenes: StoryScene[] = Array.from({ length: scenesCount }).map(
    (_, i) => {
      const n = i + 1;
      const title = `Scene ${n} — ${
        n === 1
          ? "The Beginning"
          : n === scenesCount
            ? "The End"
            : `Chapter ${n}`
      }`;
      const text = `In this ${tone.toLowerCase()} ${genre.toLowerCase()} tale for ${audience.toLowerCase()}, ${idea}. The scene ${n} unfolds with vivid detail as our characters progress through their journey in "${baseTitle}".`;
      const imageUrl = `/placeholder.svg?scene=${n}`;
      return { id: String(n), title, text, imageUrl } satisfies StoryScene;
    },
  );

  const response: GenerateStoryResponse = { scenes };
  res.status(200).json(response);
};
