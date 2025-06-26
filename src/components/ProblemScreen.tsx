
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Lock, TrendingDown, ArrowRight } from 'lucide-react';

interface ProblemScreenProps {
  onNext: () => void;
}

const ProblemScreen: React.FC<ProblemScreenProps> = ({ onNext }) => {
  const problems = [
    {
      icon: DollarSign,
      title: "Expensive & Limited Access",
      description: "Quality tutoring is often too expensive, creating barriers for students who need help the most.",
      color: "text-red-500"
    },
    {
      icon: Lock,
      title: "Lack of Trust & Transparency",
      description: "Students struggle to verify tutor credentials and teaching quality before committing to lessons.",
      color: "text-orange-500"
    },
    {
      icon: TrendingDown,
      title: "High Platform Commissions",
      description: "Centralized platforms take up to 30% commission, making tutoring more expensive for students.",
      color: "text-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            The Problem with 
            <span className="text-gradient-primary block mt-2">Traditional Tutoring</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Students worldwide face significant barriers when seeking quality educational support
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {problems.map((problem, index) => (
            <Card 
              key={index} 
              className="glass-card rounded-2xl border-white/20 shadow-soft hover-lift"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6 ${problem.color}`}>
                  <problem.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{problem.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Statement */}
        <div className="glass-card rounded-2xl p-8 mb-12 border border-red-200/30 bg-red-50/20">
          <div className="flex items-center justify-center space-x-4 text-red-700">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold">The Result?</h3>
              <p className="text-lg">Millions of students lack access to affordable, quality tutoring</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="animate-fade-in">
          <p className="text-xl text-foreground/70 mb-8">
            But what if there was a better way?
          </p>
          <Button
            onClick={onNext}
            size="lg"
            className="gradient-primary text-white shadow-elegant hover:shadow-lg transition-all duration-300 hover:scale-105 text-lg px-8 py-4"
          >
            Discover the Solution
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProblemScreen;
