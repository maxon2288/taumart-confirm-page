$(window).ready(function () {
    
    
    // validate
    $('.form-change-1').each(function () {
        var it = $(this);
        it.validate({
            rules: {
                phone: {
                    required: true,
                },
            },
            errorPlacement: function (error, element) {
            },
            submitHandler: function() {
                $.ajax({
                    success: function(){
                        $(".sms2-trigger").trigger("click")
                    }
                });
            },  
        });
    });
    $('.form-change-2').each(function () {
        var it = $(this);
        it.validate({
            rules: {
                password: {
                    required: true,
                    minlength: 8,
                },
            },
            errorPlacement: function (error, element) {
            },
            submitHandler: function() {
                $.ajax({
                    success: function(){
                        it.find(".popup__close").trigger("click")
                    }
                });
            },  
        });
    });
    // validate
    $('.recovery-form-1').each(function () {
        var it = $(this);
        it.validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                },
            },
            errorPlacement: function (error, element) {
            },
            submitHandler: function() {
                $.ajax({
                    success: function(){
                        $(".change-password-trigger").trigger("click")
                    }
                });
            },  
        });
    });
    // validate
    
    $('.form-validate-sms-2').each(function () {
        var it = $(this);
        it.validate({
            rules: {
                phone: {
                    required: true,
                },
                code1: {required: true,},
                code2: {required: true,},
                code3: {required: true,},
                code4: {required: true,}
            },
            errorPlacement: function (error, element) {
            },
            submitHandler: function() {
                $.ajax({
                    success: function(){
                        it.find(".popup__close").trigger("click")
                    }
                });
            },  
        });
    });

    // popup

    $(".m-cookie-close").click(function() {
        $(".m-cookie").remove();
    });

    $(".m-cookie-2-close").click(function() {
        $(".m-cookie-2").remove();
    });
    
    $('body').on('click', '[data-popup]', function (e) { //Вызов попапов
        e.preventDefault();
        var popup = $(this).data('popup');
        var width = $('.m-popup__container').prop('scrollWidth');
        $('html').addClass('no-scroll');
        $('body').css('width', width);
        $('.m-popup__container').addClass('active');
        $('.popup').removeClass('active');
        $('.popup-' + popup).addClass('active');
        if (popup == "sms2") {
            $(".time").each(function() {
                var time = +$(this).text();
                var it = $(this);
                var timerIn = setInterval(function() {
                    if (time == 0) {
                        clearInterval(timerIn);
                        $(".timer__output").addClass("active")
                        var text = $(".timer__desc input").val();
                        document.location.href = text;
                    } else {
                        time = time - 1
                        it.text(time);
                    }
                }, 1000);
                $(".timer-set").click(function() {
                    clearInterval(timerIn);
                    $(".timer__output").addClass("active")
                    var text = $(".timer__desc input").val();
                    document.location.href = text;
                });
                
                $(".block2__button").click(function() {
                    var text = $(".timer__desc input").val();
                    document.location.href = text;
                });
                $(".timer__desc a").click(function() {
                    var text = $(".timer__desc input").val();
                    document.location.href = text;
                });
            });
        } 
    });

    $('body').on('mousedown', '.m-popup__container', function (e) { //Закрытие попапов по .m-popup__container
        if (this == e.target) {
            $('.popup').removeClass('active');
            $('html').removeClass('no-scroll');
            $('body').css('width', 'auto');
            $('.m-popup__container').removeClass('active');
            $('.popup').each(function () {
                $(this).find('input[type=text],input[type=mail],textarea').val('');
                $(this).find('input[type=checkbox]').prop('checked', false);
                $(this).find('.active').removeClass('active');
            });
            $(".header__right").removeClass("active");
            $(".catalog__sidebar-container").removeClass('active');

        }
    });
    $('body').on('click', '.popup__close', function (e) { //Закрытие попапов по .popup__close
        $('.popup').removeClass('active');
        $('html').removeClass('no-scroll');
        $('body').css('width', 'auto');
        $('.m-popup__container').removeClass('active');
        $('.popup').each(function () {
            $(this).find('input[type=checkbox]').prop('checked', false);
            $(this).find('.active').removeClass('active');
        });
    });

    // phone mask
    $('.phone-mask').mask("+ 0 000 000 00 00");

    //sms input 
    $(".m-popup-box").click(function() {
        $(".m-popup-box:nth-child(1)").find("input").focus();
    });
    const root = document.documentElement;

    function getCustomPropertyValue(name) {
        const styles = getComputedStyle(root);
        return styles.getPropertyValue(name);
    }

    /* 
      SMS Code input logic
      primitive implementation of multi-input
      
      Disclaimer: this «pen» was made for presentational pruposes.
      It's not a production-ready solution, because it lacks of many best UX and a11y
      practices. Let it inspire you and I hope you will enjoy it :) 
    */

    const fieldset = document.querySelector(".fieldset");
    const fields = document.querySelectorAll(".field");
    const boxes = document.querySelectorAll(".m-popup-box");

    function handleInputField({ target }) {
        const value = target.value.slice(0, 1);
        target.value = value;

        const step = value ? 1 : -1;
        const fieldIndex = [...fields].findIndex((field) => field === target);
        const focusToIndex = fieldIndex + step;

        if (focusToIndex < 0 || focusToIndex >= fields.length) return;

        fields[focusToIndex].focus();
    }
    fields.forEach((field) => {
        field.addEventListener("input", handleInputField);
    });

    /* End SMS Code input logic */

    // Controls 
    const successBtn = document.querySelector(".success-btn");
    const failureBtn = document.querySelector(".failure-btn");
    const resetBtn = document.querySelector(".reset-btn");

    successBtn.addEventListener("click", (event) => {
        fieldset.classList.add("animate-success");
    });
    resetBtn.addEventListener("click", (event) => {
        fieldset.classList.remove("animate-failure");
        fieldset.classList.remove("animate-success");
    });
    failureBtn.addEventListener("click", (event) => {
        function getDelay() {
            const firstStepDuration = getCustomPropertyValue(
                "--transition-duration-step-1"
            );
            const secondStepDuration = getCustomPropertyValue(
                "--transition-duration-step-2"
            );

            return parseInt(firstStepDuration) + parseInt(secondStepDuration);
        }

        function animateFailure() {
            fieldset.classList.add("animate-failure");
            const delay = getDelay();

            setTimeout(() => {
                fieldset.classList.remove("animate-failure");
            }, delay);
        }

        if (fieldset.classList.contains("animate-success")) {
            fieldset.classList.remove("animate-success");

            const delay = parseInt(getCustomPropertyValue("--transition-duration-step-1"))

            setTimeout(() => {
                animateFailure();
            }, delay)

            return;
        }

        animateFailure();
    });

    const inputs = document.querySelectorAll(".settings-controls__input");

    function setAnimationDuration({ target }) {
        const {
            value,
            dataset: { step }
        } = target;
        const safeValue = parseInt(value);
        const propertyValue = Number.isNaN(safeValue) ? null : safeValue + "ms";

        root.style.setProperty(`--transition-duration-step-${step}`, propertyValue);
    }
    inputs.forEach((node) => {
        node.addEventListener("input", setAnimationDuration);
    });


});