
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, DollarSign, Shield, Video, MessageSquare } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const SessionBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTutor, setSelectedTutor] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [duration, setDuration] = useState('');
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();

  const tutors = [
    { id: '1', name: 'Dr. Sarah Chen', subject: 'Mathematics', rate: 50 },
    { id: '2', name: 'Prof. Michael Rodriguez', subject: 'Computer Science', rate: 65 },
    { id: '3', name: 'Dr. Emily Johnson', subject: 'Physics', rate: 55 }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const calculateTotal = () => {
    if (!selectedTutor || !duration) return 0;
    const tutor = tutors.find(t => t.id === selectedTutor);
    return tutor ? tutor.rate * parseInt(duration) : 0;
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !selectedTutor || !duration) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      toast({
        title: "Session Booked Successfully!",
        description: "Your session has been scheduled and funds have been placed in escrow.",
      });
      console.log('Session booked:', {
        date: selectedDate,
        time: selectedTime,
        tutor: selectedTutor,
        duration,
        total: calculateTotal()
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Form */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarDays className="w-5 h-5 text-blue-600" />
              <span>Book a Session</span>
            </CardTitle>
            <CardDescription>
              Schedule your learning session with expert tutors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tutor Selection */}
            <div>
              <Label>Select Tutor</Label>
              <Select onValueChange={setSelectedTutor}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your tutor" />
                </SelectTrigger>
                <SelectContent>
                  {tutors.map(tutor => (
                    <SelectItem key={tutor.id} value={tutor.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{tutor.name} - {tutor.subject}</span>
                        <Badge variant="outline">{tutor.rate} LSK/hr</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Session Type */}
            <div>
              <Label>Session Type</Label>
              <Select onValueChange={setSessionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select session type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4" />
                      <span>Video Call</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="chat">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>Text Chat</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Duration */}
            <div>
              <Label>Duration (hours)</Label>
              <Select onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="3">3 hours</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time Selection */}
            <div>
              <Label>Select Time</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {timeSlots.map(time => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="text-xs"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            {/* Topic */}
            <div>
              <Label htmlFor="topic">Session Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Calculus derivatives"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific topics or questions you'd like to cover..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Calendar and Summary */}
        <div className="space-y-6">
          {/* Calendar */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Booking Summary */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span>Booking Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedTutor && (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Tutor:</span>
                    <span className="font-medium">
                      {tutors.find(t => t.id === selectedTutor)?.name}
                    </span>
                  </div>
                  {selectedDate && (
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">
                        {selectedDate.toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                  )}
                  {duration && (
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{duration} hour(s)</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">{calculateTotal()} LSK</span>
                    </div>
                  </div>

                  {/* Escrow Information */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-sm text-blue-700">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">Escrow Protection</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                      Funds will be held in smart contract escrow until session completion
                    </p>
                  </div>

                  <Button 
                    onClick={handleBooking}
                    className="w-full" 
                    disabled={isBooking}
                  >
                    {isBooking ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Book Session & Pay'
                    )}
                  </Button>
                </div>
              )}
              
              {!selectedTutor && (
                <p className="text-gray-500 text-center py-4">
                  Select a tutor to see booking summary
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SessionBooking;
