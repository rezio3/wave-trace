import { List, Button, useMediaQuery } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./faq.scss";
import { useEffect, useState } from "react";
import FaqItem from "./FaqItem";
import { faqTxt } from "./faqData";
import { NavLink } from "react-router-dom";

const FaqPage = (props: { isUserLoggedIn: boolean }) => {
  const [paddings, setPaddings] = useState(5);
  const is1700screen = useMediaQuery("(max-width: 1700px)");
  const is1400screen = useMediaQuery("(max-width: 1400px)");
  useEffect(() => {
    if (is1400screen) {
      setPaddings(4);
    } else if (is1700screen) {
      setPaddings(4);
    } else {
      setPaddings(5);
    }
  }, [is1700screen, is1400screen]);

  const [response, setResponse] = useState(`What would you like to know?`);
  const faqBtnHandler = (response: string) => {
    setResponse(response);
  };
  return (
    <div
      className={
        !props.isUserLoggedIn ? "container w-100 mt-5 p-0" : "container w-100 "
      }
    >
      <div className={`p-${paddings} w-100 glass-container`}>
        {!props.isUserLoggedIn ? (
          <NavLink to="/">
            <Button variant="text" className="mb-4" name="back">
              <ArrowBackIosIcon />
              Back
            </Button>
          </NavLink>
        ) : null}

        <h4 className="pb-3 faq-header">Frequently Asked Questions</h4>
        <div className="d-flex">
          <List className="pb-3 faq-list-item">
            {faqTxt.map((e) => {
              return (
                <FaqItem
                  faqBtnHandler={faqBtnHandler}
                  question={e.question}
                  response={e.response}
                />
              );
            })}
          </List>
          <div className="w-50 ms-5">
            <p className="faq-text">{response}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
