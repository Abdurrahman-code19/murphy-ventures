export interface Service {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  equipmentType: string;
}

export const services: Service[] = [
  {
    slug: "note-counting-machine-repairs",
    title: "Note-counting machine repairs",
    summary:
      "Repair support for banknote counters that jam, miscount, or fail to start.",
    detail:
      "Banknote counters do the heaviest work in many cash offices. If your machine is jamming, miscounting, or not powering on, bring it to us or request a technician visit. We assess the equipment and confirm the repair with you.",
    equipmentType: "Banknote counting machine",
  },
  {
    slug: "time-stamp-machine-repairs",
    title: "Time stamp machine repairs",
    summary:
      "Repair support for time stamp and time recording machines.",
    detail:
      "Time stamp and time recording machines keep attendance and document control running. Tell us the make, model and fault, and we will assess the machine and confirm the repair arrangement with you.",
    equipmentType: "Time stamp machine",
  },
  {
    slug: "fireproof-safe-repairs",
    title: "Fireproof safe repairs",
    summary: "Repair support for fireproof safes used for cash and documents.",
    detail:
      "If a fireproof safe is no longer opening, closing or securing as it should, contact us with the details. We assess fireproof safes and confirm the repair arrangement with you.",
    equipmentType: "Fireproof safe",
  },
  {
    slug: "banking-equipment-maintenance",
    title: "Banking equipment maintenance",
    summary:
      "Maintenance for the banking equipment used at counters and cash points.",
    detail:
      "Regular maintenance helps keep counter equipment working predictably. Murphy Ventures provides maintenance for the banking equipment types we service. Contact us with the equipment details to arrange an assessment.",
    equipmentType: "Other",
  },
  {
    slug: "office-equipment-technical-support",
    title: "Office equipment technical support",
    summary:
      "Technical support for printing calculators, cheque writers and office machines.",
    detail:
      "From printing calculators and cheque writers to other office equipment, we provide technical support for the machines we supply and service. Share the fault and equipment details so we can advise on the next step.",
    equipmentType: "Other office equipment",
  },
];
