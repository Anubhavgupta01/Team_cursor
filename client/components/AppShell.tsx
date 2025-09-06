import { PropsWithChildren, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/state/auth";

export function AppShell({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_50%_-200px,hsl(var(--brand-1)/0.25),transparent_70%)] dark:bg-[radial-gradient(1200px_600px_at_50%_-200px,hsl(var(--brand-2)/0.25),transparent_70%)]">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="font-extrabold text-xl tracking-tight select-none">
            <span className="bg-brand-gradient bg-clip-text text-transparent">StoryVisualizer</span>
          </a>
          <div className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full">
                  <Avatar>
                    <AvatarFallback>{user.name.slice(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setOpen(true)}>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <a href="/signup"><Button>Sign Up</Button></a>
                <a href="/login"><Button variant="outline">Log In</Button></a>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Story Settings</DialogTitle>
            <DialogDescription>Adjust generation preferences.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Art Style</label>
              <Select defaultValue="Realistic">
                <SelectTrigger>
                  <SelectValue placeholder="Choose style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Realistic">Realistic</SelectItem>
                  <SelectItem value="Cartoon">Cartoon</SelectItem>
                  <SelectItem value="Anime">Anime</SelectItem>
                  <SelectItem value="Watercolor">Watercolor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Narration</div>
                <div className="text-sm text-muted-foreground">Enable text-to-speech narration</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Background Music</div>
                <div className="text-sm text-muted-foreground">Play ambient soundtrack</div>
              </div>
              <Switch />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Language</label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <main className="container py-10">{children}</main>
    </div>
  );
}
