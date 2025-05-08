"use client";

import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { useBranch } from "@/hooks/branch";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, ChevronRight, School, Search } from "lucide-react";

interface Branch {
  uuid: string;
  name: string;
  contact: string;
  profile: string;
  address: string;
  students: number;
}

export default function BranchSelectionPage() {
  const router = useRouter();
  const { index } = useBranch();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userString = Cookies.get("user");
      const user = userString ? JSON.parse(userString) : null;
      if (!user) {
        router.push("/login");
        return;
      }

      const response = await index();
      if (!response.success) {
        console.error(response.message);
        return;
      } else {
        setBranches(response.data.branches);
        console.log(response.data.branches);
      }
    };

    fetchData();
  }, [router, index]);

  const filteredBranches = branches.filter(
    (branch) =>
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedBranch === null) return;
    setIsLoading(true);
    setTimeout(() => {
      Cookies.set("branch", selectedBranch.toString(), {
        expires: 7,
      });
      const userString = Cookies.get("user");
      const user = userString ? JSON.parse(userString) : null;

      if (user.data?.role === "parent") {
        router.push("/parent/dashboard");
      } else {
        router.push("/staff/dashboard");
      }
    }, 1000);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center gap-2 pb-2">
              <School className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">EduManage</span>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Select a Branch
            </CardTitle>
            <CardDescription className="text-center">
              Choose which school branch you want to access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search branches..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <motion.div
              className="grid gap-3"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredBranches.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No branches found matching your search.
                </div>
              ) : (
                filteredBranches.map((branch) => (
                  <motion.div key={branch.uuid} variants={item}>
                    <div
                      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedBranch === branch.uuid
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50 hover:bg-muted"
                      }`}
                      onClick={() => setSelectedBranch(branch.uuid)}
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={branch.profile || "/placeholder.svg"}
                            alt={branch.name}
                          />
                          <AvatarFallback>
                            {branch.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{branch.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {branch.address}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {/* <div className="hidden text-right sm:block">
                          <div className="flex gap-2">
                            <Badge variant="outline" className="bg-background">
                              {branch.students} Students
                            </Badge>
                          </div>
                        </div> */}
                        {selectedBranch === branch.uuid ? (
                          <Check className="h-5 w-5 text-primary" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              disabled={selectedBranch === null || isLoading}
              onClick={handleContinue}
            >
              {isLoading ? "Loading..." : "Continue"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
