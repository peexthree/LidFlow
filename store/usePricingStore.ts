import { create } from 'zustand';

export type PricingStep = {
  id: string;
  question: string;
  options: { id: string; label: string; price: number; type: 'landing' | 'bot' | 'complex' | 'feature' | 'none' }[];
  multiple?: boolean;
};

export const PRICING_STEPS: PricingStep[] = [
  {
    id: "project_type",
    question: "Какова ваша конечная бизнес-цель?",
    options: [
      { id: "landing", label: "Только Landing (Свирепая конверсия)", price: 12000, type: "landing" },
      { id: "twa", label: "Telegram Web App (Внутри экосистемы)", price: 25000, type: "bot" },
      { id: "full", label: "Full-Stack доминация (Landing + TWA + Bot)", price: 60000, type: "complex" }
    ],
    multiple: false
  },
  {
    id: "ai_integration",
    question: "Интегрируем ИИ для автономных продаж (LLM)?",
    options: [
      { id: "ai_yes", label: "Да, хочу автономного продавца (24/7)", price: 15000, type: "feature" },
      { id: "ai_no", label: "Нет, обойдемся стандартами", price: 0, type: "none" }
    ],
    multiple: false
  },
  {
    id: "market_domination",
    question: "Уровень доминации на рынке (Визуал):",
    options: [
      { id: "3d_motion", label: "Premium (3D, GSAP, Cyberpunk эффекты)", price: 10000, type: "feature" },
      { id: "lid", label: "LID (Строгий минимализм, конверсионный)", price: 0, type: "none" }
    ],
    multiple: false
  },
  {
    id: "automation",
    question: "Нужна ли CRM и сквозная аналитика?",
    options: [
      { id: "crm_analytics", label: "Да, полная связка (amoCRM/Bitrix + Аналитика)", price: 15000, type: "feature" },
      { id: "crm_only", label: "Только базовая CRM-интеграция", price: 8000, type: "feature" },
      { id: "none", label: "Нет, данные собираются вручную", price: 0, type: "none" }
    ],
    multiple: false
  },
  {
    id: "payments",
    question: "Модуль прямого биллинга (Оплата онлайн):",
    options: [
      { id: "crypto_fiat", label: "Фиат (Эквайринг) + Криптопроцессинг", price: 10000, type: "feature" },
      { id: "fiat", label: "Только фиат (СБП / Карты)", price: 5000, type: "feature" },
      { id: "no_payment", label: "Без оплат внутри системы", price: 0, type: "none" }
    ],
    multiple: false
  }
];

// Optimized lookup map for option details
export const PRICING_MAP: Record<string, { label: string; price: number }> = {};
for (let i = 0; i < PRICING_STEPS.length; i++) {
  const step = PRICING_STEPS[i];
  const options = step.options;
  for (let j = 0; j < options.length; j++) {
    const opt = options[j];
    PRICING_MAP[opt.id] = { label: opt.label, price: opt.price };
  }
}

interface PricingState {
  currentStepIndex: number;
  selectedOptions: Record<string, string[]>;
  totalPrice: number;
  isComplete: boolean;
  selectOption: (stepId: string, optionId: string, price: number, multiple?: boolean) => void;
  nextStep: () => void;
  reset: () => void;
}

export const usePricingStore = create<PricingState>((set, get) => ({
  currentStepIndex: 0,
  selectedOptions: {},
  totalPrice: 0,
  isComplete: false,

  selectOption: (stepId, optionId, price, multiple = false) => set((state) => {
    const currentSelected = state.selectedOptions[stepId] || [];
    let newSelected: string[];

    if (multiple) {
      newSelected = currentSelected.includes(optionId)
        ? currentSelected.filter(id => id !== optionId)
        : [...currentSelected, optionId];
    } else {
      newSelected = [optionId];
    }

    return {
      selectedOptions: { ...state.selectedOptions, [stepId]: newSelected }
    };
  }),

  nextStep: () => set((state) => {
    // Calculate total price based on current selections using optimized lookup map
    let newTotal = 0;
    for (const stepId in state.selectedOptions) {
      const selected = state.selectedOptions[stepId];
      if (!selected) continue;
      for (let i = 0; i < selected.length; i++) {
        const optId = selected[i];
        if (optId) {
          const opt = PRICING_MAP[optId];
          if (opt) newTotal += opt.price;
        }
      }
    }

    if (state.currentStepIndex < PRICING_STEPS.length - 1) {
      return {
        currentStepIndex: state.currentStepIndex + 1,
        totalPrice: newTotal
      };
    }

    return {
      isComplete: true,
      totalPrice: newTotal
    };
  }),

  reset: () => set({ currentStepIndex: 0, selectedOptions: {}, totalPrice: 0, isComplete: false })
}));
