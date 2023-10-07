import { useState } from 'react'
import styles from '../styles/app.module.css'



export default function Home() {
   const [exp, setExp] = useState("Ans=0");
   const [newNum, setNewNum] = useState("0");
   const [freshState, setFreshState] = useState(true);

   const operatorArray = ['*', '+', '-', '/'];

   function numClick(input: string) {
      if (newNum === '0') {
         setNewNum(input);
         setFreshState(false);
      } else {
         setNewNum(newNum + input);
      }

   }

   function operatorClick(input: string) {
      if (operatorArray.includes(exp.charAt(exp.length - 1))) {
         if (newNum.length != 0) {
            const newExp = exp + newNum + input;
            setExp(newExp);
            setNewNum("");
         } else {
            setExp(exp.slice(0, -1) + input)
         }
      }
      if (exp === 'Ans=0') {
         setExp(newNum + input);
         setNewNum("");
         setFreshState(false)
      }
   }

   function del() {
      if (!freshState) {
         if (newNum.length != 0) {
            const temp = newNum.slice(0, -1);
            setNewNum(temp);
            if (temp.length === 0 && exp === 'Ans=0') {
               setNewNum('0');
               setFreshState(true);
            }
         } else {
            const temp = exp.slice(0, -1);
            setExp(temp);
            if (temp.length === 0) {
               setExp('Ans=0');
               setNewNum('0')
               setFreshState(true);
            }
         }
      }
   }

   function evaluate(expression: string) {
      let result = "";
      if (operatorArray.includes(expression.charAt(0)) || operatorArray.includes(expression.charAt(expression.length - 1))) {
         result = expression;
      } else {
         try {
            let temp = eval(expression);
            result = temp.toString();
         } catch (e) {
            result = 'Error';
         }
      }

      if (newNum.length > 0) {
         let temp = exp + newNum;
         setExp(temp);
         setNewNum(result);
         setFreshState(true);
      } else {
         setNewNum(result)
         setFreshState(true)
      }
   }

   return (
      <div id={styles.outerbody}>
         <div className={styles.calculatorcard}>
            <div className={styles.display}>
               <div><span>{exp}</span></div>
               <div id={styles.newNum}><span>{newNum}</span></div>
            </div>
            <div className={styles.inputscreen}>
               <button className={styles.inputbtn} id={styles.ac} onClick={() => { setExp("Ans=0"), setNewNum("0"), setFreshState(true) }}>AC</button>
               <button className={styles.inputbtn} id={styles.del} onClick={() => { !freshState && del() }}>DEL</button>
               <button id={styles.divide} className={styles.inputbtn} onClick={() => operatorClick('/')}>/</button>
               <button className={styles.inputbtn} onClick={() => (numClick('1'))}>1</button>
               <button className={styles.inputbtn} onClick={() => (numClick('2'))}>2</button>
               <button className={styles.inputbtn} onClick={() => (numClick('3'))}>3</button>
               <button className={styles.inputbtn} onClick={() => operatorClick('*')}>*</button>
               <button className={styles.inputbtn} onClick={() => (numClick('4'))}>4</button>
               <button className={styles.inputbtn} onClick={() => (numClick('5'))}>5</button>
               <button className={styles.inputbtn} onClick={() => (numClick('6'))}>6</button>
               <button className={styles.inputbtn} onClick={() => operatorClick('+')}>+</button>
               <button className={styles.inputbtn} onClick={() => (numClick('7'))}>7</button>
               <button className={styles.inputbtn} onClick={() => (numClick('8'))}>8</button>
               <button className={styles.inputbtn} onClick={() => (numClick('9'))}>9</button>
               <button className={styles.inputbtn} onClick={() => operatorClick('-')}>-</button>
               <button id={styles.decimal} className={styles.inputbtn} onClick={() => (numClick('.'))}>.</button>
               <button id={styles.zero} className={styles.inputbtn} onClick={() => (numClick('0'))}>0</button>
               <button id={styles.equals} className={styles.inputbtn} onClick={() => { !freshState && evaluate(exp + newNum) }} >=</button>
            </div>
         </div>
      </div>
   )
}
