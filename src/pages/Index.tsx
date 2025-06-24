
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Users, BookOpen, Shield, Wallet, Clock, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import TutorRegistration from '@/components/TutorRegistration';
import SessionBooking from '@/components/SessionBooking';
import ReputationSystem from '@/components/ReputationSystem';
import EscrowPayment from '@/components/EscrowPayment';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                NovaLink
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="hidden md:flex">
                <Shield className="w-3 h-3 mr-1" />
                Secured by Blockchain
              </Badge>
              {isWalletConnected ? (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Wallet className="w-4 h-4 text-green-600" />
                    <span>{formatAddress(walletAddress)}</span>
                  </Button>
                  <Button
                    onClick={disconnectWallet}
                    variant="ghost"
                    size="sm"
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="flex items-center space-x-2"
                >
                  <Wallet className="w-4 h-4" />
                  <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Decentralized Learning Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Connect with expert tutors worldwide. Secure payments with cryptocurrency tokens. 
            Build your reputation in the decentralized education ecosystem.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Expert Tutors</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border">
              <div className="text-2xl font-bold text-green-600">10k+</div>
              <div className="text-gray-600">Sessions Completed</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border">
              <div className="text-2xl font-bold text-purple-600">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Wallet Connection Notice */}
        {!isWalletConnected && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-center">
            <div className="flex items-center justify-center space-x-2 text-amber-800">
              <Wallet className="w-5 h-5" />
              <span className="font-medium">Connect your wallet to access all features</span>
            </div>
          </div>
        )}

        {/* Main Platform */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full max-w-2xl mx-auto mb-8">
            <TabsTrigger value="browse">Browse Tutors</TabsTrigger>
            <TabsTrigger value="register">Become a Tutor</TabsTrigger>
            <TabsTrigger value="booking">Book Session</TabsTrigger>
            <TabsTrigger value="reputation">Reviews</TabsTrigger>
            <TabsTrigger value="escrow">Payments</TabsTrigger>
          </TabsList>

          {/* Browse Tutors */}
          <TabsContent value="browse" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">Find Your Perfect Tutor</h3>
              <p className="text-gray-600">Browse verified tutors and book sessions instantly</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTutors.map((tutor) => (
                <Card key={tutor.id} className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all">
                      <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" />
                    </div>
                    <CardTitle className="text-lg">{tutor.name}</CardTitle>
                    <CardDescription className="flex items-center justify-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{tutor.subject}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{tutor.rating}</span>
                        <span className="text-gray-500">({tutor.reviews})</span>
                      </div>
                      <Badge variant={tutor.availability === 'Available' ? 'default' : 'secondary'}>
                        {tutor.availability}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{tutor.experience} experience</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{tutor.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="text-lg font-bold text-green-600">
                        {tutor.hourlyRate} ETH/hr
                      </div>
                      <Button 
                        size="sm" 
                        disabled={tutor.availability === 'Busy' || !isWalletConnected}
                        onClick={() => setActiveTab('booking')}
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

          {/* Session Booking */}
          <TabsContent value="booking">
            <SessionBooking />
          </TabsContent>

          {/* Reputation System */}
          <TabsContent value="reputation">
            <ReputationSystem />
          </TabsContent>

          {/* Escrow Payment */}
          <TabsContent value="escrow">
            <EscrowPayment />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
