/** Organic mesh + grain — sits behind the whole page */
export function LiveBackground() {
  return (
    <div className="live-bg pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden>
      <div className="live-bg-mesh" />
      <div className="live-bg-orb live-bg-orb-a" />
      <div className="live-bg-orb live-bg-orb-b" />
      <div className="live-bg-orb live-bg-orb-c" />
      <div className="live-bg-grain" />
    </div>
  );
}
