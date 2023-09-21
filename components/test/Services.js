import ServiceCard from "../testCompponents/ServiceCard";

const Services = () => {
  return (
    <section className="max-container flex justify-center flex-wrap gap-9">
      {services.map((service) => (
        <ServiceCard key={service.label} {...service} />
      ))}
    </section>
  );
};

export default Services;

const services = [
  {
    imgURL: "shipping",
    label: "Free shipping",
    subtext: "Enjoy seamless shopping with our complimentary shipping service.",
  },
  {
    imgURL: "payment",
    label: "Secure Payment",
    subtext:
      "Experience worry-free transactions with our secure payment options.",
  },
  {
    imgURL: "support",
    label: "Love to help you",
    subtext: "Our dedicated team is here to assist you every step of the way.",
  },
];
