import { useMemo } from "react";

// Next
import Link from "next/link";
import Image from "next/image";

// Assets
import Logo from "@/public/assets/img/mamikosinvoice-logo.svg";

// ShadCn
import { Card } from "@/components/ui/card";

// Components
import { LanguageSelector, ThemeSwitcher } from "@/app/components";

const BaseNavbar = () => {

    return (
        <header className="container mx-auto max-w-7xl px-4 sm:px-5 lg:px-6 z-[99]">
            <nav>
                <Card className="flex flex-wrap justify-between items-center px-5 gap-5">
                    <Link href={"/"}>
                        <Image
                            src={Logo}
                            alt="Mamikos InvoiceGE Logo"
                            width={190}
                            height={100}
                            loading="eager"
                            style={{ height: "auto" }}
                        />
                    </Link>
                    <LanguageSelector />
                    <ThemeSwitcher />
                </Card>
            </nav>
        </header>
    );
};

export default BaseNavbar;
