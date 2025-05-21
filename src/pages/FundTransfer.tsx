import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import Header from "../components/ui/Header";

const steps = ["Recipient", "Amount", "Confirmation", "Result"];

export default function FundTransfer() {
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);
    setTimeout(() => {
      const result = Math.random() > 0.3;
      setIsSuccess(result);
      setStep(4);
    }, 1200);
  };

  const recipientAvatar = recipient ? (
    <div className="flex items-center gap-2">
      <FaUserCircle className="text-blue-400 text-3xl" />
      <span className="font-medium text-gray-700">{recipient}</span>
    </div>
  ) : null;

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-0 sm:p-6">
        <div className="max-w-xl mx-auto pt-8 pb-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
            Fund Transfer
          </h2>

          {/* Progress Indicator */}
          <div className="flex justify-between items-center mb-8 px-2">
            {steps.map((label, idx) => (
              <div key={label} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2
                ${
                  step === idx + 1
                    ? "border-blue-500 bg-blue-100 text-blue-700"
                    : step > idx + 1
                    ? "border-green-400 bg-green-100 text-green-600"
                    : "border-gray-300 bg-white text-gray-400"
                }
              `}
                >
                  {step > idx + 1 ? (
                    <BsCheckCircleFill className="text-green-400" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <span className="text-xs mt-1 text-gray-600">{label}</span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-lg font-semibold text-blue-700">
                Step 1: Recipient
              </h3>
              {recipientAvatar}
              <Input
                placeholder="Enter username, phone or wallet ID"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full"
              />
              <Button
                disabled={!recipient.trim()}
                className="w-full"
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </Card>
          )}

          {step === 2 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-lg font-semibold text-blue-700">
                Step 2: Amount
              </h3>
              <div className="flex gap-2 mb-2">
                {[10, 50, 100, 200].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`px-3 py-1 rounded border text-sm font-medium transition
                    ${
                      amount === amt
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
                    }
                  `}
                    onClick={() => setAmount(amt)}
                  >
                    GHS {amt}
                  </button>
                ))}
              </div>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount ?? ""}
                min={1}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="w-full"
              />
              <Input
                placeholder="Optional note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full"
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  disabled={!amount || amount <= 0}
                  onClick={() => {
                    if (!amount || amount <= 0) {
                      setError("Please enter a valid amount.");
                    } else {
                      setError(null);
                      setStep(3);
                    }
                  }}
                >
                  Continue
                </Button>
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-lg font-semibold text-blue-700">
                Step 3: Confirm Details
              </h3>
              <div className="bg-blue-50 rounded p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Recipient:</span>
                  {recipientAvatar}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Amount:</span>{" "}
                  <span className="text-blue-700 font-semibold">
                    GHS {amount?.toFixed(2)}
                  </span>
                </div>
                {note && (
                  <div>
                    <span className="font-medium text-gray-700">Note:</span>{" "}
                    {note}
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={handleSubmit}>Confirm & Send</Button>
              </div>
            </Card>
          )}

          {step === 4 && (
            <Card className="p-6 space-y-6 text-center">
              {isSuccess === null ? (
                <div className="text-blue-500 text-lg">Processing...</div>
              ) : isSuccess ? (
                <>
                  <BsCheckCircleFill
                    className="text-green-500 mx-auto"
                    size={48}
                  />
                  <h3 className="text-xl font-semibold text-green-600">
                    Transfer Successful
                  </h3>
                  <p>
                    Your transfer to{" "}
                    <span className="font-semibold">{recipient}</span> of{" "}
                    <span className="font-semibold">
                      GHS {amount?.toFixed(2)}
                    </span>{" "}
                    was completed.
                  </p>
                </>
              ) : (
                <>
                  <BsXCircleFill className="text-red-500 mx-auto" size={48} />
                  <h3 className="text-xl font-semibold text-red-600">
                    Transfer Failed
                  </h3>
                  <p>There was an issue sending funds. Please try again.</p>
                </>
              )}
              <Button
                className="mt-4"
                onClick={() => {
                  setStep(1);
                  setRecipient("");
                  setAmount(null);
                  setNote("");
                  setIsSuccess(null);
                  setError(null);
                }}
              >
                Start New Transfer
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
