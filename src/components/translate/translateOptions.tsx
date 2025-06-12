import useTranslate from '../../hooks/useTranslate';

function TranslateOptions() {
  const { changeLanguage, currentLanguage } = useTranslate();

  const languages = [
    { code: 'es', label: 'Español', flag: '/images/flags/es.svg' },
    { code: 'en', label: 'English', flag: '/images/flags/en.svg' },
  ];

  const handleLanguageChange = (code: string) => {
    changeLanguage(code);
  };

  return (
    <div className="flex space-x-4">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`p-1 border-2 rounded ${
            currentLanguage === lang.code ? 'border-blue-500' : 'border-gray-300'
          }`}
          aria-label={`Cambiar idioma a ${lang.label}`}
        >
          <img
            src={lang.flag}
            alt={lang.label}
            className="w-4 h-4"
          />
        </button>
      ))}
    </div>
  );
}

export default TranslateOptions;
