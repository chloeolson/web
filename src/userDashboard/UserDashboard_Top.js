import { PERIOD_OPTIONS, ACTIVITY_TIME_FORMAT_OPTIONS, TOP_TABS, USER_DASHBOARD_TITLES, USER_DASHBOARD_TEXTS } from "./dataFormat/ConstantsUserDashboard";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { UserDashboardGraphTile, UserDashboardHelperText, UserDashboardTile, UserDashboardTopContainer } from "./UserDashboard.sc";

const tabs = [ {id: 1, title: TOP_TABS.BAR_GRAPH}, {id: 2, title: TOP_TABS.LINE_GRAPH} ]

const periodOptions = [ {id: 1, title: PERIOD_OPTIONS.WEEK}, {id: 2, title: PERIOD_OPTIONS.MONTH}, {id: 3, title: PERIOD_OPTIONS.YEAR}, {id: 4, title: PERIOD_OPTIONS.YEARS}]

const timeFormatOptions = [ {id: 1, title: ACTIVITY_TIME_FORMAT_OPTIONS.SECONDS}, {id: 2, title: ACTIVITY_TIME_FORMAT_OPTIONS.MINUTES}, {id: 3, title: ACTIVITY_TIME_FORMAT_OPTIONS.HOURS}]

const TabList = ({ children }) => {
    return (
      <ul>
       {children}
      </ul>
     )
   }

const Tab = ({key, id, title, handleActiveTabChange}) => {
    return (
        <button onClick={() => handleActiveTabChange(id)}>{title}</button>
    )
}


const DropDownList = ({ children, handleChange, stateValue, isDisabled }) => {
    
    return isDisabled?

        (      
        <select disabled value={stateValue} onChange={(e) => handleChange(e.target.value)}>
            {children}
        </select>
        )

        : 
        (      
        <select value={stateValue} onChange={(e) => handleChange(e.target.value)}>
            {children}
        </select>
        )

   }

const DropDownOption = ({key, id, title}) => {
    return (
        <option value={title}>{title}</option>
    )
  }


export default function UserDashboard_Top({ activeTab, handleActiveTabChange, activeOption, handleActiveOptionChange, handleActiveTimeFormatChange, activeTimeFormatOption, dateForGraphs, setDateForGraphs }){

    return (
        
        <UserDashboardTopContainer>

            <UserDashboardTile> { USER_DASHBOARD_TITLES.MAIN_TITLE } </UserDashboardTile>
        
            <div>

            <TabList>
            {
              tabs.map(
                  tab => <Tab key={tab.id} id={tab.id} title={tab.title} handleActiveTabChange={handleActiveTabChange}/>
              )
              
            }
            </TabList>

            </div>

            <div>

            <UserDashboardGraphTile>{(activeTab===1)? USER_DASHBOARD_TITLES.BAR_GRAPH_TITLE : USER_DASHBOARD_TITLES.LINE_GRAPH_TITLE}</UserDashboardGraphTile>
            <UserDashboardHelperText>{(activeTab===1)? USER_DASHBOARD_TEXTS.BAR_GRAPH_HELPER_TEXT : USER_DASHBOARD_TEXTS.LINE_GRAPH_HELPER_TEXT}</UserDashboardHelperText>
            
            </div>
            
            <div>
            
            <DropDownList handleChange={handleActiveOptionChange} stateValue={activeOption}>
            {
              periodOptions.map(
                  option => <DropDownOption key={option.id} id={option.id} title={option.title}/>
              )
              
            }

            </DropDownList>

            {

            <DropDownList handleChange={handleActiveTimeFormatChange} stateValue={activeTimeFormatOption} isDisabled={(activeTab===2)}>
            {
                timeFormatOptions.map(
                    option => <DropDownOption key={option.id} id={option.id} title={option.title}/>
                )
                
            }
            </DropDownList>

            }

            <DatePicker 
                dateFormat="dd/MM/yyyy"
                selected={dateForGraphs}
                onChange={date => setDateForGraphs(date)}
            />

            </div>
        
        </UserDashboardTopContainer>

    );
}