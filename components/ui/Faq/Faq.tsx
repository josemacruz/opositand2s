"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { BiMinus, BiPlus } from "react-icons/bi";

const faqs = [
  {
    question: "¿Cómo funciona la plataforma?",
    answer:
      "Opositandos es una plataforma online que te proporciona todo el material necesario para preparar tus oposiciones. Incluye temarios actualizados, ejercicios prácticos, simulacros de examen y seguimiento personalizado de tu progreso.",
  },
  {
    question: "¿Qué tipo de oposiciones puedo preparar?",
    answer:
      "Ofrecemos preparación para las principales oposiciones de la Administración Pública, incluyendo funcionarios, policía, bomberos, y otras especialidades. Cada especialidad tiene su propio material específico y actualizado.",
  },
  {
    question: "¿El material está actualizado?",
    answer:
      "Sí, nuestro equipo de expertos actualiza constantemente el material para reflejar los últimos cambios en las convocatorias y temarios oficiales. Además, te notificamos automáticamente cuando hay actualizaciones importantes.",
  },
  {
    question: "¿Puedo acceder al material desde cualquier dispositivo?",
    answer:
      "Sí, la plataforma es completamente responsive y puedes acceder desde cualquier dispositivo con conexión a internet. Tu progreso se sincroniza automáticamente entre dispositivos.",
  },
  {
    question: "¿Qué incluye el seguimiento personalizado?",
    answer:
      "El seguimiento personalizado incluye análisis de tu progreso, recomendaciones de estudio basadas en tu rendimiento, y la posibilidad de consultar dudas con nuestros expertos.",
  },
];

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-10 lg:py-20">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="">
          <p className="hidden text-foreground-accent lg:block">FAQ&apos;S</p>
          <div className="text-3xl lg:text-5xl lg:leading-tight font-bold">
            <h2 className="my-3 text-center !leading-snug lg:max-w-sm lg:text-left">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-center text-foreground-accent lg:mt-10 lg:text-left">
            Ask us anything!
          </p>
          <a
            href="mailto:"
            className="mt-3 block text-center text-xl font-semibold text-secondary hover:underline lg:text-left lg:text-4xl"
          >
            help@finwise.com
          </a>
        </div>

        <div className="mx-auto w-full border-b lg:max-w-2xl">
          {faqs.map((faq) => (
            <div key={faq.question} className="mb-7">
              <Disclosure>
                {({ open }) => (
                  <>
                    <DisclosureButton className="flex w-full items-center justify-between border-t px-4 pt-7 text-left text-lg">
                      <span className="text-2xl font-semibold">
                        {faq.question}
                      </span>
                      {open ? (
                        <BiMinus className="h-5 w-5 text-secondary" />
                      ) : (
                        <BiPlus className="h-5 w-5 text-secondary" />
                      )}
                    </DisclosureButton>
                    <DisclosurePanel className="px-4 pb-2 pt-4 text-foreground-accent">
                      {faq.answer}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
