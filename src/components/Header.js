import logo from '../images/logo_mesto.svg';

function Header() {
  return (
    <>
      <header className='header'>
        <a href='https://praktikum.yandex.ru/' className='header__link' target='_blank'><img src={logo} alt='логотип'
          className='header__logo' />
        </a>
      </header>
    </>
  )
}
export default Header