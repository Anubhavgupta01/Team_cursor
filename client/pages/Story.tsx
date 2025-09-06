import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ChevronLeft, ChevronRight, Pencil, RotateCcw, ImageDown, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Story() {
  const navigate = useNavigate();
  const { state } = useLocation() as any;
  const { toast } = useToast();

  const meta = state ?? null;
  const [scenes, setScenes] = useState<Array<any>>(meta?.scenes || []);
  const [idx, setIdx] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const current = scenes[idx];

  useEffect(() => {
    if (!meta) navigate("/");
  }, [meta, navigate]);

  useEffect(() => {
    if (current) setDraft(current.text);
  }, [idx]);

  const progress = useMemo(() => {
    if (!scenes.length) return 0;
    return ((idx + 1) / scenes.length) * 100;
  }, [idx, scenes.length]);

  const regenText = async () => {
    if (!meta) return;
    const res = await fetch("/api/generate-story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...meta, scenes: 1 }),
    });
    const data = await res.json();
    const next = [...scenes];
    next[idx] = { ...current, text: data.scenes[0].text };
    setScenes(next);
    toast({ title: "Text regenerated" });
  };

  const regenImage = async () => {
    const next = [...scenes];
    next[idx] = { ...current, imageUrl: `${current.imageUrl}&t=${Date.now()}` };
    setScenes(next);
    toast({ title: "Image regenerated" });
  };

  const onSaveEdit = () => {
    const next = [...scenes];
    next[idx] = { ...current, text: draft };
    setScenes(next);
    setEditOpen(false);
    toast({ title: "Scene updated" });
  };

  const downloadPDF = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    const html = `<!doctype html><html><head><meta charset='utf-8'><title>Story</title>
      <style>body{font-family:Inter, system-ui, -apple-system; padding:24px;}
      h2{margin:0 0 8px;font-size:20px}
      img{max-width:100%;border-radius:8px;margin:8px 0}
      .scene{page-break-inside:avoid;border:1px solid #ddd;border-radius:12px;padding:16px;margin-bottom:16px}
      </style></head><body>
      ${scenes
        .map(
          (s: any) => `<div class='scene'><h2>${s.title}</h2><img src='${location.origin}${s.imageUrl}'/><p>${s.text}</p></div>`,
        )
        .join("")}
      </body></html>`;
    w.document.write(html);
    w.document.close();
    w.focus();
    w.print();
  };

  const downloadGallery = () => {
    scenes.forEach((s: any, i: number) => {
      const a = document.createElement("a");
      a.href = s.imageUrl;
      a.download = `scene-${i + 1}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  };

  const shareLink = async () => {
    const url = window.location.href;
    if ((navigator as any).share) {
      await (navigator as any).share({ title: "StoryVisualizer", url });
    } else {
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied" });
    }
  };

  if (!current) return null;

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto animate-fade">
        <div className="mb-6">
          <Progress value={progress} />
          <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {idx + 1} / {scenes.length}
            </span>
            <div className="flex gap-1">
              {scenes.map((_: any, i: number) => (
                <div key={i} className={`h-2 w-2 rounded-full ${i === idx ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>{current.title}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="rounded-lg overflow-hidden border bg-black/5 dark:bg-white/5 relative">
                <img src={current.imageUrl} alt={current.title} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
              </div>
            </div>
            <div>
              <div className="max-h-64 overflow-auto pr-2 leading-7 text-base animate-in fade-in-0">
                {current.text}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="secondary" onClick={regenText}><RotateCcw className="h-4 w-4"/> Regenerate Text</Button>
                <Button variant="secondary" onClick={regenImage}><ImageDown className="h-4 w-4"/> Regenerate Image</Button>
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline"><Pencil className="h-4 w-4"/> Edit Scene</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Scene Text</DialogTitle>
                    </DialogHeader>
                    <Textarea className="min-h-48" value={draft} onChange={(e) => setDraft(e.target.value)} />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
                      <Button onClick={onSaveEdit}>Save</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-between">
          <Button variant="outline" onClick={() => setIdx((v) => Math.max(0, v - 1))} disabled={idx === 0}>
            <ChevronLeft className="h-4 w-4"/> Previous
          </Button>
          <Button onClick={() => setIdx((v) => Math.min(scenes.length - 1, v + 1))} disabled={idx === scenes.length - 1}>
            Next <ChevronRight className="h-4 w-4"/>
          </Button>
        </div>

        <div className="fixed right-6 bottom-6">
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-brand-gradient text-white shadow-lg h-12 px-6"><Share2 className="h-5 w-5"/> Export</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Download as PDF</DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Save image gallery</DropdownMenuItem>
                </AlertDialogTrigger>
                <DropdownMenuItem onClick={shareLink}>Share link</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Export may open your browser's download or print dialog.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={downloadPDF}>Continue</AlertDialogAction>
                <AlertDialogAction onClick={downloadGallery}>Images</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </AppShell>
  );
}
