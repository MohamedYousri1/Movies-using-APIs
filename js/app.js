let searchWord = document.getElementById('searchByWord');
let searchInput = document.getElementById('searching');
const apiKey = 'ac1163adf90f71534d125cb1a34062ce';
const navigators = document.querySelectorAll('.sidebar .contents ul li a:not(.contact)');

let allMovies = [];
let filteredMovies = [];
let specificDetails = [];
// function To Get dataFilter From Navigator 
navigators.forEach((navigator) => {
    navigator.addEventListener('click', () => {
        if (navigator.getAttribute('data-filter') == 'trending') {
            getTrending();
        } else {
            getWithNav(navigator.getAttribute('data-filter'));
        }


    })
})


// Function To Get All Movies By Api URL  
async function getMovies() {
    let apiRes = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
    let finalResult = await apiRes.json();
    allMovies = finalResult.results
    displayMovies();
}
getMovies();

// Function to Filter The Movies 
async function filterMovies(searchTerm) {
    let apiRes = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${apiKey}&language=en-US&include_adult=false`);
    let finalResult = await apiRes.json();
    filteredMovies = finalResult.results
    displayFilteredMovies();
}

//  Function To Get Filterable Within The Navigator 
async function getWithNav(dataFilter) {
    let apiRes = await fetch(`https://api.themoviedb.org/3/movie/${dataFilter}?api_key=${apiKey}`);
    let finalResult = await apiRes.json();
    filteredMovies = finalResult.results;
    displayFilteredMovies();
}

// Function To Get Trending 
async function getTrending() {
    let apiRes = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`);
    let finalResult = await apiRes.json();
    filteredMovies = finalResult.results;
    displayFilteredMovies();
    console.log(filteredMovies);
}
// Function To Get Specific Detaisls 
async function watchIt(id) {
    let apiRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=ac1163adf90f71534d125cb1a34062ce&language=en-US`);
    let finalResult = await apiRes.json();
    // specificDetails = finalResult.results;

    if (finalResult.homepage) {
        location.href = `${finalResult.homepage}`;
    } else {
        location.href = `https://www.netflix.com/eg/browse/genre/34399`;
    }
}

// Function To Display Movies 

function displayMovies() {
    let content = ``;
    allMovies.forEach((movie) => {
        content += ` <div class="col-md-6 col-lg-4 my-3 shadow-lg">
        <div class="post position-relative overflow-hidden rounded-sm">
            <img class="img-fluid" src=" https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
            <div class="info d-flex justify-content-center align-items-center flex-column text-center">

                <h2 class="mb-3">${movie.title}</h2>
                <p>${movie.overview}</p>
                <p>rate: ${movie.vote_average}</p>
                <p>${movie.release_date}</p>
                <button onclick  = 'watchIt(${movie.id})' class =" visit btn btn-outline-light  text-dark font-weight-bold">Visit</button>
            </div>
        </div>


    </div>`
        document.getElementById('movies--contents').innerHTML = content;
    })
}

// Function To Display Filtered Movies 

function displayFilteredMovies() {
    let content = ``;
    filteredMovies.forEach((movie) => {
        content += ` <div class="col-md-6 col-lg-4 my-3 shadow-lg">
        <div class="post position-relative  overflow-hidden rounded-sm">
            <img class="img-fluid" src=" https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
            <div class="info  d-flex justify-content-center align-items-center flex-column text-center">

                <h2 class="mb-3">${movie.title}</h2>
                <p>${movie.overview}</p>
                <p>rate: ${movie.vote_average}</p>
                <p>${movie.release_date}</p>
                <button onclick  = 'watchIt(${movie.id})' class =" visit btn btn-outline-light  text-dark font-weight-bold">Visit</button>
            </div>
        </div>


    </div>`
        document.getElementById('movies--contents').innerHTML = content;
    })
}


// Define  Variables Of Contact Section 

let userName = document.getElementById('userName');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let age = document.getElementById('age');
let passWord = document.getElementById('passWord');
let rePassWord = document.getElementById('rePassWord');
let wrongName = document.querySelector('.wrong-name');
let wrongEmail = document.querySelector('.wrong-email');
let wrongPhone = document.querySelector('.wrong-phone');
let wrongAge = document.querySelector('.wrong-age');
let wrongPass = document.querySelector('.wrong-password');
let wrongrepass = document.querySelector('.wrong-repassword');
let submitBtn = document.getElementById('submit');


// Function To Check Validation On UserName 
function userNameValidate() {
    let isvalid;
    let regex = /^[A-Z][a-z]{9}$/;
    if (regex.test(userName.value) == true) {
        wrongName.classList.replace('d-block', 'd-none');
        isvalid = true;

    } else {
        wrongName.classList.replace('d-none', 'd-block');
        isvalid = false;
    }
    return isvalid;
}

// Function To Check Validation On  User Email  
function userEmailValidate() {
    let isvalid;
    let regex = /^[a-z0-9]+@(yahoo|gmail|outlook)\.com$/;
    if (regex.test(email.value) == true) {
        wrongEmail.classList.replace('d-block', 'd-none');
        isvalid = true;

    } else {
        wrongEmail.classList.replace('d-none', 'd-block');
        isvalid = false;
    }
    return isvalid;
}


// Function To Check Validation On  User Phone  
function userPhoneValidate() {
    let isvalid;
    let regex = /^(002)*01[0125][0-9]{8}$/;
    if (regex.test(phone.value) == true) {
        wrongPhone.classList.replace('d-block', 'd-none');
        isvalid = true;

    } else {
        wrongPhone.classList.replace('d-none', 'd-block');
        isvalid = false;
    }
    return isvalid;
}

// Function To Check Validation On  User Age  
function userAgeValidate() {
    let isvalid;
    let regex = /^([1-5][0-9]|60)$/;
    if (regex.test(age.value) == true) {
        wrongAge.classList.replace('d-block', 'd-none');
        isvalid = true;

    } else {
        wrongAge.classList.replace('d-none', 'd-block');
        isvalid = false;
    }
    return isvalid;
}

// Function To Check Validation On  User passWord  
function userPassValidate() {
    let isvalid;
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (regex.test(passWord.value) == true) {
        wrongPass.classList.replace('d-block', 'd-none');
        isvalid = true;

    } else {
        wrongPass.classList.replace('d-none', 'd-block');
        isvalid = false;
    }
    return isvalid;
}

// Function To Check Validation On  User RepassWord  and Make sure That Passwords Is Idyntical  
function userRePassValidate() {
    let isvalid;
    if (passWord.value === rePassWord.value) {
        wrongrepass.classList.replace('d-block', 'd-none');
        isvalid = true;

    } else {
        wrongrepass.classList.replace('d-none', 'd-block');
        isvalid = false;
    }
    return isvalid;
}









// add Events Listener 
searchWord.addEventListener('keyup', () => {
    filterMovies(searchWord.value);
    if (searchWord.value == '') {
        getMovies();
    }
});


searchInput.addEventListener('keyup', (e) => {
    if (searchWord.value.trim() == '') {
        e.preventDefault
    }
    let content = ``;
    if (searchInput.value.trim() == '') {
        document.getElementById('movies--contents').innerHTML = '';
    }
    for (let i = 0; i < filteredMovies.length; i++) {
        if (filteredMovies[i].title.toLowerCase().includes(searchInput.value.trim().toLowerCase())) {
            content += ` <div class="col-md-6 col-lg-4 my-3 shadow-lg">
            <div class="post position-relative overflow-hidden rounded-sm">
                <img class="img-fluid" src=" https://image.tmdb.org/t/p/w500/${filteredMovies[i].poster_path}" alt="">
                <div class="info   d-flex justify-content-center align-items-center flex-column text-center">
    
                    <h2 class="mb-3">${filteredMovies[i].title}</h2>
                    <p>${filteredMovies[i].overview}</p>
                    <p>rate: ${filteredMovies[i].vote_average}</p>
                    <p>${filteredMovies[i].release_date}</p>
                    <button onclick  = 'watchIt(${filteredMovies[i].id})' class =" visit btn btn-outline-light text-dark font-weight-bold">Visit</button>
                </div>
            </div>
    
    
        </div>`
            document.getElementById('movies--contents').innerHTML = content;
        }
    }
})



let allInput = document.getElementsByTagName('input');
for (let i = 0; i < allInput.length; i++) {
    allInput[i].addEventListener('blur', (e) => {
        e.target.style.color = '#FFF';
        e.target.style.color = '#FFF';

    });
    allInput[i].addEventListener('focus', (e) => {
        e.target.style.color = '#999';
    })
}

// For UserName 
userName.addEventListener('keyup', () => {
    wrongName.innerHTML = `Your Name Should Start With A-Z </br> Your Name Should  be 10 Characters`;
    userNameValidate();
});

userName.addEventListener('blur', () => {
    if (userNameValidate() == false) {
        wrongName.innerHTML = `Your Name Is Not Valid `;
    }
});

// For Email 
email.addEventListener('keyup', () => {
    wrongEmail.innerHTML = `Your Email Should be Small </br> Your Email Should  be 'Yahoo' or 'Gmail' or 'Outlook' </br> Your Email Should End With '.com'`;
    userEmailValidate();
});

email.addEventListener('blur', () => {
    if (userEmailValidate() == false) {
        wrongEmail.innerHTML = `Your Email Is Not Valid `;
    }
});

// For Phone 
phone.addEventListener('keyup', () => {
    wrongPhone.innerHTML = `Your Phone  Should be Egyptian Phone `;
    userPhoneValidate();
});

phone.addEventListener('blur', () => {
    if (userPhoneValidate() == false) {
        wrongPhone.innerHTML = `Your Phone Is Not Valid `;
    }
});

// For Age 
age.addEventListener('keyup', () => {
    wrongAge.innerHTML = `Your Age  Should be in Range Of [10-60] `;
    userAgeValidate();
});

age.addEventListener('blur', () => {
    if (userAgeValidate() == false) {
        wrongPhone.innerHTML = `Your Age Is Not Valid `;
        userRePassValidate();
    }
});

// For Password 
passWord.addEventListener('keyup', () => {
    wrongPass.innerHTML = `Your PassWord  Should Minimum eight characters </br> PassWord Should has at least one number  </br> PassWord Should has at least one Capital Character `;
    userPassValidate();

});

passWord.addEventListener('blur', () => {
    if (userPassValidate() == false) {
        wrongPass.innerHTML = `Your PassWord Is Not Valid `;
    }
});


// For Re Password Input  

rePassWord.addEventListener('blur', () => {
    if (userRePassValidate() == false) {
        wrongrepass.innerHTML = `Your PassWords  Not Idyntical`;
    }
});


// 
// Make Sure All Validation Is True 

submitBtn.addEventListener('click', (e) => {

    userAgeValidate();
    userEmailValidate();
    userNameValidate();
    userPhoneValidate();
    userPassValidate();
    userRePassValidate();
    if (userNameValidate() == true && userEmailValidate() == true && userAgeValidate() == true && userPhoneValidate() == true && userPassValidate() == true && userRePassValidate() == true) {
        submitBtn.classList.remove('disable');
        e.preventDefault();
    } else {
        submitBtn.classList.add('disable');


    }

});

// Start Using JQuery
$(document).ready(function() {
    // Working On The SideBar 
    let sidebar = $('.sidebar');
    let navigatorHeight = $('.sidebar .contents .navigator').innerHeight();
    $('.sidebar .contents ul li').css('paddingTop', navigatorHeight)

    $('.icon--controls i').on("click", () => {
        if (sidebar.css('left') == '-250px') {
            sidebar.animate({
                "left": '0px'
            }, 700);
            $('.icon--controls i ').addClass('fa-times');
            $('.sidebar .contents ul li').each(function() {
                $(this).animate({
                    paddingTop: `25px`
                }, 1500);
            });
        } else if (sidebar.css('left') == '0px') {
            sidebar.animate({
                "left": `-250px`
            }, 700);
            $('.icon--controls i ').removeClass('fa-times');
            $('.sidebar .contents ul li').each(function() {
                $(this).animate({
                    paddingTop: `${$('.sidebar .contents .navigator').innerHeight()}`
                }, 1500);
            });

        }
    });

    // scroll To The contact Section 
    $('.contact').on('click', () => {
        $('html , body ').animate({
            scrollTop: $('#contact').offset().top
        }, 1500)
    })
});