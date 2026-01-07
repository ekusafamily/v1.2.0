import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Star } from "lucide-react";

const benefits = [
  "Official membership card and ID",
  "Access to exclusive events and workshops",
  "Leadership development opportunities",
  "County and national networking",
  "Voting rights in elections",
  "Official merchandise discounts",
  "Community project participation",
  "Mentorship program access",
];

const Membership = () => {
  return (
    <>
      <Helmet>
        <title>Membership | Kabila La Vijana</title>
        <meta name="description" content="Join Kabila La Vijana and become part of Kenya's largest youth empowerment movement. Open to citizens aged 18-35." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          {/* Hero */}
          <section className="py-20 md:py-28 hero-gradient relative overflow-hidden">
            <div className="wave-decoration opacity-50" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Become a Member
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl">
                  Join Kenya's largest youth movement today
                </p>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Benefits */}
                <div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Membership Benefits
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    As a member, you'll have access to exclusive opportunities and be part of a nationwide network of youth leaders.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-primary/20 mt-0.5">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-foreground text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-10 glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="h-5 w-5 text-kabila-gold" />
                      <h3 className="font-heading font-bold text-foreground">Eligibility</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Open to all Kenyan citizens aged 18-35 years. Members must possess a valid national ID or passport.
                    </p>
                  </div>
                </div>

                {/* Registration Form */}
                <div className="card-gradient rounded-2xl p-8 border border-border">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Register Now</h3>
                  <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter last name" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter email address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+254 700 000 000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="idNumber">National ID Number</Label>
                      <Input id="idNumber" placeholder="Enter ID number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="county">County</Label>
                      <Input id="county" placeholder="Select your county" />
                    </div>
                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      Submit Application
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Membership;