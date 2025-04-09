"use client";

import { Subscription } from "@/hooks/useSubscription";
import { AlertTriangle } from "lucide-react";

interface SubscriptionCardProps {
  readonly subscription: Subscription | null;
  readonly subscriptionStatus: "activa" | "inactiva";
  readonly planName?: string;
}

export default function SubscriptionCard({
  subscription,
  subscriptionStatus,
  planName = "-",
}: SubscriptionCardProps) {
  const isActive = subscriptionStatus === "activa";

  return (
    <section className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Suscripción</h2>

      <div className="mb-4">
        <p className="text-gray-700">
          <span className="font-medium">Estado:</span>{" "}
          <span
            className={`font-semibold ${
              isActive ? "text-green-600" : "text-red-600"
            }`}
          >
            {subscriptionStatus.charAt(0).toUpperCase() +
              subscriptionStatus.slice(1)}
          </span>
        </p>
        {subscription?.cancel_at_period_end && (
          <div className="mt-6 flex items-start gap-4 rounded-2xl bg-yellow-50  p-4 border border-yellow-600">
            <div>
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm ">
                <span className="font-semibol">
                  Tu suscripción está activa pero terminará el
                </span>{" "}
                <span className="font-bold text-yellow-600">
                  {new Date(
                    subscription.current_period_end
                  ).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        )}

        <p className="text-gray-500 text-sm">
          Plan: <span className="font-medium">{planName}</span>
        </p>
      </div>

      <div className="flex gap-3">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          onClick={() => (window.location.href = "/pricing")}
        >
          {isActive ? "Gestionar suscripción" : "Suscribirme"}
        </button>
        <button
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition"
          onClick={() => alert("Funcionalidad futura: cancelar cuenta")}
        >
          Cancelar cuenta
        </button>
      </div>
    </section>
  );
}
