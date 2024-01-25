import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { create } from 'zustand';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
export interface Count{
  count : number
  inc : () => void ,
  dec : () => void ,
  reset : () => void ,
  incByValue : (val : number) => void
} 
export const useStore = create<Count>((set) => ({
  count : 0 ,
  inc : () => set( (state) => ({ count : state.count + 1}) ) ,
  dec : () => set((state) => ({ count : state.count - 1 })) ,
  reset : () => set( ( { count : 0 } ) ) ,
  incByValue : (val : number) => set( (state) => ({ count : state.count + val }))
}) )
root.render(
    <App />
);
