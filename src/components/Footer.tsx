import { useTranslations } from "next-intl";
import Image from "next/image";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-primary text-white py-4">
      <div className="mx-auto px-4 flex gap-5 justify-center items-center">
          <Image
            src={"/images/img_icon_white.png"}
            alt="logo"
            width={100}
            height={100}
            className="bg-transparent"
          />
        <div className="text-sm opacity-75">{t("copyright")}</div>
      </div>
    </footer>
  );
};

export default Footer;
