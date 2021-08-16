import '../css/app.css';
const socialLoginBtn = document.getElementById('social-login');
const loginErrorElement = document.getElementById('social-login-error');
const socialLoginStorageKey = 'socialLogin';

if (socialLoginBtn) {
    socialLoginBtn.addEventListener('click', socialLogin)
}

async function socialLogin(event) {
    event.preventDefault();
    clearSocialLoginError();

    const response = await socialLoginPromise();

    if (!response?.success) {
        return showSocialLoginError();
    }

    window.location.href = '/';
    clearLocalStorageKey(socialLoginStorageKey);
}

function socialLoginPromise() {
    return new Promise(resolve => {
        openPopupWindow('http://localhost:3333/google/redirect', resolve);
    })
}

function openPopupWindow(url, promiseResolver) {
    const windowFeatures = "height=600,width=600";
    const newWindow = window.open(url, 'socialLogin', windowFeatures);
    const intervalWindowCheck = setInterval(() => {
        if (newWindow.closed) {
            clearInterval(intervalWindowCheck);
            handleWindowClose(promiseResolver);
        }
    }, 1000);

    if (window.focus) {
        newWindow.focus()
    }
}

function handleWindowClose(promiseResolver) {
    const storageStatus = getLocalStorageObject(socialLoginStorageKey)
    promiseResolver(storageStatus);
}

function getLocalStorageObject(objectKey) {
    const storedObjectString = localStorage.getItem(objectKey);
    return JSON.parse(storedObjectString);
}

function clearLocalStorageKey(key) {
    window.localStorage.removeItem(key);
}

function showSocialLoginError() {
    loginErrorElement.innerHTML = 'There was a problem with the login, please try again';
}

function clearSocialLoginError() {
    loginErrorElement.innerHTML = '';
}