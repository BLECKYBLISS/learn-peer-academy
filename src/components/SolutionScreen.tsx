
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Handshake, Lock, Star, ArrowRight, Shield, Users } from 'lucide-react';

interface SolutionScreenProps {
  onEnterApp: () => void;
}

const SolutionScreen: React.FC<SolutionScreenProps> = ({ onEnterApp }) => {
  const solutions = [
    {
      icon: Handshake,
      title: "Direct P2P Connections",
      description: "Connect directly with tutors worldwide, eliminating middleman fees and reducing costs by up to 40%.",
      color: "text-accent",
      gradient: "from-accent/20 to-accent/10"
    },
    {
      icon: Shield,
      title: "Transparent Smart Contracts",
      description: "Blockchain-powered contracts ensure secure payments, clear terms, and automatic dispute resolution.",
      color: "text-primary",
      gradient: "from-primary/20 to-primary/10"
    },
    {
      icon: Star,
      title: "Verified Reputation System",
      description: "Immutable reviews and ratings help you find the perfect tutor with complete transparency.",
      color: "text-yellow-600",
      gradient: "from-yellow-500/20 to-yellow-400/10"
    }
  ];

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            The Future of
            <span className="text-gradient-primary block mt-2">Decentralized Learning</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Powered by blockchain technology, we're revolutionizing education accessibility
          </p>
        </div>

        {/* Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {solutions.map((solution, index) => (
            <Card 
              key={index} 
              className="glass-card rounded-2xl border-white/20 shadow-soft hover-lift group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <solution.icon className={`w-8 h-8 ${solution.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{solution.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{solution.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="glass-card rounded-2xl p-8 mb-12 border border-green-200/30 bg-green-50/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-green-700 mb-4">The Impact</h3>
              <ul className="space-y-3 text-green-600">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>40% lower tutoring costs</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>100% transparent transactions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Global access to quality tutors</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Verified credentials & reviews</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-accent flex items-center justify-center">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="animate-fade-in">
          <p className="text-xl text-foreground/70 mb-8">
            Ready to transform your learning experience?
          </p>
          <Button
            onClick={onEnterApp}
            size="lg"
            className="gradient-primary text-white shadow-elegant hover:shadow-lg transition-all duration-300 hover:scale-105 text-xl px-12 py-6"
          >
            Start Learning
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
          <p className="text-sm text-foreground/50 mt-4">
            Join thousands of students already learning on NovaLink
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolutionScreen;
