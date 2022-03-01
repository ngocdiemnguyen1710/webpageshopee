const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const btnLikes = $$('.home-product-item__like')
const cateItems = $$('.category-item')
const btnHomeFilters = $$('.home-filter__btn')
var appContents = $$('.app_content')

//Action Like
for(let btnLike of btnLikes) {
    btnLike.onclick = function(e) {
        e.preventDefault()
        this.classList.toggle('home-product-item__like--liked')
    }
}

//Choose category
for(let cateItem of cateItems) {
    cateItem.onclick = function(e) {
        e.preventDefault()
        $('.category-item.category-item--active').classList.remove('category-item--active')
        this.classList.add('category-item--active')
    }
}

//Tab of home filter
btnHomeFilters.forEach((btnHomeFilter, index) => {
    const appContent = appContents[index]

    btnHomeFilter.onclick = function() {
        $('.home-filter__btn.btn--primary').classList.remove('btn--primary')
        $('.app_content--active').classList.remove('app_content--active')
        this.classList.add('btn--primary')
        appContent.classList.add('app_content--active')
    }
});

//Log out
const userMenu = $('.header_navbar-user-menu')
const user = $('.header__navbar-user')
const itemShows = $$('[data-value="show"]')

userMenu.lastElementChild.onclick = function(e) {
    e.preventDefault()
    itemShows.forEach(item => {
        item.classList.remove('header__navbar-item--hide')
    })
    user.classList.add('header__navbar-item--hide')
}

//Script on mobile tablet

//sort bar
const btnSortBars = $$('.header__sort-item')
const btnSortBarActive = $('.header__sort-item--active')
const line = $('.header__sort-line')

line.style.left = btnSortBarActive.offsetLeft + 'px'
line.style.width = btnSortBarActive.offsetWidth + 'px'

btnSortBars.forEach((btnSortBar, index) => {
    const appContent = appContents[index]

    btnSortBar.onclick = function(e) {
        e.preventDefault()
        $('.header__sort-item--active').classList.remove('header__sort-item--active')
        $('.app_content--active').classList.remove('app_content--active')
        line.style.left = this.offsetLeft + 'px'
        line.style.width = this.offsetWidth + 'px'
        this.classList.add('header__sort-item--active')
        appContent.classList.add('app_content--active')
    }
});


//----------------------Modal-----------------------------
const registerOnNav = $('.header__navbar-item--register')
const loginOnNav = $('.header__navbar-item--login')
const modal = $('.modal')
const formRegister = $('.auth-form--register')
const formLogin = $('.auth-form--login')
const btnModalClose = $('.modal-close')
const btnSwitchLogin = $('.auth-form__switch-btn--login')
const btnSwitchSignUp = $('.auth-form__switch-btn--signup')
const formGroups = $$('.auth-form__group')
const errorMessage = $$('.form-message')
const inputElement = $$('.auth-form__input')

//Register
function signup() {
    modal.classList.add('open')
    formLogin.style.display = 'none'
}

//Login
function login() {
    modal.classList.add('open')
    formRegister.style.display = 'none'
}

registerOnNav.addEventListener('click', signup)
loginOnNav.addEventListener('click', login)

btnModalClose.onclick = function() {
    modal.classList.remove('open')
    formLogin.style.display = 'block'
    formRegister.style.display = 'block'
    formGroups.forEach(formGroup => {
        formGroup.classList.remove('invalid')
    })
    errorMessage.forEach(err => {
        err.innerText = ''
    })
    inputElement.forEach(input => {
        input.value = ''
    })
}

//Switch form 
btnSwitchLogin.onclick = function() {
    formRegister.style.display = 'none'
    formLogin.style.display = 'block'
}

btnSwitchSignUp.onclick = function() {
    formRegister.style.display = 'block'
    formLogin.style.display = 'none'
}
















