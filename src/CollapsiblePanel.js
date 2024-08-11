import {useEffect, useState} from "react";

export default function CollapsiblePanel({labelLeft, labelRight, children, onOpen, onClose, isLoading, size='xl'}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(ev) {
    ev.stopPropagation();
    isOpen ? onClose?.() : onOpen?.();
    setIsOpen(isOpen => !isOpen);
  }

  return (
      <div
        className="block relative border min-h-[64px] border-white/10 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 my-2 overflow-x-hidden">
        <div className="flex gap-4 p-4 cursor-pointer items-center min-h-[64px]" onClick={handleClick}>
          <div className={"flex gap-2 w-full items-center justify-between " + (size === 'xl' ? 'text-xl' : size === 'sm' ? 'text-sm' : size==='lg' ? 'text-lg' : '')}>
            <span className="text-purple-200/80 w-2/3">
              {labelLeft}
            </span>
            <span className="text-purple-300/25 w-1/3 text-right">{labelRight}</span>
          </div>
        </div>
        {isOpen && (
          <div className="py-4 border-t border-white/10 mx-4">
            {children}
          </div>
        )}
        {isLoading && (
          <div className="inset-0 absolute bg-gradient-to-r from-transparent via-blue-800/50 to-transparent skeleton-animation border-t border-white/25" />
        )}
      </div>
  );
}