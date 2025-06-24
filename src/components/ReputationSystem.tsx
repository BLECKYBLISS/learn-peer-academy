
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Award, MessageCircle, ThumbsUp } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const mockReviews = [
  {
    id: '1',
    tutorName: 'Dr. Sarah Chen',
    studentName: 'Anonymous Student',
    rating: 5,
    date: '2024-06-20',
    subject: 'Mathematics',
    review: 'Excellent explanation of calculus concepts. Very patient and thorough.',
    sessionHash: '0x1a2b3c4d5e6f...',
    verified: true
  },
  {
    id: '2',
    tutorName: 'Prof. Michael Rodriguez',
    studentName: 'Anonymous Student',
    rating: 4,
    date: '2024-06-18',
    subject: 'Computer Science',
    review: 'Great teaching style for algorithms. Could improve on time management.',
    sessionHash: '0x2b3c4d5e6f7a...',
    verified: true
  },
  {
    id: '3',
    tutorName: 'Dr. Emily Johnson',
    studentName: 'Anonymous Student',
    rating: 5,
    date: '2024-06-15',
    subject: 'Physics',
    review: 'Amazing at explaining complex physics concepts in simple terms!',
    sessionHash: '0x3c4d5e6f7a8b...',
    verified: true
  }
];

const ReputationSystem = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmitReview = async () => {
    if (selectedRating === 0 || !reviewText) {
      toast({
        title: "Missing Information",
        description: "Please provide both rating and review text.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate review submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedRating(0);
      setReviewText('');
      toast({
        title: "Review Submitted!",
        description: "Your review has been recorded on the blockchain and will help other students.",
      });
    }, 1500);
  };

  const renderStars = (rating: number, interactive = false, size = 'w-5 h-5') => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} ${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'fill-gray-200 text-gray-200'
        } ${interactive ? 'cursor-pointer hover:fill-yellow-300 hover:text-yellow-300' : ''}`}
        onClick={interactive ? () => handleRatingClick(i + 1) : undefined}
      />
    ));
  };

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-800">{averageRating.toFixed(1)}</div>
            <div className="text-blue-600">Average Rating</div>
            <div className="flex justify-center mt-2">
              {renderStars(Math.round(averageRating))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 text-center">
            <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-800">{mockReviews.length}</div>
            <div className="text-green-600">Total Reviews</div>
            <Badge variant="outline" className="mt-2 border-green-300 text-green-700">
              All Verified
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 text-center">
            <ThumbsUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-800">98%</div>
            <div className="text-purple-600">Satisfaction Rate</div>
            <div className="text-sm text-purple-500 mt-1">Based on 4+ star reviews</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Submit Review */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <span>Submit a Review</span>
            </CardTitle>
            <CardDescription>
              Share your learning experience with the community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rating Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Rate Your Experience</label>
              <div className="flex space-x-1">
                {renderStars(selectedRating, true, 'w-8 h-8')}
              </div>
              {selectedRating > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {selectedRating === 5 ? 'Excellent!' : 
                   selectedRating === 4 ? 'Very Good' :
                   selectedRating === 3 ? 'Good' :
                   selectedRating === 2 ? 'Fair' : 'Needs Improvement'}
                </p>
              )}
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-medium mb-2">Your Review</label>
              <Textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with this tutor. What did you learn? How was their teaching style?"
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Blockchain Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Blockchain Verification</h4>
              <div className="space-y-1 text-sm text-blue-700">
                <div>✓ Review will be permanently stored on Lisk blockchain</div>
                <div>✓ Cannot be deleted or modified after submission</div>
                <div>✓ Linked to verified session completion</div>
                <div>✓ Anonymous but traceable to prevent spam</div>
              </div>
            </div>

            <Button 
              onClick={handleSubmitReview}
              className="w-full"
              disabled={isSubmitting || selectedRating === 0 || !reviewText}
            >
              {isSubmitting ? 'Submitting to Blockchain...' : 'Submit Review'}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>
              Community feedback from verified sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {mockReviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-4 bg-white/50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium text-sm">{review.tutorName}</div>
                      <div className="text-xs text-gray-500">{review.subject}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {renderStars(review.rating, false, 'w-4 h-4')}
                      </div>
                      {review.verified && (
                        <Badge variant="outline" className="text-xs">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-2">{review.review}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{review.date}</span>
                    <span className="font-mono">
                      Hash: {review.sessionHash.substring(0, 12)}...
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReputationSystem;
