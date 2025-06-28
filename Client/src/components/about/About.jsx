import React from "react";
import {
  Container,
  Typography,
  Box,
  Divider,
  useTheme,
  Paper,
  List,
  ListItem,
} from "@mui/material";



const About = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom align="center">
        About ExpenseWiseAi
      </Typography>

      <Paper
        elevation={3}
        sx={{ p: 3, my: 3, background: theme.palette.background.paper }}
      >
        <Typography variant="body1" paragraph>
          <strong>ExpenseWiseAi</strong> is a personal finance AI assistant and
          budgeting platform built from the ground up by{" "}
          <strong>Pavan Kalyan Vandanapu</strong> as an open-source passion project. Born
          out of a need for intelligent, privacy-respecting budgeting tools,
          ExpenseWiseAi helps users gain clarity and control over their financial
          lives.
        </Typography>

        <Typography variant="body1" paragraph>
          With a focus on automation, transparency, and meaningful insights,
          ExpenseWiseAi is designed to be more than a tracker — it’s your
          financial co-pilot. Whether you’re a student, freelancer, or salaried
          professional, ExpenseWiseAi adapts to your habits and goals using AI.
        </Typography>

        <Typography variant="body1" paragraph>
          The project embraces the principles of open-source: community-driven
          development, accessibility, and innovation through collaboration. You
          can follow progress, contribute, or fork it on GitHub.
        </Typography>
      </Paper>

      <Divider sx={{ my: 5 }} />

      

      <Box>
        <Typography variant="h5" gutterBottom align="center">
          Our Mission & Values
        </Typography>

        <Typography variant="body1" paragraph>
          At its core, ExpenseWiseAi is built on these principles:
        </Typography>

        <List>
          <ListItem disableGutters>
            <Typography variant="body2">
              <strong>✨ Simplicity:</strong> Clean design and easy workflows
              for all users.
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body2">
              <strong>🔒 Privacy-first:</strong> You own your data — always.
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body2">
              <strong>⚙️ AI + Automation:</strong> Let intelligence handle the
              boring bits — data entry, budgeting, insights.
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body2">
              <strong>👐 Open-Source:</strong> Built to learn, share, and
              improve collaboratively.
            </Typography>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default About;
