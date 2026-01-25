// Components
import { InvoiceMain } from "@/app/components";
import AuthButton from '@/app/components/AuthButton';  // ← HIER ändern!

export default function Home() {
    return (
        <main className="py-10 relative">
            {/* Auth Button oben rechts */}
            <div className="absolute top-4 right-4">
                <AuthButton />
            </div>
            
            <div className="container mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
                <InvoiceMain />
            </div>
        </main>
    );
}
