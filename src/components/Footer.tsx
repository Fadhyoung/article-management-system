import { useTranslations } from "next-intl";

const Footer = () => {

    const t = useTranslations("footer");
    
  return (
    <footer className="bg-indigo-700 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-1 mr-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#6366F1" />
                <path
                  d="M2 17L12 22L22 17V7L12 12L2 7V17Z"
                  fill="#6366F1"
                  opacity="0.5"
                />
              </svg>
            </div>
            <span className="text-sm">{t('logibrium')}</span>
          </div>
          <div className="text-sm opacity-75">
            {t('copyright')}
          </div>
        </div>
      </footer>
  );
}

export default Footer;