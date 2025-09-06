import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Wand2, BookOpenText, Gauge } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Index() {
  const [idea, setIdea] = useState("");
  const [genre, setGenre] = useState("Fantasy");
  const [tone, setTone] = useState("Lighthearted");
  const [audience, setAudience] = useState("Kids");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const randomIdeas = [
    "A lonely robot finds a flower in a post‑apocalyptic city.",
    "A shy dragon opens a tea shop in a snowy village.",
    "Two kids discover a portal in their school library.",
    "An astronaut receives letters from the future.",
  ];

  const onRandom = () => {
    const i = Math.floor(Math.random() * randomIdeas.length);
    setIdea(randomIdeas[i]);
  };

  const onSubmit = async () => {
    if (!idea.trim()) {
      toast({ title: "Story idea required", description: "Please enter a story idea to continue." });
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, genre, tone, audience }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      navigate("/story", { state: { idea, genre, tone, audience, ...data } });
    } catch (err) {
      toast({ title: "Generation failed", description: "Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-8">Create Your Illustrated Story</h1>

        <div className="grid gap-6 rounded-2xl border bg-card/60 p-6 md:p-8 shadow-sm">
          <label className="text-sm font-medium">Story Idea</label>
          <div className="relative">
            <Textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Enter your story idea here…"
              className="min-h-28 text-base md:text-lg bg-background/60"
            />
            <BookOpenText className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Genre</label>
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fantasy">Fantasy</SelectItem>
                  <SelectItem value="Sci-fi">Sci-fi</SelectItem>
                  <SelectItem value="Mystery">Mystery</SelectItem>
                  <SelectItem value="Comedy">Comedy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Tone</label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dark">Dark</SelectItem>
                  <SelectItem value="Lighthearted">Lighthearted</SelectItem>
                  <SelectItem value="Epic">Epic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Target Audience</label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kids">Kids</SelectItem>
                  <SelectItem value="Teens">Teens</SelectItem>
                  <SelectItem value="Adults">Adults</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 pt-2">
            <Button
              onClick={onSubmit}
              className={cn(
                "md:flex-1 h-12 text-base font-semibold bg-brand-gradient hover:brightness-110 text-white",
              )}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Gauge className="h-5 w-5 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" /> Generate Story
                </>
              )}
            </Button>
            <Button variant="outline" className="md:w-48 h-12 text-base" onClick={onRandom}>
              <Wand2 className="h-5 w-5" /> Random Idea
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
