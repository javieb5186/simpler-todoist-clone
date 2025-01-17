export default function SaveTaskPopup() {
  return (
    <div className="absolute left-full top-full w-full max-w-xs rounded border bg-white p-1">
      <form>
        <div>
          <input type="text" placeholder="Add Title" />
          <input type="text" placeholder="Add Description" />
        </div>
        <div className="border-b">
          <button>Date</button>
          <button>Time</button>
        </div>
        <div>
          <button>Category</button>
          <button>Cancel</button>
          <button>Save Task</button>
        </div>
      </form>
    </div>
  );
}
