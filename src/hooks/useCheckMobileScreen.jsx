"use client"
import { useContext } from 'react';
import { MyAppContext } from '../context/MyAppContext';


function useCheckMobileScreen() {
  const { appState } = useContext(MyAppContext);
  return appState.checkDevice;
}

export default useCheckMobileScreen;