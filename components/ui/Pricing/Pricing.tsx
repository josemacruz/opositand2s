import PricingColumn from "./PricingColumn";

export const tiers = [
  {
    name: "Plan Básico",
    price: "9.99€",
    description: "Perfecto para comenzar tu preparación",
    features: [
      "Acceso a material básico",
      "Ejercicios de práctica",
      "Seguimiento básico de progreso",
      "Soporte por email",
    ],
  },
  {
    name: "Plan Avanzado",
    price: "19.99€",
    description: "La opción más completa para tu preparación",
    features: [
      "Todo lo del plan básico",
      "Material premium",
      "Simulacros de examen",
      "Soporte prioritario",
      "Acceso a comunidad exclusiva",
    ],
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="gradient-text mb-6 text-4xl font-bold md:text-5xl">
            Planes adaptados a tus necesidades
          </h2>
          <p className="text-lg text-gray-600">
            Elige el plan que mejor se adapte a tu preparación y presupuesto
          </p>
        </div>
        <div className="mt-16 flex justify-center">
          <div className="grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            {tiers.slice(0, 2).map((tier, index) => (
              <PricingColumn
                key={tier.name}
                tier={tier}
                highlight={index === 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
