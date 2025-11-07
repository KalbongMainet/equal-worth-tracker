import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-4 animate-fade-in">
      <div className="max-w-4xl w-full">
        <div className="text-center space-y-8">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6 animate-scale-in">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-hover">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Equal Work, Equal Worth
            <span className="block mt-2 text-primary">Gender-Neutral KPI Progress Tracker</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
            Promoting fairness and equal opportunity through data-driven evaluation.
          </p>

          {/* Description */}
          <div className="bg-card rounded-2xl p-8 shadow-card max-w-3xl mx-auto transition-smooth hover:shadow-hover">
            <p className="text-lg text-card-foreground leading-relaxed">
              This web application is designed to track employee performance through objective metrics such as completed tasks and timeliness. 
              It promotes equality in the workplace by eliminating bias and focusing solely on measurable results.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
            <div className="bg-card rounded-xl p-6 shadow-card transition-smooth hover:shadow-hover hover:-translate-y-1">
              <Users className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold text-card-foreground mb-2">Fair Evaluation</h3>
              <p className="text-sm text-muted-foreground">Objective metrics for all employees</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card transition-smooth hover:shadow-hover hover:-translate-y-1">
              <BarChart3 className="w-8 h-8 text-accent mb-3 mx-auto" />
              <h3 className="font-semibold text-card-foreground mb-2">Data-Driven</h3>
              <p className="text-sm text-muted-foreground">Track progress with real-time KPIs</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card transition-smooth hover:shadow-hover hover:-translate-y-1">
              <TrendingUp className="w-8 h-8 text-success mb-3 mx-auto" />
              <h3 className="font-semibold text-card-foreground mb-2">Growth Focused</h3>
              <p className="text-sm text-muted-foreground">Encourage continuous improvement</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Link to="/progress">
              <Button 
                size="lg" 
                className="gradient-primary text-white text-lg px-8 py-6 rounded-full shadow-hover transition-smooth hover:scale-105 hover:shadow-hover group"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
