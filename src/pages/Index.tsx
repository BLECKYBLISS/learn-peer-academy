
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Users, BookOpen, Shield, Wallet, Clock, MapPin, Sparkles, Award, TrendingUp } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import TutorRegistration from '@/components/TutorRegistration';
import SessionBooking from '@/components/SessionBooking';
import ReputationSystem from '@/components/ReputationSystem';
import EscrowPayment from '@/components/EscrowPayment';
import OnboardingFlow from '@/components/OnboardingFlow';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const mockTutors = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    subject: 'Mathematics',
    rating: 4.8,
    reviews: 127,
    hourlyRate: 50,
    availability: 'Available',
    location: 'Online',
    experience: '8 years',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Prof. Michael Rodriguez',
    subject: 'Computer Science',
    rating: 4.9,
    reviews: 89,
    hourlyRate: 65,
    availability: 'Available',
    location: 'Online',
    experience: '12 years',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Dr. Emily Johnson',
    subject: 'Physics',
    rating: 4.7,
    reviews: 156,
    hourlyRate: 55,
    availability: 'Busy',
    location: 'Online',
    experience: '10 years',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
];

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [activeTab, setActiveTab] = useState('browse');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  // Check if wallet is already connected on component mount
  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setIsWalletConnected(true);
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to connect your wallet.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setIsWalletConnected(true);
        setWalletAddress(accounts[0]);
        
        toast({
          title: "Wallet Connected",
          description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(accounts[0].length - 4)}`,
        });

        console.log('MetaMask wallet connected:', accounts[0]);
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      
      if (error.code === 4001) {
        toast({
          title: "Connection Rejected",
          description: "Please connect your wallet to use NovaLink.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Failed to connect to MetaMask. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress('');
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-elegant">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gradient-primary">
                NovaLink
              </h1>
              <Badge variant="outline" className="hidden md:flex bg-white/10 border-white/20 text-primary">
                <Sparkles className="w-3 h-3 mr-1" />
                Beta
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="hidden lg:flex glass border-white/20 text-foreground/80">
                <Shield className="w-3 h-3 mr-1" />
                Secured by Blockchain
              </Badge>
              {isWalletConnected ? (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    className="glass border-white/20 hover:bg-white/10 flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-soft"></div>
                    <Wallet className="w-4 h-4 text-primary" />
                    <span className="font-medium">{formatAddress(walletAddress)}</span>
                  </Button>
                  <Button
                    onClick={disconnectWallet}
                    variant="ghost"
                    size="sm"
                    className="hover:bg-white/10"
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="gradient-primary text-white shadow-elegant hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80">Decentralized Learning Platform</span>
          </div>
          
          {/* Enhanced Logo Section */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 gradient-primary rounded-3xl flex items-center justify-center shadow-2xl">
              <BookOpen className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient-primary">Dashboard</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto mb-12 leading-relaxed">
            Connect with expert tutors worldwide. Secure payments with cryptocurrency tokens. 
            Build your reputation in the decentralized education ecosystem.
          </p>
          
          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="glass-card rounded-2xl p-8 shadow-soft hover-lift">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl gradient-primary mb-4 mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-foreground/70 font-medium">Expert Tutors</div>
              <div className="text-sm text-foreground/50 mt-1">Verified & Rated</div>
            </div>
            
            <div className="glass-card rounded-2xl p-8 shadow-soft hover-lift">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent mb-4 mx-auto">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-accent mb-2">10k+</div>
              <div className="text-foreground/70 font-medium">Sessions Completed</div>
              <div className="text-sm text-foreground/50 mt-1">With 99% Success Rate</div>
            </div>
            
            <div className="glass-card rounded-2xl p-8 shadow-soft hover-lift">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">4.8★</div>
              <div className="text-foreground/70 font-medium">Average Rating</div>
              <div className="text-sm text-foreground/50 mt-1">Exceptional Quality</div>
            </div>
          </div>
        </div>

        {/* Wallet Connection Notice */}
        {!isWalletConnected && (
          <div className="glass-card rounded-2xl p-6 mb-12 text-center border border-amber-200/30 bg-amber-50/20">
            <div className="flex items-center justify-center space-x-3 text-amber-700">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-amber-600" />
              </div>
              <span className="font-medium text-lg">Connect your wallet to unlock all features</span>
            </div>
          </div>
        )}

        {/* Main Platform */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full max-w-3xl mx-auto mb-12 glass border-white/20 p-2 h-auto">
            <TabsTrigger value="browse" className="rounded-xl py-3 px-4 text-sm font-medium transition-all duration-300 data-[state=active]:shadow-elegant">
              Browse Tutors
            </TabsTrigger>
            <TabsTrigger value="register" className="rounded-xl py-3 px-4 text-sm font-medium transition-all duration-300 data-[state=active]:shadow-elegant">
              Become a Tutor
            </TabsTrigger>
            <TabsTrigger value="booking" className="rounded-xl py-3 px-4 text-sm font-medium transition-all duration-300 data-[state=active]:shadow-elegant">
              Book Session
            </TabsTrigger>
            <TabsTrigger value="reputation" className="rounded-xl py-3 px-4 text-sm font-medium transition-all duration-300 data-[state=active]:shadow-elegant">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="escrow" className="rounded-xl py-3 px-4 text-sm font-medium transition-all duration-300 data-[state=active]:shadow-elegant">
              Payments
            </TabsTrigger>
          </TabsList>

          {/* Browse Tutors */}
          <TabsContent value="browse" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4 text-gradient-primary">Find Your Perfect Tutor</h3>
              <p className="text-lg text-foreground/70">Browse verified tutors and book sessions instantly</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockTutors.map((tutor) => (
                <Card key={tutor.id} className="group glass-card rounded-2xl border-white/20 shadow-soft hover-lift overflow-hidden">
                  <CardHeader className="text-center pb-4">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl mx-auto mb-4 overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                        <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse-soft"></div>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold">{tutor.name}</CardTitle>
                    <CardDescription className="flex items-center justify-center space-x-2 text-primary">
                      <BookOpen className="w-4 h-4" />
                      <span className="font-medium">{tutor.subject}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-lg">{tutor.rating}</span>
                        <span className="text-foreground/60">({tutor.reviews})</span>
                      </div>
                      <Badge variant={tutor.availability === 'Available' ? 'default' : 'secondary'} 
                             className={tutor.availability === 'Available' ? 'bg-accent text-white' : ''}>
                        {tutor.availability}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3 text-sm text-foreground/70">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{tutor.experience} experience</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{tutor.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <div className="text-xl font-bold text-accent">
                        {tutor.hourlyRate} ETH/hr
                      </div>
                      <Button 
                        size="sm" 
                        disabled={tutor.availability === 'Busy' || !isWalletConnected}
                        onClick={() => setActiveTab('booking')}
                        className="gradient-primary text-white shadow-elegant hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tutor Registration */}
          <TabsContent value="register">
            <TutorRegistration />
          </TabsContent>

          <TabsContent value="booking">
            <SessionBooking />
          </TabsContent>

          <TabsContent value="reputation">
            <ReputationSystem />
          </TabsContent>

          <TabsContent value="escrow">
            <EscrowPayment />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
