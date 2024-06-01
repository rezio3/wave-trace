import { ListItem, ListItemButton, ListItemText } from "@mui/material";

const FaqItem = (props: {
  faqBtnHandler: (value: string) => void;
  question: string;
  response: string;
}) => {
  const faqBtnHandler = () => {
    props.faqBtnHandler(props.response);
  };
  return (
    <>
      <ListItem disablePadding onClick={faqBtnHandler}>
        <ListItemButton>
          <ListItemText primary={props.question} />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default FaqItem;
