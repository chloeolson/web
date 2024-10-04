import {
  OPTIONS,
  TABS_IDS,
  USER_DASHBOARD_TITLES,
  STREAK_MESSAGE
} from "../ConstantsUserDashboard";
import * as s from "../userDashboard_Styled/UserDashboard.sc";
import IntervalDropdownList from "./IntervalDropdownList";
import TimeFormatDropdownList from "./TimeFormatDropdownList";
import UserDashboardTabs from "./UserDashboardTabs";
import UserDashboardDatePicker from "./UserDashboardDatePicker";

export default function UserDashboardTop({
  activeTab,
  handleActiveTabChange,
  activeTimeInterval,
  handleActiveTimeIntervalChange,
  handleActiveTimeFormatChange,
  activeTimeFormatOption,
  referenceDate,
  handleChangeReferenceDate,
  calculateStreak
}) {
  return (
    <s.UserDashboardTopContainer>
      <br />
      <br />

      <UserDashboardTabs
        activeTab={activeTab}
        handleActiveTabChange={handleActiveTabChange}
      />

      <s.UserDashboardHelperText>
        <>
          {activeTab === TABS_IDS.BAR_GRAPH
            ? USER_DASHBOARD_TITLES.BAR_GRAPH_TEXT
            : USER_DASHBOARD_TITLES.LINE_GRAPH_TEXT}

          <IntervalDropdownList
            handleActiveTimeIntervalChange={handleActiveTimeIntervalChange}
            activeTimeInterval={activeTimeInterval}
          />

          {(activeTimeInterval === OPTIONS.CUSTOM_WEEK ||
            activeTimeInterval === OPTIONS.CUSTOM_MONTH ||
            activeTimeInterval === OPTIONS.CUSTOM_YEAR) && (
            <UserDashboardDatePicker
              referenceDate={referenceDate}
              handleChangeReferenceDate={handleChangeReferenceDate}
            />
          )}
          {activeTab === TABS_IDS.BAR_GRAPH && (
            <>
              {USER_DASHBOARD_TITLES.TIME_COUNT_IN}
              <TimeFormatDropdownList
                activeTimeFormatOption={activeTimeFormatOption}
                handleActiveTimeFormatChange={handleActiveTimeFormatChange}
              />
            </>
          )}
        </>
      </s.UserDashboardHelperText>

    
      {activeTab === TABS_IDS.BAR_GRAPH ?
      <s.StreakDisplay>
      <>
          {activeTab === TABS_IDS.BAR_GRAPH
            ? STREAK_MESSAGE.YOUR_STREAK
            : null}
        <s.Streak>  

        </s.Streak>
        </>

      </s.StreakDisplay>
        : null}

    </s.UserDashboardTopContainer>
  );
}
