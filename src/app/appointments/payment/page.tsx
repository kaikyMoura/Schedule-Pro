"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Appointment Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="text-sm text-gray-600">Appointment:</div>
            <div className="text-lg font-semibold mt-2">Amount: <span className="text-blue-600">R$ 30,00</span></div>
          </div>
          {!paymentSuccess ? (
            <>
              <div className="mb-4">
                <Input placeholder="Card number" disabled={loading} />
                <Input placeholder="Name on card" className="mt-2" disabled={loading} />
                <div className="flex gap-2 mt-2">
                  <Input placeholder="MM/YY" className="w-1/2" disabled={loading} />
                  <Input placeholder="CVV" className="w-1/2" disabled={loading} />
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => {}}
                disabled={loading}
              >
                {loading ? "Processing payment..." : "Pay now"}
              </Button>
            </>
          ) : (
            <div className="text-green-600 font-semibold text-center py-4">
              Payment successful! Redirecting...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}