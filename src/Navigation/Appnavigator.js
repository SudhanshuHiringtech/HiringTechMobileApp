import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../Screen/Login';
import Countryname from '../Screen/Countryname';
import HrRegistration from '../Screen/HrRegistration';
import CandidateRegistration from '../Screen/CandidateRegistration';
import Jobtype from '../Screen/Jobtype';
import Choosejob from '../Screen/Choosejob';
import Interest from '../Screen/Preferences/Interest';
import Addskill from '../Screen/Preferences/Addskill';
import Looking from '../Screen/Preferences/Looking';
import Workmode from "../Screen/Preferences/Workmode"
import WorkExpe from '../Screen/Preferences/WorkExpe';
import Refercity from "../Screen/Preferences/Refercity"
import Preferences from '../Screen/Preferences';
import ChandidateProfile from '../Screen/Resume/ChandidateProfile';
import SetupResume from '../Screen/Resume/SetupResume';
import Otp from '../Screen/Optscreen/Otp';
import VerificationCode from '../Screen/Optscreen/VerificationCode';
import Success from '../Screen/Optscreen/Success';
// import ForgotPassword from '../Screen/Resume/ForgotPassword';   
import Bottomtab from './Bottomtab';
import Profile from '../Screen/Profile';
import SplashScreen from '../Screen/SplashScreen';
import PersonalDetails from '../Screen/ProfileSection/PersonalDetails';
import Education from '../Screen/ProfileSection/Education';
import WorkExperience from '../Screen/ProfileSection/WorkExperience';
import JobDetailsScreen from '../Screen/JobDetailsScreen';
import ResetPasswordScreen from '../Screen/ResetPasswordScreen';
import AddComplaintScreen from '../Screen/AddComplaintScreen';
import ComplaintRegisterScreen from '../Screen/ComplaintRegisterScreen';
import CreateJobScreen1 from '../Screen/HRJobCreateSection/CreateJobScreen1';
import CreateJobScreen2 from '../Screen/HRJobCreateSection/CreateJobScreen2';
import CreateJobDescriptionScreen from '../Screen/HRJobCreateSection/CreateJobDescriptionScreen';
import CreateJobScreen4 from '../Screen/HRJobCreateSection/CreateJobScreen4';
import CreateJobScreen5 from '../Screen/HRJobCreateSection/CreateJobScreen5';
import ScheduleInterview from '../Screen/InterviewScreen/ScheduleInterview';
import AllInterview from '../Screen/InterviewScreen/AllInterview';
import ChatScreen from '../Screen/Chat/ChatScreen';
import SearchJobScreen from '../Screen/BottomTabScreen/SearchJobScreen';
import Candidates from '../../HRScreens/Candidates';
import forgotePassword from '../Screen/forgotePassword';
import Notifications from '../Screen/Notification';
import ChangePasswordScreen from '../Screen/ChangePasswordScreen';
import DeleteAcoount from '../Component/DeleteAcoountScreen';
import DeActivate from '../Component/DeActivate';

const Stack = createNativeStackNavigator();

const AppNavigator = ()=> {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 1000);
  }, []);
  return (

      <Stack.Navigator screenOptions={{headerShown: false}} >
      {/* {isSplashVisible && ( */}
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        {/* )} */}
      <Stack.Screen name="Choosejob" component={Choosejob} />
       <Stack.Screen name="Jobtype" component={Jobtype} />
       <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CandidateRegistration" component={CandidateRegistration} />
      <Stack.Screen name="HrRegistration" component={HrRegistration} />
      <Stack.Screen name="Bottomtab" component={Bottomtab} />
      <Stack.Screen name="ForgotPassword" component={forgotePassword} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="VerificationCode" component={VerificationCode} />
      <Stack.Screen name="Success" component={Success} />
      {/* <Stack.Screen name="Countryname" component={Countryname} /> */}
      {/* <Stack.Screen name="SetupResume" component={SetupResume} />
      <Stack.Screen name="ChandidateProfile" component={ChandidateProfile} /> */}
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      <Stack.Screen name="AddComplaintScreen" component={AddComplaintScreen} />
      <Stack.Screen name="ComplaintRegisterScreen" component={ComplaintRegisterScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="CreateJobScreen1" component={CreateJobScreen1} />
      <Stack.Screen name="CreateJobScreen2" component={CreateJobScreen2} />
      <Stack.Screen name= "CreateJobDescriptionScreen" component={CreateJobDescriptionScreen} />
      <Stack.Screen name="CreateJobScreen4" component={CreateJobScreen4} />
      <Stack.Screen name="CreateJobScreen5" component={CreateJobScreen5} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen name="Education" component={Education} />
      <Stack.Screen name="WorkExperience" component={WorkExperience} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen}/>
      <Stack.Screen name="ScheduleInterview" component={ScheduleInterview}/>
      <Stack.Screen name="AllInterview" component={AllInterview}/>
      <Stack.Screen name="Candidate" component={Candidates} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="forgotePassword" component={forgotePassword} />

      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="DeleteAcoount" component={DeleteAcoount} />
      <Stack.Screen name="DeActivate" component={DeActivate} />
      </Stack.Navigator>
  )

}

export default AppNavigator;

