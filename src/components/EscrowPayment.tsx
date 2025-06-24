
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Clock, CheckCircle, XCircle, AlertCircle, Wallet, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const mockEscrowTransactions = [
  {
    id: '1',
    sessionId: 'SES-001',
    tutorName: 'Dr. Sarah Chen',
    amount: 100,
    status: 'completed',
    createdAt: '2024-06-20T10:00:00Z',
    completedAt: '2024-06-20T12:00:00Z',
    studentAddress: '0x1234...5678',
    tutorAddress: '0x8765...4321',
    escrowAddress: '0xABCD...EFGH'
  },
  {
    id: '2',
    sessionId: 'SES-002',
    tutorName: 'Prof. Michael Rodriguez',
    amount: 130,
    status: 'active',
    createdAt: '2024-06-22T14:00:00Z',
    studentAddress: '0x1234...5678',
    tutorAddress: '0x9876...1234',
    escrowAddress: '0xBCDE...FGHI'
  },
  {
    id: '3',
    sessionId: 'SES-003',
    tutorName: 'Dr. Emily Johnson',
    amount: 75,
    status: 'disputed',
    createdAt: '2024-06-18T16:00:00Z',
    studentAddress: '0x1234...5678',
    tutorAddress: '0x5432...8765',
    escrowAddress: '0xCDEF...GHIJ'
  }
];

const EscrowPayment = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(mockEscrowTransactions[0]);
  const { toast } = useToast();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'active':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'disputed':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <XCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'disputed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleReleasePayment = () => {
    toast({
      title: "Payment Released",
      description: "Funds have been released to the tutor's wallet.",
    });
  };

  const handleDispute = () => {
    toast({
      title: "Dispute Initiated",
      description: "Your dispute has been submitted for community arbitration.",
    });
  };

  const totalEscrowValue = mockEscrowTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const activeEscrows = mockEscrowTransactions.filter(tx => tx.status === 'active').length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Escrow Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 text-center">
            <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-800">{totalEscrowValue} LSK</div>
            <div className="text-blue-600">Total in Escrow</div>
            <Badge variant="outline" className="mt-2 border-blue-300 text-blue-700">
              Secured by Smart Contract
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-800">
              {mockEscrowTransactions.filter(tx => tx.status === 'completed').length}
            </div>
            <div className="text-green-600">Completed Sessions</div>
            <div className="text-sm text-green-500 mt-1">100% Success Rate</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-800">{activeEscrows}</div>
            <div className="text-purple-600">Active Escrows</div>
            <div className="text-sm text-purple-500 mt-1">Awaiting Completion</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transaction List */}
        <div className="lg:col-span-1">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Escrow Transactions</CardTitle>
              <CardDescription>Your payment history and active escrows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockEscrowTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedTransaction.id === transaction.id
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(transaction.status)}
                        <span className="font-medium text-sm">{transaction.sessionId}</span>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">{transaction.tutorName}</div>
                    <div className="text-lg font-bold text-green-600">{transaction.amount} LSK</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Details */}
        <div className="lg:col-span-2">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Escrow Details - {selectedTransaction.sessionId}</span>
              </CardTitle>
              <CardDescription>
                Smart contract secured payment for tutoring session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Payment Status</span>
                  <Badge className={getStatusColor(selectedTransaction.status)}>
                    {selectedTransaction.status.toUpperCase()}
                  </Badge>
                </div>
                <Progress 
                  value={
                    selectedTransaction.status === 'completed' ? 100 :
                    selectedTransaction.status === 'active' ? 50 :
                    selectedTransaction.status === 'disputed' ? 25 : 0
                  } 
                  className="h-2"
                />
              </div>

              {/* Transaction Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tutor</label>
                    <div className="font-medium">{selectedTransaction.tutorName}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Amount</label>
                    <div className="text-2xl font-bold text-green-600">
                      {selectedTransaction.amount} LSK
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Created</label>
                    <div>{new Date(selectedTransaction.createdAt).toLocaleString()}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Student Address</label>
                    <div className="font-mono text-sm">{selectedTransaction.studentAddress}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tutor Address</label>
                    <div className="font-mono text-sm">{selectedTransaction.tutorAddress}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Escrow Contract</label>
                    <div className="font-mono text-sm">{selectedTransaction.escrowAddress}</div>
                  </div>
                </div>
              </div>

              {/* Payment Flow Visualization */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-3">Payment Flow</h4>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-sm">Student Wallet</span>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-sm">Escrow Contract</span>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm">Tutor Wallet</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedTransaction.status === 'active' && (
                <div className="flex space-x-4">
                  <Button onClick={handleReleasePayment} className="flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Release Payment
                  </Button>
                  <Button onClick={handleDispute} variant="outline" className="flex-1">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Dispute
                  </Button>
                </div>
              )}

              {/* Security Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Escrow Security Features</h4>
                <div className="space-y-1 text-sm text-blue-700">
                  <div>✓ Smart contract automatically handles fund release</div>
                  <div>✓ Funds locked until session completion confirmed</div>
                  <div>✓ Dispute resolution through community arbitration</div>
                  <div>✓ All transactions recorded on Lisk blockchain</div>
                  <div>✓ No single point of failure or control</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EscrowPayment;
