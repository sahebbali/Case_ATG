export const options = [`V75`, `V86`, `GS75`];

export default function BetTypeSelect(props) {
  return (
    <div className="flex items-center bg-blue-950 border border-white/10 rounded-lg">
      <select
        placeholder="Amount"
        className="w-full border-0 p-4 bg-transparent text-2xl outline-none text-purple-200/80"
        value={props.value}
        onChange={props.onChange}>
        {options.map(betType => (
          <option key={betType} value={betType}>{betType}</option>
        ))}
      </select>
    </div>
  );
}