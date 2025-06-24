
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, CheckCircle, Loader2, Shield } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const TutorRegistration = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [credentials, setCredentials] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    experience: '',
    hourlyRate: '',
    bio: '',
    education: ''
  });
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCredentials(file);
      toast({
        title: "File uploaded",
        description: "Credentials will be stored on IPFS for verification.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);

    // Simulate registration process
    setTimeout(() => {
      setIsRegistering(false);
      toast({
        title: "Registration Successful!",
        description: "Your tutor profile has been created and stored on the blockchain.",
      });
      console.log('Tutor registered:', formData);
      console.log('Credentials uploaded to IPFS');
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Become a Tutor</CardTitle>
          <CardDescription>
            Join our decentralized tutoring network and start earning LSK tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Personal Information</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Teaching Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Teaching Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject">Subject Expertise</Label>
                  <Select onValueChange={(value) => handleInputChange('subject', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="economics">Economics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="e.g., 5 years"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="hourlyRate">Hourly Rate (LSK tokens)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  placeholder="50"
                  min="1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="education">Education Background</Label>
                <Input
                  id="education"
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  placeholder="e.g., PhD in Mathematics, MIT"
                  required
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio & Teaching Philosophy</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell students about your teaching approach and experience..."
                  rows={4}
                  required
                />
              </div>
            </div>

            {/* Credentials Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Credentials Verification</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="credentials"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label htmlFor="credentials" className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">
                    Upload your credentials (diplomas, certificates)
                  </p>
                  <Button type="button" variant="outline" size="sm">
                    Choose Files
                  </Button>
                </label>
                {credentials && (
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-600">{credentials.name}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Files will be encrypted and stored on IPFS for verification</span>
              </div>
            </div>

            {/* Blockchain Features */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Blockchain Benefits</h4>
              <div className="space-y-1 text-sm text-blue-700">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">✓</Badge>
                  <span>Immutable reputation system</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">✓</Badge>
                  <span>Secure escrow payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">✓</Badge>
                  <span>Decentralized credential verification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">✓</Badge>
                  <span>Global accessibility</span>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isRegistering}>
              {isRegistering ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Registering on Blockchain...
                </>
              ) : (
                'Register as Tutor'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorRegistration;
