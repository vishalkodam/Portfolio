export const writings = [
  {
    slug: "over-engineered-architecture",
    title: "The Wrong Assumption Behind Over-Engineered Architecture",
    subtitle:
      "What Nginx, eBPF, CDN edge design, and an EEG AI system taught me about not paying for fake boundaries.",
    date: "May 2026",
    dateTime: "2026-05-01",
    summary:
      "Apache paid for waiting with threads. Nginx kept the state and removed the thread. The same mistake shows up in CDN edge nodes, load balancers, Kubernetes networking, and microservices that split before they need to.",
    tags: ["Architecture", "Nginx", "CDN", "eBPF", "Modular Monolith"],
  },
];

export function getWritingBySlug(slug) {
  return writings.find((item) => item.slug === slug);
}
