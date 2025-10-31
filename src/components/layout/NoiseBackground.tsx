export function NoiseBackground() {
  return (
    <div
      className="noise fixed inset-[-300%_-150%_auto_auto] h-[600%] w-[600%] animate-grain opacity-20 pointer-events-none z-[-1]"
      style={{
        backgroundSize: '200px',
        backgroundRepeat: 'repeat',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cfilter id='g'%3E%3CfeTurbulence baseFrequency='0.75' numOctaves='3' type='fractalNoise'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
      }}
      aria-hidden="true"
    ></div>
  );
}
