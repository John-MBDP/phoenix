import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";

const CustomAccordion = ({ header, description }) => {
  return (
    <Accordion
      sx={{
        backgroundColor: "#2E2E2E",
        padding: "0 0.7em",
        marginTop: "1em",
        color: "white",
        textAlign: "center",
        mb: "1rem"
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
        <Typography variant="body2">{header}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ textAlign: "left" }}>
        {description}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
