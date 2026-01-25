"use client";

import { useTranslationContext } from "@/contexts/TranslationContext";

// Variables
import { AUTHOR_GITHUB } from "@/lib/variables";

const BaseFooter = () => {
    const { _t } = useTranslationContext();

    return (
        <footer className="container mx-auto max-w-7xl px-4 sm:px-5 lg:px-6 py-8 md:py-10">
            <p>
                {_t("footer.developedBy")}{" "}
                <a
                    href={AUTHOR_GITHUB}
                    target="_blank"
                    style={{ textDecoration: "underline" }}
                >
                    MAMIKO © MUT-i-GEN V1.0 for GIVA
                </a>
            </p>
        </footer>
    );
};

export default BaseFooter;
