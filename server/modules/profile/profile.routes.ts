import { Router } from "express";
import { achievements, hostelInfo, internships, studentProfile } from "../../data/mockDb";

export const profileRouter = Router();

profileRouter.get("/details", (_req, res) => {
  res.json({
    profile: studentProfile,
    erp: {
      faculty: "Bachelor Of Technology",
      batch: "Engineering 2023-2027",
      academicYear: "2025-2026",
      seatType: "Full Reimbursement",
      admissionDate: "28-08-2023",
      guardian: [
        { relation: "Father", name: "Sudireddy Madhukar Reddy", occupation: "Agriculture", phone: "9553327732" },
        { relation: "Mother", name: "Sudireddy Vedha", occupation: "House Wife", phone: "9849923775" },
      ],
      address: {
        present: "1-11 Laxmidevi Pally, Gangadhara, Karimnagar, Telangana 505445",
        permanent: "1-11 Laxmidevi Pally, Gangadhara, Karimnagar, Telangana 505445",
      },
      hostelInfo,
    },
  });
});

profileRouter.get("/achievements", (_req, res) => {
  res.json({ achievements });
});

profileRouter.get("/internships", (_req, res) => {
  res.json({ internships });
});
