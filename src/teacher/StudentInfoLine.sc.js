import styled, { css } from "styled-components";
import { darkBlue, darkGrey } from "../components/colors";
import "@reach/listbox/styles.css";

export const StudentInfoLine = styled.div`
  .wrapper {
    margin: 0 0 2em 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-bottom: 50 em;
    min-height: 10vh;
  }

  .sideline {
    height: 5em;
    padding-left: 2em;
    display: flex;
    flex-direction: row;
  }

  .sideline-header {
    display: flex;
    flex-direction: row;
  }

  .text-box {
    margin: 1.5em;
    color: black !important;
    width: 400px;
    margin-left: 1em;
  }

  .student-name-header {
    font-size: medium;
    margin-left: 3em;
  }

  .activity-count {
    font-size: small;
  }

  .progress-bar-wrapper{
    width: 300px;
    margin: 0 5em 0 0;
    line-height: 1.4em;
    padding-top: 1.5em;
  }

  .title-circle-wrapper{
    width:100px;
  }

  .number-display-wrapper {
    display: flex;
    justify-content: space-between;
    width: 350px;
    margin-top: 2em;
  }

  .number-display {
    line-height: 4em;
    display: flex;
    height: 3.8em;
    width: 2.8em;
    background-color: #e5e5e5;
    color: black;
    border-radius: 30px;
    padding-left: 1.1em;
    margin-left: 1.2em;
    margin-top: 2em;
    font-weight: 400;
    
  }

  .number-display-header {
    display: flex;
    text-align: center;
  }

  .head-title{
    font-family: "Montserrat";
    font-size: large;
    font-weight: 300;
    color: black;
    text-align: center;
  }

  .name-activity-wrapper{
  margin-left: 2em;
  }

  .left-line {
    display: flex;
    flex-direction: column;
    border-left: solid 3px ${darkBlue};
    height: 6vh;
    padding: 1vh 0 0 0;
  }
  .student-name{
    font-size: 20px;
    font-weight:400;
    margin-bottom: 0.3em;
  }

  .student-email{
    color: ${darkGrey};
    font-size: 16px;
    font-weight:400;
    margin-bottom: 0.2em;
  }

  .activity-count{
    font-size: 16px;
       font-weight:400;
       margin-bottom: 0.2em;
  }

  ${(props) =>
    props.isFirst &&
    css`

     .wrapper {
      padding-top: 5em;
      padding-bottom: 0;
     }

     .progress-bar-wrapper{
       margin-top: -3.5em;
     }

     .number-display{
      margin-top: 3.5em;
     }

     .title-progress-bar-wrapper{
      margin-top: -50em;
     }

     .number-display-wrapper{
       margin-top: -3.4em;
     }

     .text-box{
       margin-top: -2em;
     }
    .name-activity-wrapper{
      margin-top: 0;
    }

  
    
    `}
`;