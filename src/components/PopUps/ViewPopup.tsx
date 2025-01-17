import { forwardRef } from "react";

interface Props {
  list: () => void;
  board: () => void;
}

const ViewPopup = forwardRef<HTMLDivElement, Props>(({ list, board }, ref) => (
  <div
    ref={ref}
    className="absolute right-4 top-8 z-10 mt-2 w-full min-w-[15rem] space-y-4 rounded border bg-white p-2"
  >
    <p>View</p>
    <div className="flex border-b border-neutral-600 pb-4">
      <button
        className="flex w-20 flex-col items-center rounded p-2 hover:bg-neutral-300"
        onClick={list}
      >
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
          License - https://fontawesome.com/license/free Copyright 2025
          Fonticons, Inc.
          <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
        </svg>
        <span>List</span>
      </button>
      <button
        className="flex w-20 flex-col items-center rounded p-2 hover:bg-neutral-300"
        onClick={board}
      >
        <svg
          className="h-4 w-4 rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
          License - https://fontawesome.com/license/free Copyright 2025
          Fonticons, Inc.
          <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
        </svg>
        <span>Board</span>
      </button>
    </div>
    <p>Sort By</p>
    <div className="space-y-2 *:p-1">
      <button className="flex w-full justify-between rounded hover:bg-neutral-300">
        <span>Sorting</span>
        <div className="flex items-center gap-x-1">
          <span>Default</span>
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
            License - https://fontawesome.com/license/free Copyright 2025
            Fonticons, Inc.
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </div>
      </button>
      <button className="flex w-full justify-between rounded hover:bg-neutral-300">
        <span>Order</span>
        <div className="flex items-center gap-x-1">
          <span>Ascending</span>
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
            License - https://fontawesome.com/license/free Copyright 2025
            Fonticons, Inc.
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </div>
      </button>
    </div>
  </div>
));

export default ViewPopup;
