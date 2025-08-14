export default function AboutFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div className='text-muted-foreground text-xs text-center'>
      Made with
      <span className='relative mx-1'>
        <span className='absolute animate-ping'>❤️</span>
        <span>❤️</span>
      </span>
      by Prateek Kumar — © {currentYear}
    </div>
  );
}
