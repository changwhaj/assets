    /* Hide & Show answers */
    $('body').on('click', '.btn.reveal-solution', function (e) {
        e.preventDefault();
        $(this).parent('.question-body').find('.question-answer').fadeIn(100);
        $(this).parent('.question-body').find('.hide-solution').removeClass('d-none');
        $(this).parent('.question-body').find('.correct-hidden').addClass('correct-choice');
        $(this).addClass('d-none');
    });

    $('body').on('click', '.btn.hide-solution', function (e) {
        e.preventDefault();
        $(this).parent('.question-body').find('.question-answer').fadeOut(100);
        $(this).parent('.question-body').find('.reveal-solution').removeClass('d-none');
        $(this).parent('.question-body').find('.correct-hidden').removeClass('correct-choice');
        $(this).addClass('d-none');
    });