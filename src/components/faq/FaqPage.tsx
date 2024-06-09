import { List, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./faq.scss";
import { useState } from "react";
import FaqItem from "./FaqItem";
import { faqTxt } from "./faqData";
import { NavLink } from "react-router-dom";

const FaqPage = (props: { isUserLoggedIn: boolean }) => {
  const [response, setResponse] = useState(`What would you like to know?`);
  const faqBtnHandler = (response: string) => {
    setResponse(response);
  };
  return (
    <div
      className={
        !props.isUserLoggedIn ? "container w-100 mt-5 p-0" : "container w-100"
      }
    >
      <div className="p-5 w-100 glass-container">
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
