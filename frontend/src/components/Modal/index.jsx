import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
// import ReactDOM from 'react-dom';

export default function Modal({ isOpen, onClose }) {
  //   const [stateIsOpen, setStateOpen] = useState(false);
  //   const isControlled = typeof propsIsOpen === 'boolean';
  //   //   const closeModal = useCallback(() => {
  //   //     if (!isControlled) {
  //   //       setStateOpen(false);
  //   //     } else {
  //   //       tellParentToClose();
  //   //     }
  //   //   }, []);
  //   useEffect(() => {
  //     document.body.style.overflow = 'hidden';
  //     return () => {
  //       document.body.style.overflow = 'visible';
  //     };
  //   }, [isOpen]);
  //   return (
  //     <Fragment>
  //       {isOpen &&
  //         ReactDOM.createPortal(
  //           <div className="z-[1000] fixed top-0 left-0 h-full w-full overflow-x-hidden overflow-y-hidden">
  //             <div
  //               className="p-[50px] flex items-center justify-center min-h-full bg-[rgba(9, 30, 66, 0.54)]"
  //               variant={'center'}
  //             >
  //               <div className="inline-block relative w-full bg-[#fff] max-w-[800px] align-middle rounded-sm shadow-[0_5px_10px_0_rgba(0,0,0,0.1)]">
  //                 {'renderContent({ close: closeModal })'}
  //               </div>
  //             </div>
  //           </div>,
  //           $root,
  //         )}
  //     </Fragment>
  //   );
}

// const $root = document.getElementById('root');
