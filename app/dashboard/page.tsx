"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/contexts/AuthContext";

import { useRouter } from "next/navigation";
import { useSubscription } from "@/hooks/useSubscription";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import { motion } from "framer-motion";
import { CreditCard, Settings, PlusCircle, Clock, Gem } from "lucide-react";

const AUTH_TIMEOUT = 15000; // 15 seconds

// Recent activity data
const recentActivity = [
  {
    id: 1,
    action: "New user signup",
    timestamp: "2 minutes ago",
    icon: <PlusCircle className="h-4 w-4" />,
  },
  {
    id: 2,
    action: "Payment processed",
    timestamp: "15 minutes ago",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    id: 3,
    action: "Settings updated",
    timestamp: "1 hour ago",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    id: 4,
    action: "Session completed",
    timestamp: "2 hours ago",
    icon: <Clock className="h-4 w-4" />,
  },
];

export default function Dashboard() {
  const { user, isSubscriber, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const {
    subscription,
    isLoading: isSubLoading,
    fetchSubscription,
  } = useSubscription();
  const [hasCheckedSubscription, setHasCheckedSubscription] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const { isInTrial, isLoading: isTrialLoading } = useTrialStatus();
  const [authTimeout, setAuthTimeout] = useState(false);

  // First check - Subscription and trial check
  useEffect(() => {
    if (isSubLoading || isTrialLoading) return;

    const hasValidSubscription = ["active", "trialing"].includes(
      subscription?.status ?? ""
    );

    console.log("Access check isInTrial:", {
      hasSubscription: !!subscription,
      status: subscription?.status,
      isInTrial: isInTrial,
      validUntil: subscription?.current_period_end,
    });

    // Only redirect if there's no valid subscription AND no valid trial
    if (!hasValidSubscription && !isInTrial) {
      console.log("No valid subscription or trial, redirecting");
      router.replace("/profile");
    }
  }, [subscription, isSubLoading, isTrialLoading, router, isInTrial]);

  // Second check - Auth check
  useEffect(() => {
    if (isAuthLoading || isTrialLoading) return;

    console.log("Access check:", {
      isSubscriber,
      hasCheckedSubscription,
      isInTrial: isInTrial,
      authLoading: isAuthLoading,
    });

    if (!hasCheckedSubscription) {
      setHasCheckedSubscription(true);

      // Allow access for both subscribers and trial users
      if (!user || (!isSubscriber && !isInTrial && !isAuthLoading)) {
        console.log("No valid subscription or trial, redirecting");
        router.replace("/profile");
      }
    }
  }, [
    isSubscriber,
    isAuthLoading,
    hasCheckedSubscription,
    router,
    user,
    subscription,
    isTrialLoading,
    isInTrial,
  ]);

  // Add refresh effect
  useEffect(() => {
    const refreshSubscription = async () => {
      await fetchSubscription();
      setHasCheckedSubscription(true);
    };

    if (user?.id) {
      refreshSubscription();
    }
  }, [user?.id, fetchSubscription]);

  useEffect(() => {
    if (user?.id) {
      // Check if user has completed onboarding
      const checkOnboarding = async () => {
        const { data } = await supabase
          .from("user_preferences")
          .select("has_completed_onboarding")
          .eq("user_id", user.id)
          .single();

        setHasCompletedOnboarding(!!data?.has_completed_onboarding);
        console.log("hasCompletedOnboarding: ", hasCompletedOnboarding);
      };

      checkOnboarding();
    }
  }, [user?.id, hasCompletedOnboarding]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && (isAuthLoading || isTrialLoading)) {
        setAuthTimeout(true);
      }
    }, AUTH_TIMEOUT);

    return () => clearTimeout(timer);
  }, [user, isAuthLoading, isTrialLoading]);

  // Update the loading check
  if (!user && (isAuthLoading || isTrialLoading) && !hasCheckedSubscription) {
    console.log("user: ", user);
    console.log("isAuthLoading: ", isAuthLoading);
    console.log("hasCheckedSubscription: ", hasCheckedSubscription);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mb-4 mx-auto"></div>
          <p className="text-foreground">
            {authTimeout
              ? "Taking longer than usual? Try refreshing the page 😊."
              : "Verifying access..."}
          </p>
        </div>
      </div>
    );
  }

  const handleSubscribeClick = () => {
    router.push("/profile");
  };

  return (
    <div className="min-h-screen mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      {/* Dashboard Content */}

      {/* Si no estas subscrito, te manda a la pagina de subscripcion */}
      {!isSubscriber && (
        <div className="p-6 flex flex-col items-center justify-center gap-4 border-dashed border-2 border-gray-300">
          <Gem className="w-10 h-10 text-yellow-500" />
          <h2 className="text-xl font-semibold text-center">
            Sin suscripción activa
          </h2>
          <p className="text-center text-gray-600 max-w-md">
            Para acceder al contenido, necesitas una suscripción activa. Elige
            el plan que mejor se adapte a ti y empieza a prepararte con todas
            las herramientas.
          </p>
          <button onClick={handleSubscribeClick} className="mt-2">
            Ver planes y suscribirme
          </button>
        </div>
      )}
      {/* Recent Activity */}
      <div className="bg-white dark:bg-neutral-dark rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-slate-900mb-6">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 text-sm"
            >
              <div className="p-2 bg-primary-light/10 rounded-lg">
                {activity.icon}
              </div>
              <div>
                <p className="text-slate-900">{activity.action}</p>
                <p className="text-slate-500 text-xs">{activity.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
