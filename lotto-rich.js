window.onload = function() {
    const defaultLiffId = "1653428967-o7E452d2";   // change the default LIFF value if you are not using a node server
    myLiffId = defaultLiffId;
    initializeLiffOrDie(myLiffId);
};

function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        document.getElementById("liffAppContent").classList.add('uk-hidden');
        document.getElementById("liffIdErrorMessage").classList.remove('uk-hidden');
    } else {
        initializeLiff(myLiffId);
    }
}

function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            initializeApp();
        })
        .catch((err) => {
            document.getElementById("liffAppContent").classList.add('hidden');
            document.getElementById("liffInitErrorMessage").classList.remove('hidden');
        });
}

function initializeApp() {
    if (!liff.isLoggedIn() && !liff.isInClient()) {
        console.log('To get an access token, you need to be logged in. Please tap the "login" button below and try again.');
    } else {
        liff.getProfile().then(function(profile){
            document.getElementById('profilePicture').dataset.src = profile.pictureUrl;
            document.getElementById('profileName').textContent = profile.displayName;
        });
        
    }
}