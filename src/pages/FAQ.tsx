import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does BrandCollab work?",
      answer: "BrandCollab connects brands with influencers through our advanced matching system. Brands can post campaigns, and influencers can apply or be invited to collaborate.",
    },
    {
      question: "What are the fees?",
      answer: "We operate on a commission-based model. Fees are only charged when a successful collaboration is completed.",
    },
    {
      question: "How do you ensure quality collaborations?",
      answer: "We verify all users, monitor campaign progress, and have a rating system to maintain high standards.",
    },
    {
      question: "Can I use BrandCollab internationally?",
      answer: "Yes, BrandCollab is available worldwide, supporting multiple currencies and languages.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h1>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
};

export default FAQ;