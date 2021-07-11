import React, { Fragment, useEffect, useState } from "react";
import strings from "../i18n/definitions";
import TimeSelector from "./TimeSelector";
import LocalStorage from "../assorted/LocalStorage";
import { useParams } from "react-router-dom";
import ReadingInsightAccordion from "./ReadingInsightAccordion";
import { CenteredContent } from "../components/ColumnWidth.sc";
import LoadingAnimation from "../components/LoadingAnimation";

export default function StudentReadingInsights({ api }) {
  const [forceUpdate, setForceUpdate] = useState(0);
  const selectedTimePeriod = LocalStorage.selectedTimePeriod();
  const studentID = useParams().studentID;
  const cohortID = useParams().cohortID;
  const [studentName, setStudentName] = useState("");
  const [cohortLang, setCohortLang] = useState("");
  const [readArticles, setReadArticles] = useState([]);
  const [articleCount, setArticleCount] = useState(-1);

  useEffect(() => {
    api.getCohortsInfo((cohortInfo) => {
      let currentCohort = cohortInfo.filter((each) => each.id === cohortID);
      setCohortLang(currentCohort[0].language_name);
    });
    api.getStudentInfo(
      studentID,
      cohortID,
      selectedTimePeriod,
      (studentInfo) => setStudentName(studentInfo.name),
      (error) => console.log(error)
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    api.getReadingSessions(
      studentID,
      cohortID,
      selectedTimePeriod,
      (readingSessions) => setReadArticles(readingSessions),
      (error) => console.log(error)
    );
    api.getStudentActivityOverview(
      studentID,
      selectedTimePeriod,
      cohortID,
      (activity) => setArticleCount(activity.number_of_texts),
      (error) => console.log(error)
    );
    // eslint-disable-next-line
  }, [forceUpdate]);

  const customText =
    readArticles &&
    studentName +
      strings.studentHasRead +
      articleCount +
      strings.textsInTheLastPeriod;

  if (studentName === "" || articleCount === -1) {
    return <LoadingAnimation />;
  }
  
  return (
    <Fragment>
      <TimeSelector setForceUpdate={setForceUpdate} customText={customText} />
      {readArticles.length === 0 ? (
        <CenteredContent>
          <h3>
            {strings.studentHasNotReadAnyArticles} {cohortLang}
          </h3>
        </CenteredContent>
      ) : (
        <div>
          <ReadingInsightAccordion readArticles={readArticles} />
        </div>
      )}
    </Fragment>
  );
}
