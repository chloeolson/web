import { Link } from "react-router-dom";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; //temporarily added here, will be refactored
import Modal from "@mui/material/Modal"; //temporarily added here, will be refactored
import moment from "moment";
import * as s from "./ArticlePreview.sc";
import {
  MyBox,
  StyledCloseButton,
  BodyContainer,
} from "../components/RedirectionNotificationModal.sc"; //temporarily added here, will be refactored
import { OrangeRoundButton } from "../components/allButtons.sc"; //temporarily added here, will be refactored
import Feature from "../features/Feature";
import { extractVideoIDFromURL } from "../utils/misc/youtube";

export default function ArticleOverview({
  article,
  dontShowPublishingTime,
  dontShowImage,
  hasExtension,
}) {
  const [isOpen, setIsOpen] = useState(false);

  let topics = article.topics.split(" ").filter((each) => each !== "");
  let difficulty = Math.round(article.metrics.difficulty * 100) / 10;

  function handleClose() {
    setIsOpen(false);
  }

  function handleOpen() {
    setIsOpen(true);
  }

  function titleLink(article) {
    let open_in_zeeguu = (
      <Link to={`/read/article?id=${article.id}`}>{article.title}</Link>
    );
    let open_externally = (
      //TODO: Refactor into separate components and add styling to the modal and article titles
      //Code related to the new redirection notification modal starts here
      <>
        <Modal open={isOpen} onClose={handleClose}>
          <>
            <MyBox>
              <div>
                {/* <h1>
                  You are being redirected to the original article page.
                </h1> */}
                <h1>
                  You are ready to continue
                  to&nbsp;the&nbsp;original&nbsp;article's website
                </h1>

                <BodyContainer>
                  <p>
                    <strong>Once there</strong>, find and{" "}
                    <strong>click the Zeeguu Reader icon</strong> in the top
                    right corner of&nbsp;your browser's toolbar
                    or&nbsp;on&nbsp;the&nbsp;list of your other extensions.{" "}
                    <strong>Then&nbsp;select&nbsp;Read</strong>.
                  </p>
                  <img
                    src={"../static/images/find_extension.png"}
                    //TODO: Add new alt description
                    alt="Zeeguu browser extension"
                  />
                </BodyContainer>
              </div>

              <a target="_blank" rel="noreferrer" href={article.url}>
                <OrangeRoundButton>Enter the article's site</OrangeRoundButton>
                {/* {article.title} */}
              </a>
              {/* TODO: Improve styling of the close button button */}
              <StyledCloseButton role="button" onClick={handleClose}>
                <CloseIcon />
              </StyledCloseButton>
            </MyBox>
          </>
        </Modal>
        <s.InvisibleTitleButton onClick={handleOpen}>
          {article.title}
        </s.InvisibleTitleButton>
      </>
      //Code related to the new redirection notification modal ends here
    );

    if (article.video) {
      return open_in_zeeguu;
    }

    if (!Feature.extension_experiment1() && !hasExtension) {
      // if the feature is not enabled and if they don't have the extension we always open in zeeguu
      return open_in_zeeguu;
    }

    // else, we only open in zeegu if it's a personal copy or the article
    // has an uploader, thus it's uploaded from our own platform
    // either by the user themselves or by a teacher maybe
    if (article.has_personal_copy || article.has_uploader) {
      return open_in_zeeguu;
    } else {
      return open_externally;
    }
  }

  return (
    <s.ArticlePreview>
      <s.Title>{titleLink(article)}</s.Title>
      <s.Difficulty>{difficulty}</s.Difficulty>
      <s.WordCount>{article.metrics.word_count}</s.WordCount>

      {article.video ? (
        <img
          alt=""
          style={{ float: "left", marginRight: "1em" }}
          src={
            "https://img.youtube.com/vi/" +
            extractVideoIDFromURL(article.url) +
            "/default.jpg"
          }
        />
      ) : (
        ""
      )}

      <s.Summary>{article.summary}</s.Summary>
      {!dontShowImage && (
        <s.SourceImage>
          <img src={"/news-icons/" + article.icon_name} alt="" />
        </s.SourceImage>
      )}
      {!dontShowPublishingTime && (
        <s.PublishingTime>
          ({moment.utc(article.published).fromNow()})
        </s.PublishingTime>
      )}
      <s.Topics>
        {topics.map((topic) => (
          <span key={topic}>{topic}</span>
        ))}
      </s.Topics>
    </s.ArticlePreview>
  );
}
