import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/state/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Min 6 characters"),
});

export default function Signup() {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }
    setLoading(true);
    setError(null);
    await signup(form);
    navigate("/");
  };

  return (
    <AppShell>
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" disabled={loading} className="bg-brand-gradient text-white">Create Account</Button>
            </form>
            <p className="text-sm text-muted-foreground mt-4">Already have an account? <Link className="underline" to="/login">Log in</Link></p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
