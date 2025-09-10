export function AtaiLogo({ className = "h-6" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 50" 
      className={className}
      fill="currentColor"
    >
      <text 
        x="10" 
        y="35" 
        fontFamily="Arial, sans-serif" 
        fontSize="32" 
        fontWeight="300" 
        letterSpacing="4"
        fill="currentColor"
      >
        ATAI
      </text>
    </svg>
  );
}

export function AxenovaLogo({ className = "h-6" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 300 50" 
      className={className}
      fill="currentColor"
    >
      <text 
        x="10" 
        y="35" 
        fontFamily="Arial, sans-serif" 
        fontSize="28" 
        fontWeight="300" 
        letterSpacing="2"
        fill="currentColor"
      >
        AXENOVA
      </text>
    </svg>
  );
}