import { Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BuyMeACoffeeButton() {
  return (
    <a
      href="https://www.buymeacoffee.com/mamiko"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button variant="outline" size="sm" className="gap-2">
        <Coffee className="h-4 w-4" />
        <span className="hidden sm:inline">Buy me a coffee</span>
      </Button>
    </a>
  );
}
