$("#phonenumber").mask("+375 (99) 999-99-99", {autoclear: true});
$("#popup_phonenumber").mask("+375 (99) 999-99-99", {autoclear: true});
jQuery(document).ready(function ($) {
    $('.popup_image').magnificPopup({
        type: 'image'
    });
});
jQuery(document).ready(function ($) {
    $('.contacts_callbutton').magnificPopup({
        type: 'inline',
        closeOnBgClick: false,
        focus: '#popup_phonenumber'
    });
});
$('a[href^="#"]').click(function () {
    let href = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(href).offset().top
    });
    return false;
});
Date.prototype.toDateInputValue = (function () {
    const local = new Date(this);
    local.setDate(local.getDate() + 1);
    return local.toJSON().slice(0, 10);
});
$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() !== 0)
            $('#arrowup').fadeIn();
        else $('#arrowup').fadeOut();
    });
});

window.onload = init;
let currSlide = 0;
let totalPrice = 0;

function init() {
    let cross = document.getElementById("popup_call_cross");
    let btn_popup = document.getElementById("popup_call_button");
    cross.addEventListener('click', closePopup);
    btn_popup.addEventListener('click', function () {
        if (document.getElementById("popup_phonenumber").value.length > 0)
            closePopup();
    });

    let btn_left = document.getElementById("reviews_arrowleft");
    let btn_right = document.getElementById("reviews_arrowright");
    btn_left.addEventListener('click', clickLeft);
    btn_right.addEventListener('click', clickRight);

    let bouquetPrices = [100, 150, 200, 120, 140, 210, 2, -2, 1, 3, 10, -10];
    let bouquets = document.getElementsByClassName("calc")
    for (let i = 0; i < bouquets.length; i++) {
        bouquets[i].addEventListener('change', function () {
            if (this.checked)
                changeTotal(bouquetPrices[i])
            else changeTotal(-bouquetPrices[i]);
        });
    }

    let oMenu = document.getElementById("openMenu");
    let cMenu = document.getElementById("closeMenu");
    oMenu.addEventListener('click', openMenu);
    cMenu.addEventListener('click', closeMenu);

    document.getElementById('order_dateinput').setAttribute('min', new Date().toDateInputValue());
}

function closePopup() {
    $.magnificPopup.close();
    document.getElementById("popup_phonenumber").value = "";
}

function clickLeft() {
    currSlide = (currSlide + 2) % 3;
    redrawReviews();
}

function clickRight() {
    currSlide = (currSlide + 1) % 3;
    redrawReviews();
}

function redrawReviews() {
    for (let i = 0; i < 3; i++)
        if (i === currSlide) document.getElementById("reviews_reviewbox" + i).style.display = "flex";
        else document.getElementById("reviews_reviewbox" + i).style.display = "none";
}

function catchSubmit(e) {
    e.preventDefault();
    if ($('.order_bouquetcheckboxes :checkbox:checked').length === 0)
        document.getElementById('order_bouquetcheckboxestitle').scrollIntoView({behavior: "smooth"});
    else {
        document.getElementById("order_form").reset();
        alert('Заказ оформлен! В ближайшее время с вами свяжется наш оператор.')
    }
}

function changeTotal(change) {
    totalPrice += change;
    redrawPrice();
}

function clearTotal() {
    totalPrice = 0;
    redrawPrice();
}

function redrawPrice() {
    document.getElementById("order_pricenumber").innerHTML = totalPrice;
}

function openMenu() {
    document.documentElement.style.setProperty("--display_nav", "block");
    document.documentElement.style.setProperty("--display_menulogo", "none");
}

function closeMenu() {
    document.documentElement.style.setProperty("--display_nav", "none");
    document.documentElement.style.setProperty("--display_menulogo", "block");
}