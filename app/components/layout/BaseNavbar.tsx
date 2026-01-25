// Next
import Link from "next/link";
import Image from "next/image";

// Assets
import Logo from "@/public/assets/img/mamikosinvoice-logo.svg";

// ShadCn
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Icons
import { LayoutDashboard } from "lucide-react";

// Components
import { LanguageSelector, ThemeSwitcher } from "@/app/components";
import AuthButton from "@/app/components/AuthButton";
import BuyMeACoffeeButton from "@/app/components/BuyMeACoffeeButton";

const BaseNavbar = () => {
    return (
        <header className="container mx-auto max-w-7xl px-4 sm:px-5 lg:px-6 z-99">
            <nav>
                <Card className="flex flex-wrap justify-between items-center px-5 gap-5">
                    <Link href="/">
                        <Image
                            src={Logo}
                            alt="Mamikos InvoiceGE Logo"
                            width={190}
                            height={100}
                            loading="eager"
                            style={{ height: "auto" }}
                        />
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <LayoutDashboard className="h-4 w-4" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Button>
                        </Link>
                        <LanguageSelector />
                        <ThemeSwitcher />
                        <BuyMeACoffeeButton />
                        <AuthButton />
                    </div>
                </Card>
            </nav>
        </header>
    );
};

export default BaseNavbar;
