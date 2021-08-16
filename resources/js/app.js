import '../css/app.css'
const socialLoginBtn = document.getElementById('social-login');
if (socialLoginBtn) {
    socialLoginBtn.addEventListener('click', socialLogin)
}

window.socialLogin = socialLogin

async function socialLogin(event) {
    event.preventDefault();

    const response = await socialLoginPromise();
    if (response.success) {
        return window.location.href('/');
    }

    console.log('Social authentication did not work!')
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
    console.log('window got closed ');
    const storageStatus = getLocalStorageObject('socialLogin')
    promiseResolver({
        success: storageStatus.success
    });
}

function getLocalStorageObject(objectKey) {
    const storedObjectString = localStorage.getItem(objectKey);
    return JSON.parse(storedObjectString);
}

function setLocalStorageObject(objectKey, objectValue) {
    const stringObject = JSON.stringify(objectValue);
    localStorage.setItem(objectKey, objectValue);
}