/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// StoryVisualizer shared types
export type Genre = "Fantasy" | "Sci-fi" | "Mystery" | "Comedy";
export type Tone = "Dark" | "Lighthearted" | "Epic";
export type Audience = "Kids" | "Teens" | "Adults";
export type ArtStyle = "Realistic" | "Cartoon" | "Anime" | "Watercolor";

export interface GenerateStoryRequest {
  idea: string;
  genre: Genre;
  tone: Tone;
  audience: Audience;
  style?: ArtStyle;
  scenes?: number; // default 4
}

export interface StoryScene {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
}

export interface GenerateStoryResponse {
  scenes: StoryScene[];
}
