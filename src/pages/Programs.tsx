import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, CheckCircle, Hand } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Program {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  created_at: string;
}

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [registeredPrograms, setRegisteredPrograms] = useState<Set<number>>(new Set());
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    let userEmail = "";
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      userEmail = parsedUser.email;
    }

    // Fetch programs
    fetch('/api/programs')
      .then(res => res.json())
      .then(data => {
        setPrograms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    // Fetch user's interests if logged in
    if (userEmail) {
      fetch(`/api/my-interests?email=${encodeURIComponent(userEmail)}`)
        .then(res => res.json())
        .then(data => {
          setRegisteredPrograms(new Set(data));
        })
        .catch(console.error);
    }
  }, []);

  const handleInterest = async (programId: number) => {
    if (!user) {
      toast.error("Please login to register your interest.");
      return;
    }

    try {
      const response = await fetch(`/api/programs/${programId}/interest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_email: user.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setRegisteredPrograms(prev => new Set(prev).add(programId));
        setShowSuccessDialog(true);
      } else {
        toast.error(data.error || "Failed to register interest");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <section className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 group">
              Our <span className="text-primary group-hover:scale-105 inline-block transition-transform duration-300">Programs</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Discover our upcoming events, workshops, and community initiatives designed to empower and connect.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">Loading programs...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.length > 0 ? (
                programs.map((program) => (
                  <Card key={program.id} className="flex flex-col h-full hover:shadow-lg transition-shadow border-primary/10">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-primary mb-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">{new Date(program.date).toLocaleDateString()}</span>
                      </div>
                      <CardTitle className="font-heading text-xl">{program.title}</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{program.location}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-muted-foreground leading-relaxed">
                        {program.description}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-border/50">
                      {user ? (
                        <Button
                          className={`w-full gap-2 group ${registeredPrograms.has(program.id) ? "bg-green-600 hover:bg-green-700" : ""}`}
                          onClick={() => handleInterest(program.id)}
                          disabled={registeredPrograms.has(program.id)}
                        >
                          {registeredPrograms.has(program.id) ? (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              Registered
                            </>
                          ) : (
                            <>
                              <Hand className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                              I'm Interested
                            </>
                          )}
                        </Button>
                      ) : (
                        <div className="w-full text-center">
                          <p className="text-xs text-muted-foreground mb-2">Login to register interest</p>
                          <Button variant="secondary" className="w-full" disabled>
                            Login Required
                          </Button>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No upcoming programs at the moment. Check back soon!
                </div>
              )}
            </div>
          )}

          <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
            <DialogContent className="sm:max-w-md text-center py-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading text-center">Registration Successful!</DialogTitle>
                <DialogDescription className="text-center text-lg mt-2">
                  Thank you for your interest. We have received your details and will get back to you soon.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-center mt-4">
                <Button onClick={() => setShowSuccessDialog(false)} size="lg" className="w-full sm:w-auto">
                  Awesome, thanks!
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Programs;