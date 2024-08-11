import CollapsiblePanel from "./CollapsiblePanel";

export default function LoadingSkeleton() {
  return (
    <>
      <CollapsiblePanel isLoading={true} />
      <CollapsiblePanel isLoading={true} />
      <CollapsiblePanel isLoading={true} />
      <CollapsiblePanel isLoading={true} />
    </>
  );
}