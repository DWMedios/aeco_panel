import DarkMode from '../../components/darkmode';
import TranslateOptions from '../../components/translate/translateOptions';
import useTranslate from '../../hooks/useTranslate';

function Login() {
  const { t } = useTranslate();
  return (
    <div className='flex flex-col items-center justify-center h-screen dark:text-gray-100 dark:bg-gray-900'>
      <DarkMode />
      <h1>{t('Welcome')}</h1>
      <TranslateOptions />

    </div>
  )
}

export default Login