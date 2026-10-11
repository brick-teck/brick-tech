import { Plus } from "lucide-react";
import { faqs } from "../data/product";
import { track } from "../lib/analytics";
export function FAQ() {
  return (
    <div className="faq-list">
      {faqs.map((faq, index) => (
        <details
          key={faq.question}
          name="faq"
          onToggle={(event) => {
            if (event.currentTarget.open)
              track("faq_expand", { question: String(index + 1) });
          }}
        >
          <summary>
            {faq.question}
            <Plus size={19} aria-hidden="true" />
          </summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
