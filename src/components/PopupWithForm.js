function PopupWithForm(props) {

  return (
    <>
      <div className={props.isOpen ? `pop-up pop-up_type_${props.name} pop-up_opened` : `pop-up pop-up_type_${props.name}`}>
        <div className={`pop-up__container pop-up__container_opened_${props.name}`} >
          <button 
            className={`pop-up__btn-close pop-up__btn-close_type_${props.name}`}
            type='button'
            aria-label='Закрыть форму'
            onClick={props.onClose}
          ></button>
          <form 
            name={`${props.name}`} 
            action='#' 
            className={`pop-up__form pop-up__form_${props.name}`} 
            method='POST'
          >
            <h3 className='pop-up__form-title'>{props.title}</h3>
              {props.children}
            {/* <input name='input-name' type='text' id='name-input' value=''
              className='pop-up__form-input pop-up__form-input_type_name' placeholder='Имя Фамилия' required minlength='2'
              maxlength='40' autocomplete='off' />
              <span className='pop-up__form-input-error' id='name-input-error'></span>

              <input name='input-hobby' type='text' id='hobby-input' value=''
                className='pop-up__form-input pop-up__form-input_type_hobby' placeholder='Хобби' required minlength='2'
                maxlength='200' autocomplete='off' /> */}
                {/* <span 
                  className='pop-up__form-input-error'
                  id='hobby-input-error'
                ></span> */}
          </form>
        </div>
      </div>
    </>
  )
}
export default PopupWithForm