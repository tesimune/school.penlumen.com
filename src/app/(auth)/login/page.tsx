"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { School } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<"root" | "admin" | "staff" | "parent">(
    "admin"
  );

  useEffect(() => {
    const userString = Cookies.get("user");
    const user = userString ? JSON.parse(userString) : null;
    if (user) {
      router.push("/session");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await login({ role, email, password });
      if (!response.success || !response.data) {
        setMessage(response.message);
        setSuccess(false);
        return;
      } else {
        setSuccess(true);
        setMessage(response.message);
        Cookies.set("token", response.data.token, {
          expires: 7,
        });
        Cookies.set("user", JSON.stringify(response.data.user), {
          expires: 7,
        });
        router.push("/session");
      }
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong");
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full min-w-md">
          <div className="absolute right-4 top-4">
            <Select
              value={role}
              onValueChange={(value) =>
                setRole(value as "root" | "admin" | "staff" | "parent")
              }
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="root">Root</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CardHeader className="space-y-1">
            {message && (
              <div
                className={`${
                  success ? "text-green-500" : "text-red-500"
                } text-center text-sm`}
              >
                {message}
              </div>
            )}
            <div className="flex items-center justify-center gap-2 pb-2">
              <School className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">EduManage</span>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
