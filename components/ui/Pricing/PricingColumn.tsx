import clsx from "clsx";
import { BsFillCheckCircleFill } from "react-icons/bs";

interface Props {
  tier: any;
  highlight?: boolean;
}

const PricingColumn: React.FC<Props> = ({ tier, highlight }: Props) => {
  const { name, price, features } = tier;

  return (
    <div
      className={clsx(
        "group mx-auto w-full max-w-sm transform rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:max-w-full",
        { "border-brand shadow-lg": highlight }
      )}
    >
      <div className="rounded-t-xl border-b border-gray-200 p-6">
        <h3 className="group-hover:text-brand mb-4 text-2xl font-semibold transition-colors">
          {name}
        </h3>
        <p className="mb-6 text-3xl font-bold md:text-5xl">
          <span
            className={clsx("group-hover:text-brand transition-colors", {
              "text-brand": highlight,
            })}
          >
            {typeof price === "number" ? `$${price}` : price}
          </span>
          {typeof price === "number" && (
            <span className="text-lg font-normal text-gray-600">/mo</span>
          )}
        </p>
        <button
          className={clsx(
            "w-full rounded-full px-4 py-3 transition-all duration-300",
            {
              "bg-brand hover:bg-brand-dark text-white": highlight,
              "bg-gray-100 text-gray-900 hover:bg-gray-200": !highlight,
            }
          )}
        >
          Comienza ahora
        </button>
      </div>
      <div className="mt-1 p-6">
        <p className="mb-0 font-bold text-gray-900">CARACTERÍSTICAS</p>
        <p className="mb-5 text-gray-600">
          Todo lo que necesitas para tu preparación
        </p>
        <ul className="mb-8 space-y-4">
          {features.map((feature) => (
            <li key={feature} className="group/item flex items-center">
              <BsFillCheckCircleFill className="text-brand group-hover/item:text-brand-dark mr-2 h-5 w-5 transition-colors" />
              <span className="text-gray-600 transition-colors group-hover/item:text-gray-900">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingColumn;
