import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PsychologyIcon from "@mui/icons-material/Psychology";
import BugReportIcon from "@mui/icons-material/BugReport";

const faqContent = [
  {
    icon: <SecurityIcon color="primary" />,
    title: "Accounts & Security",
    faqs: [
      {
        question: "Is my financial data safe with ExpenseWiseAi?",
        answer:
          "Absolutely. We use end-to-end encryption, Firebase for secure authentication, and MongoDB Atlas with role-based access control to ensure your data is protected at every layer.",
      },
      {
        question: "Can I access my data across devices?",
        answer:
          "Yes, your account is cloud-synced. Log in from any device to securely access your full financial history, insights, and reports.",
      },
    ],
  },
  {
    icon: <SettingsIcon color="primary" />,
    title: "Features & Functionality",
    faqs: [
      {
        question:
          "What makes ExpenseWiseAi different from other budgeting tools?",
        answer:
          "ExpenseWiseAi uses AI to not just track your spending — it helps optimize your budget, gives personalized insights, and automates data entry via natural language.",
      },
      {
        question: "Can I categorize and filter my transactions?",
        answer:
          "Definitely. You can tag expenses (e.g., Food, Travel, Medical), filter by date or category, and export them for offline analysis.",
      },
      {
        question: "How does the AI assistant work?",
        answer:
          "Just type “I spent ₹1500 on groceries today” and the assistant will automatically log and categorize it. It can also provide budget tips and spending summaries.",
      },
    ],
  },
  {
    icon: <DashboardIcon color="primary" />,
    title: "App Usage & Dashboard",
    faqs: [
      {
        question: "Why is my current balance negative?",
        answer:
          "The balance is calculated as Total Income – Total Expenses. A negative balance means you’re overspending. Try the Budget Optimizer tool to rebalance.",
      },
      {
        question: "Can I export my data?",
        answer:
          "Yes. You can export your transaction history in CSV or Excel format from the dashboard in one click.",
      },
    ],
  },
  {
    icon: <PsychologyIcon color="primary" />,
    title: "AI & Automation",
    faqs: [
      {
        question: "How accurate are the financial insights?",
        answer:
          "The AI analyzes your spending patterns and improves with more data. It helps you reduce unnecessary spend and optimize savings.",
      },
      {
        question: "What’s next for ExpenseWiseAi AI?",
        answer:
          "Upcoming features include: goal tracking, real-time spend alerts, savings challenges, and exportable PDF reports.",
      },
    ],
  },
  {
    icon: <BugReportIcon color="primary" />,
    title: "Troubleshooting",
    faqs: [
      {
        question: "Transactions aren’t saving — what do I do?",
        answer:
          "Check your internet and try again. You can also refresh the page or contact support via the assistant.",
      },
      {
        question: "My AI assistant isn’t responding",
        answer:
          "Ensure you’re logged in. If the issue continues, try logging out and back in or clearing local storage.",
      },
    ],
  },
];

const AccordionFAQ = () => (
  <Container maxWidth="md" sx={{ py: 6, mt: 20 }}>
    <Typography variant="h4" gutterBottom align="center">
      Frequently Asked Questions
    </Typography>

    {faqContent.map((section, index) => (
      <Box key={index} sx={{ mt: 6 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          {section.icon}
          <Typography variant="h6">{section.title}</Typography>
        </Stack>

        {section.faqs.map((faq, idx) => (
          <Accordion key={idx} disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-content-${index}-${idx}`}
              id={`faq-header-${index}-${idx}`}
            >
              <Typography fontWeight={500}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        {index !== faqContent.length - 1 && <Divider sx={{ mt: 4 }} />}
      </Box>
    ))}
  </Container>
);

export default AccordionFAQ;
