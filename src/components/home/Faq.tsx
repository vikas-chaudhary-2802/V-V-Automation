import SectionHeading from "@/components/SectionHeading";

const faqs = [
  { q: "Do you manufacture the machines yourselves?", a: "Yes. V&V machines are engineered, assembled and tested in-house at our Delhi facility, so technical questions go straight to the people who built your machine." },
  { q: "How do I know which machine is right for me?", a: "Start with the Machine Finder on the home page, or share your material, job size, accuracy and volume with us. We will recommend a platform and configuration for your application." },
  { q: "Do you supply spare parts and CNC components?", a: "Yes. We supply servo motors and drives, spindle motors, CNC controllers, power supplies and MPG handwheels. Send a photo or model details and we will help identify the right part." },
  { q: "Is installation and operator training available?", a: "Yes. We provide site installation, operator guidance and after-sales support through our own team." },
  { q: "Do you serve customers outside Delhi?", a: "Yes. We supply and support manufacturers across India." },
];

/** Accessible, dependency-free accordion built on native <details>. */
const Faq = () => (
  <section className="faq-section section-space">
    <div className="container-section faq-layout">
      <SectionHeading eyebrow="COMMON QUESTIONS" title="Answers before you ask." copy="Still unsure? Call or WhatsApp us and speak with the team directly." />
      <div className="faq-list" data-reveal="up">
        {faqs.map((item, i) => (
          <details key={item.q} name="faq">
            <summary><span>{String(i + 1).padStart(2, "0")}</span>{item.q}<i aria-hidden="true" /></summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default Faq;
