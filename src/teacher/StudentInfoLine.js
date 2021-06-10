import React, { useEffect, useState } from "react";
import strings from "../i18n/definitions";
import { Link } from "react-router-dom";
import { MdHighlightOff } from "react-icons/md/";
import StudentActivityBar from "./StudentActivityBar";
import { StyledButton } from "./TeacherButtons.sc";
import DeleteStudentWarning from "./DeleteStudentWarning";
import * as s from "./StudentInfoLine.sc";
import LocalStorage from "../assorted/LocalStorage";

export default function StudentInfoLine({
  api,
  cohortID,
  student,
  setForceUpdate,
  isFirst,
}) {
  const [showDeleteStudentWarning, setShowDeleteStudentWarning] =
    useState(false);
  const selectedTimePeriod = LocalStorage.selectedTimePeriod();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    api.getStudentActivityOverview(
      student.id,
      selectedTimePeriod,
      cohortID,
      (studentActivityData) => {
        setActivity(studentActivityData);
      },
      (res) => console.log(res)
    );
    // eslint-disable-next-line
  }, [selectedTimePeriod]);

  const removeStudentFromCohort = () => {
    api.removeStudentFromCohort(student.id, (res) => {
      setForceUpdate((prev) => prev + 1);
      setShowDeleteStudentWarning(false);
    });
  };

  if (activity === null) {
    return <p> STRINGS Loading data for {student.name}...</p>;
  }

  return (
    <s.StudentInfoLine>
      <div className="wrapper" isFirst={isFirst}>
        <Link
          to={`/teacher/classes/viewStudent/${student.id}/class/${cohortID}`}
        >
          {isFirst && <p className="head-title">STRINGS Student name</p>}
          <div className="sideline">
            <div className="text-box">
              <div className="student-name">{student.name}</div>
              <div className="student-email">{student.email}</div>
              <div className="activity-count">
                {activity.number_of_texts} {strings.textsRead}
              </div>
              <div className="activity-count">
                {activity.exercises_count} {strings.exercisesCompleted}
              </div>
            </div>

            <div className="progress-bar">
              {isFirst && (
                <p className="head-title"> STRINGS Reading/Exercise time</p>
              )}
              <StudentActivityBar student={student} />
            </div>

            <div className="number-display-wrapper">
              <div>
                {isFirst && <p className="head-title"> STRINGS Text length</p>}
                <div className="number-display">
                  {activity.average_text_length}
                </div>
              </div>

              <div>
                {isFirst && (
                  <p className="head-title"> STRINGS Average text difficulty</p>
                )}
                <div className="number-display">
                  {activity.average_text_difficulty}
                </div>
              </div>

              <div>
                {isFirst && (
                  <p className="head-title">
                    {" "}
                    STRINGS Exercises correct on 1st attempt
                  </p>
                )}
                <div className="number-display">
                  {activity.correct_on_1st_try * 100 + "%"}
                </div>
              </div>
            </div>
          </div>
        </Link>
        <StyledButton
          icon
          style={{ marginTop: "15px", marginLeft: "25px" }}
          onClick={() => setShowDeleteStudentWarning(true)}
        >
          <MdHighlightOff size={35} />
        </StyledButton>
      </div>
      {showDeleteStudentWarning && (
        <DeleteStudentWarning
          studentName={student.name}
          cohortID={cohortID}
          removeStudent={removeStudentFromCohort}
          setShowDeleteStudentWarning={setShowDeleteStudentWarning}
        />
      )}
    </s.StudentInfoLine>
  );
}
